const mongoose = require("mongoose")

const talentSchema = new mongoose.Schema({

  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"UserModel",
    required:true
  },

  profilePic:{
    type:String
  },

  skills:[
    {
      type:String,
      required:true
    }
  ],

  experience:{
    type:Number
  },

  expertiseLevel:{
    type:String,
    enum:["Beginner","Intermediate","Expert"]
  },

  portfolio:[
    {
      type:String
    }
  ],

  hourlyRate:{
    type:Number
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
  
  isActive:{
    type:Boolean,
    default:true
  },

  phone:{
    type:String
  }

},{timestamps:true})

module.exports = mongoose.model("talent",talentSchema)