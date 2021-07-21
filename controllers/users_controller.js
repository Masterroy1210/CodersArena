const User =require('../models/users');







module.exports.signin = function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/');
    }   
    return res.render('user_sign_in',{
        title:'CodersArena |Signin'
    });
} 


module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
       return  res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:'CodersArena |Signup'
    });
}


//get sign up data
module.exports.create= function(req,res){
    if(req.body.password!=req.body.confirmpassword){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log('Error in finding user in sign up');
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('Error in creating user while sign up');
                    return ;

                }
                return res.redirect('/users/signin');
            });
        }else{
            return res.redirect('back');
        }

    });
}

module.exports.profile =function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:'userprofile',
            profile_user:user
        });
    });
    
}

module.exports.update = function(req,res){
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id,{
            name: req.body.name,
            email:req.body.email
        },function(err,user){
            if(err){
                console.log('Error in updating the User details');
                return;
            }
            req.flash('success','Profile Updated Successfully');
            return res.redirect('back');
        });
    }
}



module.exports.createSession=function(req,res){
    req.flash('success','Logged in Successfully');
    return res.redirect('/home');
}

module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('success','Logged out Successfully');
    return res.redirect('/');

}


//Local authenticattion profile
/*module.exports.profile = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(err){
                console.log('Error in fething user profile details');
                return;

            }
            if(user){
                return res.render('user_profile',{
                    title: 'User|Profile',
                    user:user
                });

            }
            return res.redirect('/users/signin');

        });

    }else{
        return res.redirect('/users/signin');
    }
}*/




//Sign in user and create a login session
/*module.exports.createSession = function(req,res){

    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('Error in finding the user while signin');
            return;
        }
        if(user){
            if(user.password!=req.body.password){
                return res.redirect('back');
            }
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');

        }else{
            return res.redirect('back');
        }
    });
    
} */
