const Task = require('../models/task/task.model')
const app = require("../index");


const getHome = (req, res) => {
  try {
    //res.render('index')  
    req.session.views = (req.session.views || 0) + 1
    res.render('index', {views:req.session.views} )

  } catch (error) {
    throw new Error(error)
  }
}

const createTask = async (req, res) => {
  const { title, description } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Please Write a Title." });
  }
  if (!description) {
    errors.push({ text: "Please Write a Description" });
  }
  if (errors.length > 0) {
    res.render("index", {
      errors,
      title,
      description,
    });
  } else {
    try {
      const task = new Task({title, description, user: res.locals.user })
      await task.save()    
      req.flash('success_msg', 'Task Addedd Successfully')
      res.redirect('tasks')
    } catch (error) {
      throw new Error(error)
    }
  }
}

const showTasks = async (req, res) => { 
  try {
    const tasks = await Task.find({user: res.locals.user})
    res.render('tasks', { tasks })
  } catch (error) {
    throw new Error(error)
  }
}

const deleteTask = async (req, res) => {
  try {        
     const { id } = req.params;
     await Task.deleteOne({_id:id })  
     req.flash('success_msg', 'Task Deleted Successfully')          
     res.redirect('/tasks');        
  } catch (error) {
    throw new Error(error)
  }
}

const renderEditForm = async (req, res) => {
  const task = await Task.findById(req.params.id)
  res.render('edit-task', { task })
}

const updateNote = async (req, res) => {
  console.log(req.body)
  const {title, description} = req.body
  await Task.findByIdAndUpdate(req.params.id, {title, description})
  req.flash('success_msg', 'Task Updated Successfully')
  res.redirect('/tasks')  
}



module.exports = {
  getHome,
  createTask,
  showTasks,
  deleteTask,
  renderEditForm,
  updateNote
}


