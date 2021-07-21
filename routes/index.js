const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');


console.log("Router Routing you to your destination");
router.get('/',function(req,res){
    res.render('first.ejs');
});
router.get('/home',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));




module.exports = router;