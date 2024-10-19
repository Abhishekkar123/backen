import express from 'express';

import { userSignup, userLogin } from '../controllers/userController.js';
import { verifyEmail } from '../verificaion/verifyEmail.js';
import { getIdProperty, listPropertyDetail, propertyDetails } from '../controllers/propertController.js';
import upload from '../config/cloudinaryConfig.js'
import { forgetPassword, resetPassword } from '../controllers/UserForget/forgetPassword.js'
import Property from '../model/propertydetail.js';
import Contact from '../model/contact-detail.js';
const router = express.Router();
router.post("/signup", userSignup);

router.post("/login", userLogin);
router.get('/verify/:token', verifyEmail);
// router.get('/confirm-email/:token', confirmEmail);

//property part
router.post("/add-property", upload.array('images', 10), propertyDetails)
//property listing route

router.get("/listing-property", listPropertyDetail);
//route for getting the id path

router.get("/listing-property/:id", getIdProperty)


//forget password

router.post("/forgetPassword", forgetPassword);

//resetPassword
router.post("/reset-password/:token", resetPassword)



//contact Detail

router.post("/contact", async (req, res) => {
  // res.status(200).json({mess:"contact ha hamara"})



  try {
    const {
      propertyId,
      name,
      email,
      contact
    } = req.body;

    //chweck the propertyId

    const isPropertyId = await Property.findOne({ _id: propertyId });


    if (!isPropertyId) {
      // return res.status(404).json({ message: "Property does not exist" });
      console.log("errot in Id")
    }

    const newContact = new Contact({

      propertyId,
      name,
      email,
      contact

    })

    await newContact.save();


    return res.status(201).json({ message: "Contact saved successfully", contact: newContact });

  } catch (err) {
    console.log("err", err);
    res.status(500).send("err in craeting", err)
  }

})


//for static query for what about the dynamic query
router.get('/listed/search', async (req, res) => {
  try {
    const { type, area } = req.query;
    //       console.log('Query Parameters:', req.query);
    // console.log('Area:',area);
    // console.log('User Ad Type:',type); // Extract search parameters

// area?temp:type for static case


//for dynamic
// console.log(type.length)
const filter={}
if (type) {
  filter['userAdType'] = type;  // Add 'type' filter if it's provided
}

if (area) {
  filter['location.area'] = area;  // Add 'area' filter if it's provided
}

// Log the filter for debugging
console.log('Filter:', filter);

    // Assume `Property` is a Mongoose model for properties
    const properties = await Property.find(filter);
    res.json(properties);  // Send the found properties to the frontend
  } catch (error) {
    res.status(500).json({ message: error });
  }
});



export default router;