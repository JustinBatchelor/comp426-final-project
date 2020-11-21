/*
 * Buttons that will be loaded when the website is launched
 * These are declared const because they will be part of the
 * nav bar and should be viewable at all times.
 */
const modal = document.querySelectorAll('.modal');
const signupForm = document.querySelector('#signup-form');
const signupButton = document.querySelector('#signup-button');
const logout = document.querySelector('#logout');
const loginForm = document.querySelector('#login-form');
const loginButton = document.querySelector('#login-button');
const login_button = document.querySelector("#login");
const logout_button = document.querySelector("#logout");
const account_button = document.querySelector("#account");
const signup_button = document.querySelector("#signup");
const newReviewButton = document.querySelector('#write-review');
const homeButton = document.querySelector('#home');

const $root = $('#root');
let submit_button;
let searchForm;
let failedLogin = false;

function goToHomePage() {
    $root.empty();
    let html = renderSearchCard();
    $root.append(html);
}

function refreshHomePage() {
    goToHomePage();
    submit_button = document.querySelector("#submit-search");
    searchForm = document.querySelector('#search-form');
    updateSubmitButton();
    autocomplete(document.getElementById("myInput"), faculty_list);
}


function autocomplete(inp, arr) {
    let currentFocus;
    inp.addEventListener("input", function(e) {
        let a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function(e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });

    inp.addEventListener("keydown", function(e) {
        let x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode === 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode === 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode === 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        for (let i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        let x = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < x.length; i++) {
            if (elmnt !== x[i] && elmnt !== inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}


function updateSubmitButton(){
    submit_button.addEventListener("click", (event => {
        event.preventDefault();
        let user = firebase.auth().currentUser;
        let name = searchForm['myInput'].value;
        let id = faculty_map.get(name);
        displayProfessorCard(id);
        if (user === null) {
            displayProfessorReviews(id, 'none');
        } else {
            displayProfessorReviews(id, user.uid);
        }

    }));
}

