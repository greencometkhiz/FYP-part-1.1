import { string } from "mathjs";
import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
 
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
   
  },
  phone: {
    type: Number,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  favSports: {
    type: [String], // Assuming multiple sports can be favorites
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "Other"],
    required: true,
  },
  role:{
    type:string,
    required: true,
  },

 
}, { timestamps: true });

export default mongoose.model('users', candidateSchema);
