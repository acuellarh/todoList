const mongoose = require('mongoose')

const URL = 'mongodb://localhost:27017/todoList';

mongoose.connect(process.env.MONGO_DB_URL || URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on('error', () => console.error('Error in db connection'));

mongoose.connection.once('open', () => console.log(' db connected'));