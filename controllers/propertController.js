// const Property=require("../model/propertydetail")
// const upload=require("../config/cloudinaryConfig")
import Property from "../model/propertydetail.js";
import User from "../model/user-schema.js";
// import upload from '../config/cloudinaryConfig'

export const propertyDetails=async(req,res)=>{

    try {
        const {
          title,
          description,
          userAdType,
          userType,
          location,
          generalAmenities,
          communityAmenities,
          price,
          userId,
          postedBy
        } = req.body;
 
          // console.log(JSON.parse(location))
          console.log(location)
      
        // Extract the image URLs from the uploaded files
        const images = req.files.map(file => file.path);
    
        // Create a new Property instance
        const newProperty = new Property({
          title,
          description,
          userAdType,
          userType,
          location,
          generalAmenities,
          communityAmenities,
          price,
          userId,
          images,
          postedBy // Store the array of image URLs
        });
    
        // Save the new property to the database
        await newProperty.save();
    
        res.status(201).json({ message: 'Property created successfully', property: newProperty });
      } catch (error) {
        console.error('Error creating property:', error);
        res.status(500).json({ error: 'Server error' });
      }
}




export const listPropertyDetail=async (req, res) => {
  try {
    const properties = await Property.find();
  //   console.log(properties) // This will fetch all properties
    res.json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ message: 'Server error' });
  }
}


export const getIdProperty = async (req, res) => {
  try {
      // Log the ID received in the request
      console.log('Fetching property with ID:', req.params.id);
      const userId=req.params.id
    
      // Find the property by ID
      const property = await Property.findById(userId);
      console.log(property)

      // Check if property exists
      if (!property) {
          return res.status(404).json({ message: 'Property not found' });
      }

      // Return the found property
      res.json(property);
  } catch (err) {
      // Log the error with a meaningful message
      console.error('Error fetching property by ID:', err);

      // Send an error response
      res.status(500).json({ message: 'Server error' });
  }
};
