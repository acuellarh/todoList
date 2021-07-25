//environment variables
require('dotenv').config();

// express
const express = require('express')
const app = express()
const path = require('path')
const hbs = require('express-handlebars');
const cookieSession = require('cookie-session')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const taskRoutes = require('./routes/task.routes');
const userRoutes = require('./routes/user.routes');

// mongo db connection
require('./config/dbConfig');

//express setting
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieSession({ 
    secret: "session" ,
    maxAge: 24 * 60 * 60 * 1000
}));

app.use(flash())

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg'),
  res.locals.danger_msg = req.flash('danger_msg')
  next()
})

app.use(methodOverride('_method', {methods: ["POST", "GET"]}))

//midlewares

const User  = require('../src/models/modelUser')

app.use(async (req, res, next) => {
  const userId = req.session.userId
  if(userId){
      const user = await User.findById(userId)
      if(user){
          res.locals.user = user            
      }else{
       delete req.session.userId
      }
  }
  next()    
})

//handlebars
app.set('views', path.join(__dirname, 'views'))

app.engine('.hbs', hbs({ 
   runtimeOptions: {
       allowProtoPropertiesByDefault: true,
       allowProtoMethodsByDefault: true,
   },   
   layoutsDir:path.join(app.get('views'),'layouts'), 
   partialsDir:path.join(app.get('views'),'partials'),
   extname:'.hbs',
   defaultLayout:'main'
})) 
 
app.set('view engine', 'hbs')

app.use('/', taskRoutes )
app.use('/', userRoutes )

module.exports = app;

app.listen(process.env.PORT || 3000, console.log(`runnig in port ${process.env.PORT || 3000}`))