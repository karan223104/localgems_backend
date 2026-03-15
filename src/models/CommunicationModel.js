const mongoose = require("mongoose")

const communicationSchema = new mongoose.Schema({

  senderId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"UserModel",
    required:true
  },

  receiverId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"UserModel",
    required:true
  },

  eventId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"EventModel"
  },

  message:{
    type:String,
    required:true
  },

  messageType:{
    type:String,
    enum:["text","image","file"],
    default:"text"
  },

  isRead:{
    type:Boolean,
    default:false
  }

},{timestamps:true})

module.exports = mongoose.model("communication",communicationSchema)