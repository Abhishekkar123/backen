import mongoose from "mongoose";

export const connection=async (user,password)=>{
     console.log("data connection")
    // console.log(userName,Pass)
    const URL=`mongodb+srv://${user}:${password}@ecommerce.8iwvk1l.mongodb.net/ecommerce`

    //mongodb+srv://user:<password>@ecommerce.8iwvk1l.mongodb.net/

    try{
      let x=await mongoose.connect(URL);
        // console.log(x)
      console.log("database connect successfully")

    }catch(err){
        console.log("err while connecting database",err.message)
    }
}