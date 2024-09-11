// const nodemailer = require("nodemailer");
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// console.log(nodemailer)

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user:process.env.Name , // generated ethereal user
      pass: process.env.password, // generated ethereal password
    },
  });
  let info = await transporter.sendMail({
    from:'"Maddison Foo Koch 👻" <bharatvarshainfo@gmail.com>' ,
    to: "bharatvarshainfo@gmail.com", // list of receivers
    subject: "Propertease" , // Subject line
    text:"hello property"
  });
  console.log(info)


