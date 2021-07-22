const User  = require('../models/modelUser')
const app = require("../index");
const bcrypt = require('bcrypt')



const createUserForm = (req, res) => {
  res.render('register')
}

const createUser = async (req, res ) => { 
  try {
    const user = await User.create ({
      email: req.body.email,
      password: req.body.password
    })
    res.redirect("/login")    
  } catch (error) {
    throw new Error(error)
  }
  // const { email, password } = req.body;
  // try {
  //   const user = new User({email, password})
  //   await user.save() 
  //   res.redirect("/login") 
  // } catch (error) {
  //   throw new Error(error)
  // }
}

const loginUserForm =  (req, res) => {
  res.render('login')
}

const loginUser =  (req, res) => {

}

const logoutUser =  (req, res) => {

}


module.exports = {
  createUserForm,
  createUser,
  loginUserForm,
  loginUser,
  logoutUser
}