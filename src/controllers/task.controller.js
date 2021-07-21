const Task = require('../models/task/task.model')

const getHome = (req, res) => {
  try {
    res.render('index')  

  } catch (error) {
    throw new Error(error)
  }
}

const createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = new Task({title, description})
    await task.save()
    const tasks = await Task.find()
    res.render('tasks', { tasks })
  } catch (error) {
    throw new Error(error)
  }
}

const showTasks = async (req, res) => { 
  try {
    const tasks = await Task.find()
    res.render('tasks', { tasks })
  } catch (error) {
    throw new Error(error)
  }
}

const deleteTask = async (req, res) => {
  try {        
     const { id } = req.params;
     await Task.deleteOne({_id:id })            
     res.redirect('/tasks');        
  } catch (error) {
    throw new Error(error)
  }
}


module.exports = {
  getHome,
  createTask,
  showTasks,
  deleteTask
}


