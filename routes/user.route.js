
const router = require('express').Router()
const { createUser, loginUser } = require('../contorllers/user.controller')


router.post('/auth/register',createUser)
router.post('/auth/login',loginUser)

module.exports = router