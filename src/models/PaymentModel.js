const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({

  bookingId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"BookingModel",
    required:true
  },

  payerId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"UserModel",
    required:true
  },

  receiverId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"UserModel",
    required:true
  },

  amount:{
    type:Number,
    required:true
  },

  paymentMethod:{
    type:String,
    enum:["UPI","Card","NetBanking","Cash"],
    required:true
  },

  transactionId:{
    type:String
  },

  paymentStatus:{
    type:String,
    enum:["pending","completed","failed","refunded"],
    default:"pending"
  },

  paymentDate:{
    type:Date
  }

},{timestamps:true})

module.exports = mongoose.model("payment",paymentSchema)