$(function(){
    loadAllPost();
});

$('#search').click(function(){
    loadPostByUser();
});

function loadAllPost() {
    $('#posts').empty();
    //Get all posts
    var url = 'http://localhost:8080/api/posts/';
    
    // POINT 6. Call REST APIs with Axios
    axios.get(url)
    .then(function (res) {
        for (let i = 0; i < res.data.length; i++) {
            const posts = res.data[i];
            loadPost(posts);
        }
        console.log(res);
    })
    .catch(function (error) {
        console.log(error);
    });
            // POINT 7. User Mustache render template(post.mst) with json data from the API    
            function loadPost(posts) {
                $.get('post.mst', function (template) {
                    var rendered = Mustache.render(template, posts);
                    $('#posts').append(rendered);
                });
            }
        
        }
        

function loadPostByUser() {
    // Additional 1.
}
    

