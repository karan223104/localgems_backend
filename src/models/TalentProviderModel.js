const mongoose = require("mongoose")

const talentProviderSchema = new mongoose.Schema({

  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"UserModel",
    required:true
  },

  profilePic:{
    type:String
  },
  
  organizationName:{
    type:String,
    required:true
  },

  providerType:{
    type:String,
    enum:["Individual","Company","Agency"],
    default:"Individual"
  },

  experience:{
    type:Number
  },

  description:{
    type:String
  },

  phone:{
    type:String
  },

  location:{
    city:{
      type:String
    },
    state:{
      type:String
    },
    country:{
      type:String
    }
  },

  portfolio:
    {
      type:String
    },

  budgetRange:{
    min:{
      type:Number
    },
    max:{
      type:Number
    }
  },

  availability:{
    type:Boolean,
    default:true
  },

  ratingAverage:{
    type:Number,
    default:0
  },

  totalReviews:{
    type:Number,
    default:0
  }

},{timestamps:true})

module.exports = mongoose.model("talentprovider",talentProviderSchema)