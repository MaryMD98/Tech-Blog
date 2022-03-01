const logoutHandler = async () => {
    const response = await fetch ('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if(response.ok){ document.location.replace('/');}
    else{alert(response.statusText);}
};

// add event listener to the log out button
document.querySelector('#logout').addEventListener('click', logoutHandler);