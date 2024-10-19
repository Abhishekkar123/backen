import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import bodyParser from 'body-parser'
import {connection} from './database/db.js';
import router from './routes/route.js';
const app=express();

dotenv.config();

app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors())
app.use("/",router)

const userName=process.env.DB_USER
const password=process.env.DB_PASSWORD

connection(userName,password);


app.listen(8000,()=>{
    console.log("Server is started");
  })