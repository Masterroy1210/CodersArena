
const Post =require('../models/post');
const User =require('../models/users');




//populate here is used to extract all the user json form mongodb to display name 
//Andd other details of the user who made the post
module.exports.home = async function(req,res){
        try {
                let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        
        .populate({
                path:'comments',
                populate:{
                        path:'user'
                }
        });


        let users = await User.find({});
 
        return res.render('home',{
                title:'CodersArena|home',
                posts:posts,
                all_users:users
        });
        }catch(err){
                console.log('Error occurred in loading the CODERSARENA homepage',err);
                return;

        }
        
}
