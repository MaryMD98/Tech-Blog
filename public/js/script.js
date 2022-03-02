// handler for creating a new comment
const createComent = async (event) => {
    event.preventDefault();
    //get the information from the new comment 
    const content = document.querySelector('#coment').value;
    const id = event.target.getAttribute('data-id');

    if(content && id){
        const response = await fetch(`/${id}`, {
            method: 'POST',
            body: JSON.stringify({content}),
            headers: { 'Content-Type': 'application/json'},
        });
        if(response.ok){ document.location.replace('/');}
        else {alert('failed to create a new comment');}
    }
};

// event listeners
// event listener for adding a new comment
document.querySelector('#comentNew').addEventListener('click', createComent);


/**pseudo-code hw14-MVC - blog site
 * 
 * navbar inludes homepage, dashboard and login option
 * // homepage navbar links to the homepage
 * // log in links to log in or sign up
 * // // sign up - prompt to create a username and a password -
 * // // sign up has a signup button and user credentials are saved
 * // // there is a session timeout that will asked for user to log in again
 * on sign in - navbar homepage, dashboard logout option
 * 
 * homepage option:
 * displays existing blog posts and includes the posts titles and date created
 * // when clicked on existing posts, post shows:
 * // // post title 
 * // // contents
 * // // post creator username
 * // // date post was created
 * // // option to leave a comment
 * //  when comment entered and click submit, while auth
 * // // coment is saved, post displays the new comment,
 * // // creators username and date created
 * 
 * dashboard option:
 * page displays the blog posts user has created 
 * and option to create a new blog post
 * // when click on "new blog post"
 * // // title and contents are saved 
 * // // dashboard page is reloaded and displays the new post
 * // when click on any blog posts
 * // // the option to delete or update the post shows up
 * // // after clicking any button, page refreshes and updates 
 * 
 * logout option:
 * user is logged out
 * 
 * idle option:
 * when idle for a set time comments are visible but 
 * before adding, update or delete coments is requests to log bak in
 * 
 */