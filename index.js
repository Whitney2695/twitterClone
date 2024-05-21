document.addEventListener('DOMContentLoaded', function() {
    const userSelect = document.getElementById('user-select');
    const postsList = document.getElementById('posts-list');
    const commentsList = document.getElementById('comments-list');
    const usernameSpan = document.getElementById('username');
    const emailSpan = document.getElementById('email');
    const phoneSpan = document.getElementById('phone');
    const websiteSpan = document.getElementById('website');
    const userImage = document.querySelector('.user-image');
    let currentUser = {};

    // Fetch users
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            userSelect.innerHTML = users.map(user => 
                `<option value="${user.id}">${user.username}</option>`
            ).join('');
            
            // Default user ID 1
            userSelect.value = 1;
            loadUserDetails(1);
            loadPostsByUser(1);
        });

    // Fetch posts by user
    function loadPostsByUser(userId) {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            .then(response => response.json())
            .then(posts => {
                postsList.innerHTML = posts.map(post => 
                    `<li data-post-id="${post.id}">
                    <div class="post">
                        <div class="post-profile">
                            <img src="https://i.pinimg.com/originals/6c/61/0d/6c610d3a3f1021641afe0c2bfc4ac591.jpg" alt="User Image" class="user-image" width="70px" height="100%">
                        </div>
                        <div class="post-content">
                        <div class= "check">
                            ${currentUser.username} <ion-icon name="checkmark-circle"></ion-icon><ion-icon name="logo-twitter"></ion-icon><br></div>
                            ${post.body}
                            <div class="post-icons">
                                <ion-icon name="chatbubble-ellipses"></ion-icon><span>200</span>
                                <ion-icon name="repeat"></ion-icon><span>200</span>
                                <div class="love"><ion-icon name="heart"></ion-icon><span>200</span></div>
                            </div>
                        </div>
                        </div>
                    </li>`
                ).join('');

                // Load comments for the first post by default
                if (posts[0]) {
                    loadCommentsByPost(posts[0].id);
                }
            });
    }

    // Fetch comments by post
    function loadCommentsByPost(postId) {
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
            .then(response => response.json())
            .then(comments => {
                commentsList.innerHTML = comments.map(comment => 
                    `<li>
                    <div class="comments">
                        <div class="comment-profile">
                            <img src="https://i.pinimg.com/originals/6c/61/0d/6c610d3a3f1021641afe0c2bfc4ac591.jpg" alt="User Image" class="user-image" width="70px" height="100%">
                        </div>
                        <div class="comment-content">
                        <div class= "check">
                        ${comment.name} <ion-icon name="checkmark-circle"></ion-icon><ion-icon name="logo-twitter"></ion-icon>
                            </div>
                            <p>${comment.body}</p>
                            <hr>
                            <div class="post-icons">
                                <ion-icon name="chatbubble-ellipses"></ion-icon><span>0</span>
                                <ion-icon name="repeat"></ion-icon><span>0</span>
                                <div class="love"><ion-icon name="heart"></ion-icon><span>0</span></div>
                            </div>
                        </div>
                        </div>
                    </li>`
                ).join('');
            });
    }

    // Fetch user details
    function loadUserDetails(userId) {
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then(response => response.json())
            .then(user => {
                currentUser = user;
                usernameSpan.textContent = user.username;
                emailSpan.textContent = user.email;
                phoneSpan.textContent = user.phone;
                websiteSpan.textContent = user.website;
                userImage.src = "https://i.pinimg.com/originals/6c/61/0d/6c610d3a3f1021641afe0c2bfc4ac591.jpg";
            });
    }

    // Event listeners
    userSelect.addEventListener('change', function() {
        const userId = this.value;
        loadUserDetails(userId);
        loadPostsByUser(userId);
    });

    postsList.addEventListener('click', function(event) {
        if (event.target.tagName === 'LI' || event.target.closest('LI')) {
            const postId = event.target.closest('LI').getAttribute('data-post-id');
            loadCommentsByPost(postId);
        }
    });
});


