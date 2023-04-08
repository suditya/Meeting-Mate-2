const express = require('express');
const router = express.Router();


const { SigninController, SignupController } = require('../controller/users.controller');


router.post('/signup', (req, res) => {
    console.log("first")
    SignupController(req, res)
})


router.post('/signin', (req, res) => {
    console.log("sigin first ")
    SigninController(req, res)
})


module.exports = router;