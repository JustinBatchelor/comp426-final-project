// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let firebaseConfig = {
    apiKey: "AIzaSyAV_QNEjCT6RG4d2QknVa6ltNC3tlR6HX8",
    authDomain: "comp426-final-8b88d.firebaseapp.com",
    databaseURL: "https://comp426-final-8b88d.firebaseio.com",
    projectId: "comp426-final-8b88d",
    storageBucket: "comp426-final-8b88d.appspot.com",
    messagingSenderId: "103245284642",
    appId: "1:103245284642:web:0335169108149f09f7117b",
    measurementId: "G-JG8SKZ0QC2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

let faculty_list = [];
let faculty_map = new Map();
let users_list = [];
let users_map = new Map();


db.collection('faculty').get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        faculty_list.push(doc.data().name);
        faculty_map.set(doc.data().name, doc.id);
    });
})


db.collection('users').get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        users_list.push(doc.data().name);
        users_map.set(doc.data().name, doc.id);
    });
})


function getFacultyReference() {
    return db.collection("faculty").get();
}

function getUserReference() {
    return db.collection("users").get();
}

function displayProfessorCard(prof_uid){
    db.collection("faculty").doc(prof_uid).get().then(professor => {
        renderProfessorCard(professor.data());
        return_button = document.querySelector('.btn-danger');
        return_button.addEventListener('click', (event) => {
            refreshHomePage();
        });
    })
}

function displayProfessorReviews(prof_uid, poster_id) {
    db.collection("faculty").doc(prof_uid).collection("reviews").get().then(reviews => {

        reviews.forEach(review => {
            renderReview(review.data(), poster_id);
        })
    });
}


function submitReviewToDB(name, course, rating, description, poster_id, id) {
    let review_reference = db.collection("faculty").doc(id).collection("reviews").add({
        name: name,
        course: course,
        rating: rating,
        description: description,
        uid: poster_id
    }).then(function() {
        displayProfessorCard(id);
        displayProfessorReviews(id, poster_id);
    }).catch(function(error) {
        console.error("Error adding document: ", error);
    });
}