// handler for creating a new post
const newPOST = async (event) => {
    event.preventDefault();
    // get the information from the form
    const title = document.querySelector('#postTitle').value.trim();
    const info = document.querySelector('#postContent').value;

    if(title && info){
        const response = await fetch(`/api/posts/`, {
            method: 'POST',
            body: JSON.stringify({title, info}),
            headers: { 'Content-Type': 'application/json'},
        });
        if(response.ok){ document.location.replace('/api/users/'); }
        else {alert('failed to create a post');}
    }
};

// event listener for creating a new post
document.querySelector('#createPOST').addEventListener('submit', newPOST);