// const nodemailer = require("nodemailer");
import nodemailer from 'nodemailer';

// console.log(nodemailer)

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: '', // generated ethereal user
      pass: 'auny upwl cohc fzmv', // generated ethereal password
    },
  });
  let info = await transporter.sendMail({
    from:'"Maddison Foo Koch 👻" <bharatvarshainfo@gmail.com>' ,
    to: "bharatvarshainfo@gmail.com", // list of receivers
    subject: "Propertease" , // Subject line
    text:"hello property"
  });
  console.log(info)


