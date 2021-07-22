const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const UserSchema = new Schema ({
  email: { 
    type: String,
    unique: true,
    lowercase:true,
    trim: true,
    required: [true, "is required"] 
  },
  password: {
    type: String,
    required: [true, "is required"]
  }
})

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt) 
  this.password = hash
  next()
})

module.exports = mongoose.model('User', UserSchema)