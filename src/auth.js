const signupForm = document.querySelector('#signup-form');
const signupButton = document.querySelector('#signup-button');
const logout = document.querySelector('#logout');
const loginForm = document.querySelector('#login-form');
const loginButton = document.querySelector('#login-button');
const login_button = document.querySelector("#login");
const logout_button = document.querySelector("#logout");
const account_button = document.querySelector("#account");
const signup_button = document.querySelector("#signup");
const submit_button = document.querySelector("#submit-search");
const searchForm = document.querySelector('#search-form');
const newReviewButton = document.querySelector('#write-review');
const homeButton = document.querySelector('#home');
const $root = $('#root');

let faculty_list = [];
let faculty_map = new Map();

homeButton.addEventListener("click", (event) => {
    // renderHomePage();
    location.reload();
})

db.collection('faculty').get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // console.log(doc.id);
        faculty_list.push(doc.data().name);
        faculty_map.set(doc.data().name, doc.id);
    });
})
// console.log(faculty_list);
// console.log(faculty_map);

auth.onAuthStateChanged(user => {
    if (user) {
        //for logged-in user
        login_button.style.display = 'none';
        account_button.style.display = 'inline';
        logout_button.style.display = 'inline';
        signup_button.style.display = 'none';
    } else {
        //for logged-out
        logout_button.style.display = 'none';
        signup_button.style.display = 'inline';
        login_button.style.display = 'inline';
        account_button.style.display = 'none';
    }
})

newReviewButton.addEventListener("click", (event) => {
    event.preventDefault();
    let options = getProfessors();

    let html = `
    <form>
       <label for="inputName">Name</label>
            <input type="text" class="form-control" id="inputName" placeholder="Enter Name" required>  
            <label for="inputState">Professor</label>
            <select id="inputState" class="form-control">
                <option selected>Choose Professor</option>` +
                    options + `
            </select>
            <label for="review-body">Review</label>
            <textarea class="form-control" id="review-body" placeholder="Write review here..."></textarea>
        <button type="button" class="btn btn-secondary">Submit</button>
    </form>
    `
    $root.empty();
    $root.append(html);

})

function getProfessors() {
    let html = ``;
    faculty_list.sort().forEach(prof => {
        html += `<option>` + prof + '</option>'
        }
    )
    return html;
}

function renderHomePage() {
    let html = `<div class="card bg-light mb-3" style="margin-top: 50px; width: 50%; padding: 100px; margin-left: 25%; margin-right: 25%">
                <div class="card-body">
                    <h5 class="card-title">Find a Professor...</h5>
                    <form class="form-inline" id="search-form" autocomplete="off" action="/action_page.php">
                        <div class="autocomplete" style="width:300px;">
                            <input class="form-control mr-sm-2" id="myInput" type="text" name="myInput" placeholder="Search">
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit" id="submit-search">Search</button>
                        </div>
                    </form>
                </div>
            </div>`
    $root.empty();
    $root.append(html);
}

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
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
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
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
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
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}
autocomplete(document.getElementById("myInput"), faculty_list);

submit_button.addEventListener("click", (event => {
    event.preventDefault();
    let name = searchForm['myInput'].value;
    let id = faculty_map.get(name);
    // console.log(name);
    // console.log(id);
    db.collection("faculty").doc(id).get().then(r => {
        console.log(r.data());
        renderProfessorCard(r.data());
        });

}));

function renderProfessorCard(prof) {
    let html = `
        <div class="card bg-light" style="max-width: 18rem;">
            <div class="card-header">${prof.name}</div>
                <div class="card-body">
                    <h5 class="card-title">Light card title</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
        </div>
    `
    $root.empty();
    $root.append(html);
}