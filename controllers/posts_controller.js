const Post = require('../models/post');
const Comment = require('../models/comment');




module.exports.create =  async function(req,res){
    try{
       let post=await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"Post Created!"
            });
        }


        req.flash('success','Post posted succeefully..!');
        res.redirect('back');
    }
    catch(err){
        console.log('Error in creating the post');
        return;

    }
}
    
     



module.exports.destroy =  async function(req,res){
    try{
        post =await Post.findById(req.params.id);
  
        //Checking whether the user who created the post is same as user who is requesting to delete it
        //.id means converting the object id into string
        if(post.user==req.user.id){
               post.remove();
              await Comment.deleteMany({post:req.params.id});

              if(req.xhr){
                  return res.status(200).json({
                      data:{
                          post_id:req.params.id
                      },
                      message:'Post deleted Successfully'
                  }); 
              }
              req.flash('error','Post Deleted Successfully');
              return res.redirect('back');

        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error in Deleting the Post',err);
        return ;
    }
    
}