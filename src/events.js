homeButton.addEventListener("click", (event) => {
    refreshHomePage();
})


signupButton.addEventListener('click', (event) => {
    event.preventDefault();

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;


    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        db.collection("users").doc(cred.user.uid).set({
            name:signupForm['signup-name'].value});

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


account_button.addEventListener('click', (event) => {
    $(document).ready(function() {
        let uid = firebase.auth().currentUser.uid;

    });
})


document.addEventListener('DOMContentLoaded', function() {
    M.Modal.init(modal);
})

newReviewButton.addEventListener("click", (event) => {
    event.preventDefault();
    let html = renderNewReview();
    $root.empty();
    $root.append(html);
    appendOptions();

    let user = firebase.auth().currentUser;
    let submit_review_button = document.querySelector('#review-submit');
    submit_review_button.addEventListener("click", (event) => {
        let poster_name = document.getElementById("inputName").value;
        let course = document.getElementById("course").value;
        let rating = document.getElementById("inputRating").value;
        let professor = document.getElementById("inputState").value;
        let review = document.getElementById("review-body").value;
        // Should add some cool animations later
        let id = faculty_map.get(professor);
        let reviewRef = submitReviewToDB(poster_name, course, rating, review, user.uid, id);
    });
})

function appendOptions() {
    faculty_list.sort().forEach(prof => {
        $('#inputState').append(`<option value="${prof}"> ${prof}</option>`);
    })
}
