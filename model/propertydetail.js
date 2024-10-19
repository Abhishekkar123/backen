import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Location Schema
const locationSchema = new Schema({
  area: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  }
});

// Configuration Schema
const configurationSchema = new Schema({
  RERAId: {
    type: String,
    required: true,
    unique: true // Ensuring RERA ID is unique
  },
  ownershipType: {
    type: String,
    enum: ['Freehold', 'Leasehold', 'Co-operative', 'Condominium'], // Enum for ownership types
    required: true
  },
  carpetArea: {
    type: Number,
    required: true // Required field for carpet area
  },
  builtupArea: {
    type: Number,
    required: true // Required field for built-up area
  },
  apartmentType: {
    type: String,
    enum: ['1 BHK', '2 BHK', '3 BHK','4 BHK', 'Studio', 'Villa', 'Penthouse'], // Enum for apartment types
    required: true
  },
  age: {
    type: Number,
    required: true // Required field for property age
  },
  bedrooms: {
    type: Number,
    required: true, // Required field for number of bedrooms
    min: 0 // Minimum value for bedrooms
  },
  bathrooms: {
    type: Number,
    required: true, // Required field for number of bathrooms
    min: 0 // Minimum value for bathrooms
  },
  balcony: {
    type: Boolean,
    default: false // Default value for balcony availability
  },
  // parking: {
  //   bike: {
  //     type: Boolean,
  //     default: false // Default value for bike parking availability
  //   },
  //   car: {
  //     type: Boolean,
  //     default: false // Default value for car parking availability
  //   }
  // },
  buildingType: {
    type: String,
    enum: ['Apartment', 'Independent House', 'Villa', 'Penthouse', 'Row House'], // Enum for building types
    required: true
  },
  facing: {
    type: String,
    enum: ['East', 'West', 'North', 'South', 'North-East', 'South-West'], // Enum for facing options
    required: true
  },
  floor: {
    type: Number,
    required: true, // Required field for floor number
    min: 0 // Minimum value for floor
  }
});

// Community Amenities Schema
const communityAmenitiesSchema = new Schema({
  parking: {
    type: Boolean,
    default: false
  },
  elevator: {
    type: Boolean,
    default: false
  },
  gym: {
    type: Boolean,
    default: false
  },
  intercom: {
    type: Boolean,
    default: false
  },
  fireSafety: {
    type: Boolean,
    default: false
  },
  gasPipeline: {
    type: Boolean,
    default: false
  },
  swimmingPool: {
    type: Boolean,
    default: false
  },
  clubhouse: {
    type: Boolean,
    default: false
  },
  solarPanels: {
    type: Boolean,
    default: false
  },
  waterConservation: {
    type: Boolean,
    default: false
  },
  footpaths: {
    type: Boolean,
    default: false
  },
  landscaping: {
    type: Boolean,
    default: false
  },
  maintenance: {
    type: Number // Optional: Maintenance fees or service charges
  },
  // age: {
  //   type: Number // Optional: Age of community amenities
  // }
});

// Property Schema
const propertySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  userAdType: {
    type: String,
    enum: ['Rent', 'Resale', 'Pg', 'Flatmate'],
    required: true
  },
  userType: {
    type: String,
    enum: ['Commercial', 'Residential', 'Pg'],
    required: true
  },
  location: {
    type: locationSchema, // Location details embedded in property schema
    required: true
  },
  configuration: {
    type: configurationSchema, // Embedded configuration schema
    required: true
  },
  communityAmenities: {
    type: communityAmenitiesSchema,
    required: false
  },
  price: {
    type: Number,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  postedBy: {
    type: String,
    enum: ['Owner', 'Builder', 'Agent'],
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  images: [{
    type: String
  }]
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

const Property = mongoose.model('Property', propertySchema);

export default Property;
