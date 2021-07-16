require('dotenv').config();

const express = require('express')
const app = express()

// mongo db connection
require('./config/dbConfig');


app.use(express.urlencoded({extended:true}))
app.use(express.json())





app.listen(process.env.PORT || 3000, console.log(`runnig in port ${process.env.PORT || 3000}`))