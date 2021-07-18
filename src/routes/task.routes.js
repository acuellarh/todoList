const router = require('express').Router()
const { getHome, createTask, showTasks } = require('../controllers/task.controller');

router.get('/', getHome);

router.post('/', createTask)

router.get('/tasks', showTasks)


module.exports = router;