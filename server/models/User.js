import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId, // Auto-generated unique identifier
    default: () => new mongoose.Types.ObjectId(),
  },
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
    unique:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    
  },
  profilePicture: {
    type: String,
    required: true, 
    default: ''
  },
  bio: {
    type: String,
    maxlength: 300,
    default: ''
  },

}, { timestamps: true });  // Adds createdAt and updatedAt fields automatically

const User = mongoose.model('User', userSchema);

export default User;
