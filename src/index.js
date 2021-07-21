//environment variables
require('dotenv').config();

// express
const express = require('express')
const app = express()
const path = require('path')
const hbs = require('express-handlebars');
const cookieSession = require('cookie-session')
const methodOverride = require('method-override')
const taskRoutes = require('./routes/task.routes');

// mongo db connection
require('./config/dbConfig');

//express setting
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieSession({ 
    secret: "session" ,
    maxAge: 24 * 60 * 60 * 1000
  }));

app.use(methodOverride('_method', {methods: ["POST", "GET"] }))


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
 

app.get('/prueba', async (req, res)=>{  
    try{
        req.session.views = (req.session.views || 0) + 1
        res.render('index', {views:req.session.views} )
    } catch (error) {
        throw new Error(error)
    }
})

app.use('/', taskRoutes )




app.listen(process.env.PORT || 3000, console.log(`runnig in port ${process.env.PORT || 3000}`))