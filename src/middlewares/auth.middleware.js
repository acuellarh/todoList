
const app = require("../index");

//middleware
const requireUser = (req, res, next) => {
  if(!res.locals.user){
      return res.redirect('/login')            
  }
  next()    
}



module.exports = {
  requireUser
}