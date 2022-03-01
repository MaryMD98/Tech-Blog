
//login page -> login handler
const loginHandler = async (event) => {
    event.preventDefault();

//collect values from the login form
const username = document.querySelector('#username').value.trim();
const password = document.querySelector('#password').value.trim();

    if(username && password){
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({username, password}), 
            headers: { 'Content-Type': 'application/json'},
        });

        if(response.ok){document.location.replace('/api/users/');}
        else{alert(response.statusText);}
    }
};

// create a new user
const sigupHandler = async (event) => {
    event.preventDefault();

//colect values from the singup form
const username = document.querySelector('#username-signup').value.trim();
const password = document.querySelector('#password-signup').value.trim();

    if (username && password){
        const response = await fetch('/api/users/', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'},
        });

        if(response.ok){document.location.replace('/api/users/');}
        else{alert(response.statusText);}
    }
};

//event listener for login
document
    .querySelector('.signIN')
    .addEventListener('submit', loginHandler);

// event listener for creating user
document
    .querySelector('.signUP')
    .addEventListener('submit', sigupHandler);