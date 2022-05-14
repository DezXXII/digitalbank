const inputFirstname = document.getElementById('firstname');
const firstnameErrorMessage = document.getElementById('firstname-error-message');

inputFirstname.addEventListener('change', (e) => {
    if(inputFirstname.value.length < 3 || inputFirstname.value.length > 15) {
        inputFirstname.classList.add('not-valid-input');   
        firstnameErrorMessage.classList.add('error-firstname');
        inputFirstname.classList.remove('valid-input');
    } else {
        inputFirstname.classList.add('valid-input');
        firstnameErrorMessage.classList.remove('error-firstname');
        inputFirstname.classList.remove('not-valid-input');
    }
});

const inputLastname = document.getElementById('lastname');
const lastnameErrorMessage = document.getElementById('lastname-error-message');

inputLastname.addEventListener('change', (e) => {
    if(inputLastname.value.length < 3 || inputLastname.value.length > 15) {
        inputLastname.classList.add('not-valid-input');   
        lastnameErrorMessage.classList.add('error-lastname');
        inputLastname.classList.remove('valid-input');
    } else {
        inputLastname.classList.add('valid-input');
        lastnameErrorMessage.classList.remove('error-lastname');
        inputLastname.classList.remove('not-valid-input');
    }
});

const inputEmail = document.getElementById('email');
const emailErrorMessage = document.getElementById('email-error-message');

inputEmail.addEventListener('change', (e) => {
    if(!inputEmail.value.includes('@')) {
        email.classList.add('not-valid-input');   
        emailErrorMessage.classList.add('error-email');
        email.classList.remove('valid-input');
    } else {
        email.classList.add('valid-input');
        emailErrorMessage.classList.remove('error-email');
        email.classList.remove('not-valid-input');
    }
});

const inputPassword = document.getElementById('password');
const passwordErrorMessage = document.getElementById('password-error-message');

inputPassword.addEventListener('change', (e) => {
    if(inputPassword.value.length < 8 || inputPassword.value.length > 20) {
        inputPassword.classList.add('not-valid-input');   
        passwordErrorMessage.classList.add('error-password');
        inputPassword.classList.remove('valid-input');
    } else  {
        inputPassword.classList.add('valid-input');
        passwordErrorMessage.classList.remove('error-password');
        inputPassword.classList.remove('not-valid-input');
    }
});

const submitBtn = document.getElementById('submitBtn');

// submitBtn.addEventListener('click', (e) => {
//     if(inputFirstname.value.length < 3 || inputFirstname.value.length > 15) {
//         firstnameErrorMessage.classList.add('error-firstname')
//     } 
//     if (inputLastname.value.length < 3 || inputLastname.value.length > 15) {
//         lastnameErrorMessage.classList.add('error-lastname');
//     }
//     if (!inputEmail.value.includes('@')) {
//         emailErrorMessage.classList.add('error-email')
//     } 
//     if(inputPassword.value.length < 8 || inputPassword.value.length > 20) {
//         passwordErrorMessage.classList.add('error-password');
//     }

//     if(inputFirstname.value.length > 3 && inputFirstname.value.length < 15 && inputLastname.value.length > 3 && inputLastname.value.length < 15 && inputEmail.value.includes('@') && inputPassword.value.length > 8 && inputPassword.value.length < 20) {
//         console.log('funciona')
//     } else {
//         e.preventDefault()
//     }
// });
