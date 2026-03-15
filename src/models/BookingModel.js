const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({

  eventId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"EventModel"
  },

  talentId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"TalentModel"
  },

  providerId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"TalentProviderModel"
  },

  bookingDate:{
    type:Date
  },

  status:{
    type:String,
    enum:["pending","confirmed","cancelled","completed"],
    default:"pending"
  }

},{timestamps:true})

module.exports = mongoose.model("Booking",bookingSchema)