let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=US`;
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");


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

function displayModal(index,employee) {

    // use object destructuring make our template literal cleaner
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];
    let date = new Date(dob.date);
    const modalHTML = `
    <button class="rightButton modalButton">&#62;</button>
    <button class="leftButton modalButton">&#60;</button>
    <img class="avatar" src="${picture.large}" />
    <div class="text-container">
    <h2 class="name">${name.first} ${name.last}</h2>
    <p class="email">${email}</p>
    <p class="address">${city}</p>
    <hr />
    <p>${phone}</p>
    <p class="address">${street}, ${state} ${postcode}</p>
    <p>Birthday:
    ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
    `;
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;

      // **** variables to select for buttons **** 
      rightBtn = document.querySelector('.rightButton');
      leftBtn = document.querySelector('.leftButton');
  
      // **** event listeners to scroll through modal cards ****
      rightBtn.addEventListener('click', () =>{
          nextCard(employee);
      });
  
      leftBtn.addEventListener('click', () => {
          previousCard(employee);
      });
 }
 
//next and previous cards

 function nextCard(employees) {

  }
  
  
  function previousCard(employees) {
    
 
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
 



 modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
    document.body.style.overflow = "auto";
    });
    

//buttons



