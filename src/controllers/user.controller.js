const User  = require('../models/modelUser')
const app = require("../index");



//routes

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
}

const loginUserForm =  (req, res) => {
  res.render('login')
}

const loginUser =  async (req, res) => {
  try {
    const user = await User.authenticate(req.body.email, req.body.password)
    //Si la autenticación es correcta, guarda en la sesion el id del usuario
    if(user){
      req.session.userId = user._id
      return res.redirect('/tasks')
    } else {
      res.render('/login', {error: 'Wrong email or password. Try again!'})
    }
  } catch (error) {
    throw new Error(error)
  }

}

const logoutUser =  (req, res) => { 
  // destruye la session
  req.session = null
  //limpia las cookies
  res.clearCookie('session')
  res.clearCookie('session.sig')
  res.redirect('/login')
}


module.exports = {
  createUserForm,
  createUser,
  loginUserForm,
  loginUser,
  logoutUser
}