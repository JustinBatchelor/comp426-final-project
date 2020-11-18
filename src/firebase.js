
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
// let id_to_user = [];
// let id_to_user_map = new Map();

updateFacultyList();
updateUsersList();

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
    let edit_counter = 1;
    let delete_counter = -1;
    db.collection("faculty").doc(prof_uid).collection("reviews").get().then(reviews => {
        reviews.forEach(review => {
            renderReview(review.data(), poster_id, edit_counter, delete_counter);
            let edit_button = document.querySelector("[id=" + CSS.escape(edit_counter.toString()) +"]");
            let delete_button = document.querySelector("[id=" + CSS.escape(delete_counter.toString()) +"]");
            edit_button.addEventListener('click', (event) => {
                event.preventDefault();
            })
            delete_button.addEventListener('click', (event) => {
                event.preventDefault();
                let document_reference = review.id;
                db.collection("faculty").doc(prof_uid).collection("reviews").doc(document_reference).delete().then(function(){
                    displayProfessorCard(prof_uid);
                    displayProfessorReviews(prof_uid, poster_id);
                    let user_reference = db.collection("users").doc(firebase.auth().currentUser.uid);
                    user_reference.update("reviews", firebase.firestore.FieldValue.increment(-1));
                })

            })
            edit_counter++;
            delete_counter--;
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


function updateFacultyList() {
    db.collection('faculty').get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            faculty_list.push(doc.data().name);
            faculty_map.set(doc.data().name, doc.id);
        });
    })
}

function updateUsersList() {
    users_map.clear();
    users_list = [];
    db.collection('users').get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            users_list.push(doc.data().name);
            users_map.set(doc.data().name, doc.id);
        });
    })
}
