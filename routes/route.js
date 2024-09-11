import express from 'express';

import { userSignup,userLogin } from '../controllers/userController.js';
import { verifyEmail } from '../verificaion/verifyEmail.js';
import { getIdProperty, listPropertyDetail, propertyDetails } from '../controllers/propertController.js';
import upload from '../config/cloudinaryConfig.js'
import {forgetPassword, resetPassword} from '../controllers/UserForget/forgetPassword.js'
const router=express.Router();
router.post("/signup",userSignup);

router.post("/login",userLogin);
router.get('/verify/:token', verifyEmail);
// router.get('/confirm-email/:token', confirmEmail);

//property part
router.post("/add-property",upload.array('images', 10),propertyDetails)
//property listing route

router.get("/listing-property",listPropertyDetail);
  //route for getting the id path

  router.get("/listing-property/:id",getIdProperty)


  //forget password

  router.post("/forgetPassword", forgetPassword);

  //resetPassword
  router.post("/reset-password/:token",resetPassword)


export default router;