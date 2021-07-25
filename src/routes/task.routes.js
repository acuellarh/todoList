const router = require('express').Router()
const { getHome, createTask, showTasks, deleteTask, renderEditForm, updateNote } = require('../controllers/task.controller');
const { requireUser } = require('../middlewares/auth.middleware');
const app = require("../index");

// Index
router.get('/', requireUser, getHome);

//Create Task
router.post('/', requireUser, createTask)

//Get all Task
router.get('/tasks', requireUser , showTasks)

//Edit notes

router.get('/tasks/edit/:id', renderEditForm)

router.put('/edit-task/:id', requireUser, updateNote)





// /edit-task/{{task._id}}

//router.post('tasks/edit/:id', requireUser, updateNote)


//Delete Task
router.delete('/tasks/delete/:id', requireUser, deleteTask)


module.exports = router;