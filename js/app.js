let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=US`;
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
let employeesIndex;



// use fetch to retrieve info from the API
fetch(urlAPI)
.then(response => response.json())
.then(response => response.results)
.then(displayEmployees)
.catch(err => console.log(err.message))


function displayEmployees(employeeData) {
    employees = employeeData;
    // store the employee HTML as we create it
    let employeeHTML = '';
    // loop through each employee and create HTML markup
    employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;
    // template literals make this so much cleaner!
    employeeHTML += `
    <div class="card" data-index="${index}">
    <img class="avatar" src="${picture.large}" />
    <div class="text-container">
    <h4 class="name">${name.first} ${name.last}</h4>
    <p class="email">${email}</p>
    <p class="address">${city}</p>
    </div>
    </div>
    `
    });
    gridContainer.innerHTML = employeeHTML;
}


//Modal

function displayModal(index) {

    // use object destructuring make our template literal cleaner
    let { name, dob, phone, email,
         location: { city, street, state, postcode
    }, picture } = employees[index];
    employeesIndex = employees.indexOf(employees[index]);
    let date = new Date(dob.date);
    const modalHTML = `
    <button class="rightButton ">&#10095;</button>
    <button class="leftButton ">&#10094;</button>
    <img id="profilePic" class="avatar" src="${picture.large}" />
    <div class="text-container">
    <h2 class="name">${name.first} ${name.last}</h2>
    <p class="email">${email}</p>
    <p class="address">${city}</p>
    <hr />
    <p>${phone}</p>
    <p class="address">${street.number},${street.name}, ${state} ${postcode}</p>
    <p>Birthday:
    ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
    `;
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;

    //declaring next and prev buttons
    const rightBtn = document.querySelector(".rightButton");
    const leftBtn = document.querySelector(".leftButton");
    rightBtn.addEventListener("click", nextCard);
    leftBtn.addEventListener("click", previousCard);

    //next card function
    function nextCard() {
        if (employeesIndex < 11) {
          displayModal((employeesIndex += 1));
          
        } 
      }
    
      // previous card function
      function previousCard() {
        if (employeesIndex > 0) {
          displayModal((employeesIndex -= 1));
        }
      }
    
 }
 






 //eventListener 
 gridContainer.addEventListener('click', e => {
    //make sure the click is not on the gridcontainer itself
    if (e.target !== gridContainer){
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');

        displayModal(index);
    }
 });

 //filter search
 const userInput = document.getElementById("search");
 function searchFilter() {
    const employeeNames = document.getElementsByClassName("name");
    const searchFilter = userInput.value.toUpperCase();
    const users = [...employeeNames];
    users.forEach((employee) => {
      if (employee.innerHTML.toUpperCase().indexOf(searchFilter) > -1) {
        employee.closest(".card").style.display = "flex";
      } else {
        employee.closest(".card").style.display = "none";
      }
    });
  }


userInput.addEventListener("keyup", searchFilter);
modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
    document.body.style.overflow = "auto";
});
