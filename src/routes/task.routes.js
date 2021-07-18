const router = require('express').Router()
const { getHome, createTask, showTasks, deleteTask } = require('../controllers/task.controller');

router.get('/', getHome);

router.post('/', createTask)

router.get('/tasks', showTasks)

router.delete('/delete/task/:id', deleteTask)

module.exports = router;