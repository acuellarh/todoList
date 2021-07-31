
const app = require("../index");

//middleware
const requireUser = (req, res, next) => {
  if(!res.locals.user){
      return res.render('home')            
  }
  next()    
}



module.exports = {
  requireUser
}