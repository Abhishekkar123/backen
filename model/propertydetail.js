import mongoose from "mongoose";
const Schema = mongoose.Schema;

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
    },
    // Add any other location details here
  },
  generalAmenities: {
    parking: {
      type: Boolean,
      default: false
    },
    furnished: {
      type: Boolean,
      default: false
    },
    elevator: {
      type: Boolean,
      default: false
    },
    ownershipType: {
      type: String,
      enum: ['Freehold', 'Leasehold', 'Co-operative', 'Condominium']
    },
    gatedSecurity: {
      type: Boolean,
      default: false
    },
    floor: {
      type: Number
    },
    builtupArea: {
      type: Number
    },
    facing: {
      type: String
    }
  },
  communityAmenities: {
    pool: {
      type: Boolean,
      default: false
    },
    gym: {
      type: Boolean,
      default: false
    },
    clubhouse: {
      type: Boolean,
      default: false
    },
    playground: {
      type: Boolean,
      default: false
    },
    businessCenter: {
      type: Boolean,
      default: false
    },
    securitySystem: {
      type: Boolean,
      default: false
    },
    rooftopTerrace: {
      type: Boolean,
      default: false
    },
    solarPanels: {
      type: Boolean,
      default: false
    },
    recyclingProgram: {
      type: Boolean,
      default: false
    },
    age: {
      type: Number
    },
    maintenance: {
      type: Number
    }
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
});

const Property = mongoose.model('Property', propertySchema);

export default Property;



