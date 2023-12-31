console.log("Welcome to notes app. This is app.js");
showNotes();

//For displaying the date
let today = new Date();
let date_today= today.getDate();
let month_today = today.getMonth() + 1;
let year_today = today.getFullYear();
// console.log(date_today+ "/" + month_today);
let date_string = date_today+ "/" + month_today + "/" + year_today;

let date_span = document.querySelector('.date');
let text = document.createTextNode(`Date: ${date_string}`);
date_span.appendChild(text);






// If user adds a note, add it to the LocalStorage
let addBtn = document.getElementById("addBtn");

//Adding event listner to the button
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: addTitle.value,     //putting the value of the textbox to the array
    text: addTxt.value
  }   

  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));    //putting the value inside the array
 
  addTxt.value = "";     //reseting the textbox
  addTitle.value = "";   

  showNotes();
});

//Function to show elements from the local storage i.e. displaying the cards that have been filled

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let count=0;
  let html = "";
  //creating the card which will store the note
  notesObj.forEach(function (element, index) { 
    html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text"> ${element.text}</p>
          
          <button id="${index}" onClick="deleteNote(this.id)" class="btn btn-primary">Delete Note</a>
        </div>
      </div>
      `;
  });
//displaying the notes
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `<span style="color: red;">Uh oh!</span>
        <span>You haven't added any notes yet!</span><br>`;
  }
}

//funtion to delete the node

function deleteNote(index) {
  // console.log("A node is being deleted", index);
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);      // Deleting the element from the array
  localStorage.setItem("notes", JSON.stringify(notesObj));    //updating the local storage
  showNotes();
}

//Coding the search bar that set display properties to block or null depending on the query
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();    // For user entering without checking the uppercase
  // console.log("input event fired");
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;   //text inside the paragraph
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
