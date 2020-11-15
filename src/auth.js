auth.onAuthStateChanged(user => {
    if (user) {
        //for logged-in user
        login_button.style.display = 'none';
        account_button.style.display = 'inline';
        logout_button.style.display = 'inline';
        signup_button.style.display = 'none';
        newReviewButton.style.display = 'inline';
    } else {
        //for logged-out
        logout_button.style.display = 'none';
        signup_button.style.display = 'inline';
        login_button.style.display = 'inline';
        account_button.style.display = 'none';
        newReviewButton.style.display = 'none';
    }
})






