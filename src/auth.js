

// auth.onAuthStateChanged(user => {
//     if (user) {
//         //for logged in user
//     } else {
//         //for logged out user
//     }
// })

const signupForm = document.querySelector('#signup-form');
const signupButton = document.querySelector('#signup-button');
const logout = document.querySelector('#logout');
const loginForm = document.querySelector('#login-form');
const loginButton = document.querySelector('#login-button');

signupButton.addEventListener('click', (event) => {
    event.preventDefault();

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        db.collection("users").doc(cred.user.uid).set({
            name: signupForm['signup-name'].value});
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
})

logout.addEventListener('click', (event) => {
    event.preventDefault();
    auth.signOut();
})

loginButton.addEventListener('click', (event) => {
    event.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    })
})