const router = require('express').Router()
const { getHome, createTask, showTasks, deleteTask } = require('../controllers/task.controller');
const { requireUser } = require('../middlewares/auth.middleware');

router.get('/', requireUser, getHome);

router.post('/', requireUser, createTask)

router.get('/tasks', requireUser , showTasks)

router.delete('/delete/task/:id', requireUser, deleteTask)

module.exports = router;