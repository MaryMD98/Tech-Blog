// handler for updating a post
const updatePost = async (event) => {
    event.preventDefault();
    //get the updated title and content
    const title = document.querySelector('#updateTitle').value.trim();
    const info = document.querySelector('#updateContent').value;
    const id = event.target.getAttribute('data-id');

    if(title && info){
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({title, info}),
            headers: { 'Content-Type': 'application/json'},
        });
        if(response.ok){ document.location.replace('/api/users/');}
        else {alert('failed to create a new comment');}
    }
};

// handler for deleting a post
const deleteHandler = async (event) => {
    event.preventDefault();
    const id = event.target.getAttribute('data-id');
    if(id){
        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });
        if(response.ok){ document.location.replace('/api/users/');}
        else {alert('failed to create a new comment');}
    }
};


// event listener to update a post
document.querySelector('#updatePost').addEventListener('click', updatePost);

// event listener to delete a post
document.querySelector('#deletePost').addEventListener('click', deleteHandler);