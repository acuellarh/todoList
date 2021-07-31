const router = require('express').Router()
const { getHome, createTask, showTasks, deleteTask, renderEditForm, updateNote, updateStatus} = require('../controllers/task.controller');
const { requireUser } = require('../middlewares/auth.middleware');
const app = require("../index");

// Index
router.get('/', requireUser, getHome);

//Create Task
router.post('/', requireUser, createTask)

//Get all Task
router.get('/tasks', requireUser , showTasks)

//Edit Task
router.get('/tasks/edit/:id', renderEditForm)

router.put('/edit-task/:id', requireUser, updateNote)

// Task Status
router.post('/tasks/status/:id', requireUser, updateStatus)

//Delete Task
router.delete('/tasks/delete/:id', requireUser, deleteTask)


module.exports = router;