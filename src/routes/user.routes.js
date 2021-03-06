const router = require('express').Router()
const { createUserForm, createUser, loginUserForm, loginUser, logoutUser } = require('../controllers/user.controller');
const validator = require('../middlewares/register.validator.middleware')
const userSchemaValidator = require('../validators/user.validator')

router.get('/register', createUserForm);
router.post('/register', validator(userSchemaValidator), createUser);

router.get('/login', loginUserForm);
router.post('/login', loginUser);

router.get('/logout', logoutUser);


module.exports = router;

