import User from "../model/user-schema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const SECRET_KEY = 'The world is beautiful';
const EMAIL_SECRET = 'EmailSecretKey';

export const userSignup=async(req,res)=>{

    try{

   //if user is already exits
    const exist=await User.findOne({email:req.body.email});
    if(exist){
        return res.status(401).json({message:"user is already exist"})  
    }

        console.log("req.body",req.body);
        const { name, email, password, phone } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, phone });
 
       

        //email service
        const emailToken = jwt.sign({ email: user.email }, EMAIL_SECRET, { expiresIn: '1h' });
        console.log(emailToken)
        const url = `https://frontend-1-c2on.onrender.com/verify/${emailToken}`;

        //check the ttoken generate to check the email

       console.time("time")
        //email redirect with verify token
        nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: 'bharatvarshainfo@gmail.com',
                pass: 'auny upwl cohc fzmv',
            },
        }).sendMail({
            from: 'bharatvarshainfo@gmail.com',
            to: user.email,
            subject: 'Verify your email',
            html: `<h3>Welcome, ${user.name}</h3><p>Please verify your email by clicking <a href="${url}">here</a></p>`,
        });
console.timeEnd("time")

        
        await user.save()
        //await User,create()
        res.status(200).json({message:user})


    }catch(err){
        console.log("err in body message",err.message);
        res.status(500).json({message:err.message})
    }

}


export const userLogin=async (req,res)=>{

    const { email, password } = req.body;
    console.log(email," ",password)
    let user =await User.findOne({email});
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    

    if (!user.isVerified) {
        return res.status(403).send({ error: 'Please verify your email first.' });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ error: 'Invalid password' });
    }
  
    const token = jwt.sign({ id: user.id, name: user.name }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).send({ token,user})


}