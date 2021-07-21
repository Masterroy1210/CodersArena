{       //This AJAx is used to view created post and deleted view without refreshing the home page

    //Method to submit the form data using AJAX
    let createPost = function(){
        newPostForm= $('#new-post-form');
        
        newPostForm.submit(function(e){
            e.preventDefault()

            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(),
                success:function(data){
                    let newPost =newPostDom(data.data.post);
                    $(`#post-list-container>ul`).prepend(newPost);
                    deletePost($('.delete-post-button',newPost))

                },error:function(err){
                    console.log(error.responseText);
                }
            });
            

        });
    }

    //Method to the post in HTML Dom
    let newPostDom = function(post){
        return $(`<link rel="stylesheet" href="/css/post.css">

        <li id="post -${post._id} ">
        <div id="postdiv">
          <p id="username"><i class="fa fa-user-circle-o" aria-hidden="true"></i>${post.user.name} </p>
            <small>
              <a href="/posts/destroy/${post._id}">
                <i class="fa fa-trash" aria-hidden="true"></i>
              </a>
            </small>
    
         </div>
         <div>
          <p id="content">${post.content}</p>
         </div>                
    </li>
      <div class="post-commentarea">
            <form action="/comments/create" method="POST">
            <input type="text" name="content" placeholder="Type here to comment...">
            <input type="hidden" name="post" value="${post._id}">
            <input type="submit" value="Add Comment">
          
          </form>
          
        </div>
          <div class="post-comment-list">
            <ul id="post-commnents-${post._id}">
                
            </ul>
    
          
      </div>`)

    }


    //Method to delete a post from Dom

    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success : function(data){
                    $(`#post-${data.data.post._id}`).remove();

                },error:function(error){
                    console.log(error.responseText);

                }
            });
        });

    }



    createPost();
}