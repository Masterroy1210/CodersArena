const passport = require('passport');

const  LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

//Authenticating the user using passport js
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
},
function(req,email,password,done){
    //Finding user and establish identity
    User.findOne({email:email},function(err,user){
        if(err){
            console.log('Error in finding the user');
            return done(err);
        }
        if(!user || user.password!=password){
            req.flash('error','Invalid Password or email');
            return done(null,false);


        }
        console.log(user);
        return done(null,user); 
    });

}
));


//Serializing the user and to store cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
});



//Deserializing the cookie 
passport.deserializeUser(function(id, done){
    User.findById(id,function(err, user){
        if(err){
            console.log('Error in finding the user by id');
           return done(err);
        }
        return done(null,user);
    });
});


// Chech if user is authenticated
passport.checkAuthentication = function(req, res, next){
    //If the user is signed in then pass on the request to the next function
    if(req.isAuthenticated()){
         return next();
    }
     //if the user is not signed in
    return res.redirect('/users/signin');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookies and 
        //we are jst sending it to the res.local for views
        res.locals.user=req.user;
    }

     next();
}



module.exports = passport;