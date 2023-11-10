// import mongoose from "mongoose";
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ListSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
 
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  Date:{
    type:Date,
    default:Date.now
  },
});

module.exports = mongoose.model("lists", ListSchema);
