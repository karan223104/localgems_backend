const mongoose = require("mongoose")

const eventApplicationSchema = new mongoose.Schema({

  eventId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"EventModel"
  },

  talentId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"TalentModel"
  },

  status:{
    type:String,
    enum:["pending","accepted","rejected"],
    default:"pending"
  }

},{timestamps:true})

module.exports = mongoose.model("EventApplication",eventApplicationSchema)