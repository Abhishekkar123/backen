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
const corsOptions = {
  origin: 'https://frontend-1-c2on.onrender.com', // Replace with your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true // Set this to true if you need to allow credentials (e.g., cookies)
};

app.use(cors(corsOptions));
app.use("/",router)

const userName=process.env.DB_USER
const password=process.env.DB_PASSWORD

connection(userName,password);


app.listen(8000,()=>{
    console.log("Server is started");
  })