const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({

  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"UserModel"
  },

  talentId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"TalentModel"
  },

  rating:{
    type:Number,
    min:1,
    max:5
  },

  comment:{
    type:String
  }

},{timestamps:true})

module.exports = mongoose.model("review",reviewSchema)