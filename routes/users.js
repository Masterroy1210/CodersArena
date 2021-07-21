const express = require('express');
const router =express.Router();
const passport = require('passport');
const usersController= require('../controllers/users_controller');




router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.get('/signin',usersController.signin);
router.get('/signup',usersController.signup);
router.post('/create',usersController.create);
router.post('/update/:id',usersController.update);


//use passport as  middleware to authenticate user and establish identity 
router.post('/createSession',passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'},
),usersController.createSession);

router.get('/signout',usersController.destroySession);

module.exports = router;
