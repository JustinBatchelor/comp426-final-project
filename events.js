homeButton.addEventListener("click", (event) => {
    refreshHomePage();
})


signupButton.addEventListener('click', (event) => {
    event.preventDefault();

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;


    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        db.collection("users").doc(cred.user.uid).set({
            name: signupForm['signup-name'].value,
            uid: cred.user.uid,
            reviews: 0

        });

        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
        updateUsersList();
    });
})

logout.addEventListener('click', (event) => {
    event.preventDefault();
    let account_info = modal[2];
    account_info.remove();
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
        failedLogin = false;
    }).catch(error => {

    })

})


account_button.addEventListener('click', (event) => {
    $(document).ready(function() {
        let account_info = document.querySelector('.account-info');
        if (account_info === null) {
            let uid = firebase.auth().currentUser.uid;
            let userRef = db.collection("users").doc(uid);
            userRef.get().then(function(doc) {
                renderAccountInfo(doc);
            })
        } else {
            account_info.remove();
            let uid = firebase.auth().currentUser.uid;
            let userRef = db.collection("users").doc(uid);
            userRef.get().then(function(doc) {
                renderAccountInfo(doc);
            })
        }
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

    let userRef = db.collection("users").doc(user.uid);
    let name;
    userRef.get().then(function(doc) {
        name = doc.data().name;
    })

    let submit_review_button = document.querySelector('#review-submit');
    submit_review_button.addEventListener("click", (event) => {
        let course = document.getElementById("course").value;
        let rating = document.getElementById("inputRating").value;
        let professor = document.getElementById("inputState").value;
        let review = document.getElementById("review-body").value;
        // Should add some cool animations later
        let id = faculty_map.get(professor);
        let reviewRef = submitReviewToDB(name, course, rating, review, user.uid, id);
        let user_reference = db.collection("users").doc(user.uid);
        user_reference.update("reviews", firebase.firestore.FieldValue.increment(1));
    });
})

function appendOptions() {
    faculty_list.sort().forEach(prof => {
        $('#inputState').append(`<option value="${prof}"> ${prof}</option>`);
    })
}

