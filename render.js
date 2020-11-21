function renderNewReview() {
    return `
    <div class="jumbotron" style="margin: 5%">
        <form>
            <label for="course">Course</label>
            <input type="text" class="form-control" id="course" placeholder="Enter Course" required>  
            
            <label for="inputRating">Rating</label>
            <select id="inputRating" class="form-control">
                <option selected>Choose a Rating</option>
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
         
            <label for="inputState">Professor</label>
            <select id="inputState" class="form-control">
                <option selected>Choose Professor</option>
            </select>
            <label for="review-body">Review</label>
                <textarea class="form-control" id="review-body" placeholder="Write review here..."></textarea>
            <button type="button" class="btn btn-secondary" id="review-submit">Submit</button>
        </form>  
    </div>
    `
}

function renderEditReview(review) {
    return `
    <div class="jumbotron" style="margin: 5%">
        <form>
            <label for="course">Course</label>
            <input type="text" class="form-control" id="course" placeholder="${review.course}" readonly>  
            
            <label for="inputRating">Rating</label>
            <select id="inputRating" class="form-control">
                <option selected hidden>${review.rating}</option>
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
            <label for="review-body">Review</label>
                <textarea class="form-control" id="review-body">${review.description}</textarea>
            <button type="button" class="btn btn-secondary" id="review-submit">Submit</button>
        </form>  
    </div>
    `
}

function renderSearchCard() {
    return `
     <div class="card bg-light mb-3" style="margin-top: 50px; width: 50%; padding: 100px; margin-left: 25%; margin-right: 25%">
                <div class="card-body">
                    <h5 class="card-title">Find a Professor...</h5>
                    <form class="form-inline" id="search-form" autocomplete="off" action="/action_page.php">
                        <div class="autocomplete" style="width:300px;">
                            <input class="form-control mr-sm-2" id="myInput" type="text" name="myInput" placeholder="Search">
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit" id="submit-search">Search</button>
                        </div>
                    </form>
                </div>
            </div>
    `
}


function renderProfessorCard(prof) {
    let html = `
    <div class="container">
        <div class="card bg-light" >
            <div class="card-header">${prof.name}</div>
                <div class="card-body">
                    <p class="card-title">Title: <span>${prof.title}</span></p>
                    <p class="card-title">Email: <span>${prof.email}</span></p>
                    <p class="card-title">Description: <span>${prof.des}</span></p>
                </div>
            <button type="button" class="btn btn-danger">Return</button>
        </div>
    </div>
    `
    let review_header = `
        <div class="jumbotron">
        <h1 class="display-4">Reviews</h1>
        </div>
    `
    $root.empty();
    $root.append(html);
    $root.append(review_header);
}


//uid is the current user id
function renderReview(review, uid, edit_counter, delete_counter) {
    let html;
    if (uid === review.uid) {
        //allow edits
        html = `
        <div class="card bg-light" style="margin-top: 50px; width: 50%; padding: 100px; margin-left: 25%; margin-right: 25%">
            <div class="card-body">
                <p class="card-title">Name: <span>${review.name}</span></p>
                <p class="card-title">Course: <span>${review.course}</span></p>
                <p class="card-title">Rating: <span>${review.rating}</span> / 5</p>
                <p class="card-title">Description: <span>${review.description}</span></p>
            </div>
            <div class="container button-row" id="button_row"> 
                <button type="button" class="btn btn-secondary edit-button" id="${edit_counter}">Edit</button>
                <button type="button" class="btn btn-danger delete-button" id="${delete_counter}">Delete</button>
            </div>
        </div>
    `
    } else {
        //display only
        html = `
        <div class="card bg-light" style="margin-top: 50px; width: 50%; padding: 100px; margin-left: 25%; margin-right: 25%">
            <div class="card-body">
                <p class="card-title">Name: <span>${review.name}</span></p>
                <p class="card-title">Course: <span>${review.course}</span></p>
                <p class="card-title">Rating: <span>${review.rating}</span> / 5</p>
                <p class="card-title">Description: <span>${review.description}</span></p>
            </div>
        </div>
    `
    }

    $root.append(html);
}

function renderAccountInfo(doc) {
    let account = modal[2];
    let html = `
    <div class="jumbotron account-info" style="background: transparent">
        <p>Name: <span>${doc.data().name}</span></p>
        <p>Reviews: <span>${doc.data().reviews}</span></p>
    </div>
    `
    account.innerHTML += html;
}

function renderEditBox(review) {
    let html = `
    <div class="container" id="edit_review_form">
        <div class="form-group">
            <label for="editTextArea"></label>
            <textarea class="form-control" id="editTextArea" rows="3"><span>${review.description}</span></textarea>
        </div>
        <div class="container edit-row"> 
                <button type="button" class="btn btn-secondary submit-edit" id="submit-edit">Confirm</button>
                <button type="button" class="btn btn-danger cancel-edit" id="cancel-edit">Cancel</button>
            </div>
    </div>
 
    `
    return html;


}
