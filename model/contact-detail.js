


/**
 * 
 * propertyId
 * name
 * email
 * contact
 * 
 */

import mongoose from "mongoose";
const Schema = mongoose.Schema;


const contactSchema = new Schema({
    propertyId:{
        type: Schema.Types.ObjectId,
        ref:'Property',
        require:true
    },
    name:{
        type:String,
        require:true

    },
    email:{
        type:String,
        required:true,

    },
    contact:{
        type:String,
        required:true,
    }

})


const Contact=mongoose.model('contact', contactSchema);

export default Contact


