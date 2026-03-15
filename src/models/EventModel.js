const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({

  talentproviderId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"TalentProviderModel",
    required:true
  },

  title:{
    type:String,
    required:true
  },

  description:{
    type:String
  },

  skillRequired:{
    type:String
  },

  eventDate:{
    type:Date
  },

  budget:{
    type:Number
  },

  location:{
    city:String,
    state:String,
    country:String
  },

  status:{
    type:String,
    enum:["open","closed","completed","cancelled"],
    default:"open"
  }

},{timestamps:true})

module.exports = mongoose.model("Event",eventSchema)