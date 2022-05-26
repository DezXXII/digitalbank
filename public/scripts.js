const inputFirstname = document.getElementById('firstname');
const firstnameErrorMessage = document.getElementById('firstname-error-message');

inputFirstname.oninput = function() {
    if(inputFirstname.value.length < 3 || inputFirstname.value.length > 15) {
        inputFirstname.classList.add('not-valid-input');   
        inputFirstname.classList.remove('valid-input');
    } else {
        inputFirstname.classList.add('valid-input');
        inputFirstname.classList.remove('not-valid-input');
    }
}

const inputLastname = document.getElementById('lastname');
const lastnameErrorMessage = document.getElementById('lastname-error-message');

inputLastname.oninput = function() {
    if(inputLastname.value.length < 3 || inputLastname.value.length > 15) {
        inputLastname.classList.add('not-valid-input');   
        inputLastname.classList.remove('valid-input');
    } else {
        inputLastname.classList.add('valid-input');
        inputLastname.classList.remove('not-valid-input');
    }
}

const inputEmail = document.getElementById('email');
const emailErrorMessage = document.getElementById('email-error-message');

inputEmail.oninput = function(){
    if(!inputEmail.value.includes('@')) {
        email.classList.add('not-valid-input');   
        email.classList.remove('valid-input');
    } else {
        email.classList.add('valid-input');
        email.classList.remove('not-valid-input');
    }
};

const inputPassword = document.getElementById('password');
const passwordErrorMessage = document.getElementById('password-error-message');

inputPassword.oninput = function() {
    if(inputPassword.value.length < 8 || inputPassword.value.length > 20) {
        inputPassword.classList.add('not-valid-input');   
        inputPassword.classList.remove('valid-input');
    } else  {
        inputPassword.classList.add('valid-input');
        inputPassword.classList.remove('not-valid-input');
    }
};