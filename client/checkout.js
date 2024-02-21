let adultTickets = 0
let childTickets = 0
let seniorTickets = 0
let studentTickets = 0

const url = 'https://big-als-farmers-market-6868e4ee73b9.herokuapp.com/api/'

async function GetAllEvents(){
    let response = await fetch('https://big-als-farmers-market-6868e4ee73b9.herokuapp.com/api/event');
    events = await response.json();
    return events;
}
async function GetAllBusinesses(){
    let response = await fetch('https://big-als-farmers-market-6868e4ee73b9.herokuapp.com/api/business');
    businesses = await response.json();
    return businesses;
}

async function GetAllAttends(){
    let response = await fetch('https://big-als-farmers-market-6868e4ee73b9.herokuapp.com/api/attends');
    attends = await response.json();
    return attends;
}

async function GetAllAttendees(){
  let response = await fetch('https://big-als-farmers-market-6868e4ee73b9.herokuapp.com/api/attendance');
  attends = await response.json();
  return attends;
}

async function handleOnLoad(){
    await createDropdown()
}

async function createDropdown(){
    let events = await GetAllEvents();

    let html =`
    <div>
    <div class="dropdown text-center mt-5">
    <button class="btn btn-dark btn-lg dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    <i class="bi bi-calendar4"></i>
    </button>
    <ul class="dropdown-menu" id="dropdown-container" style="max-height: 300px; overflow-y: auto;">`

    events.forEach(function(e){
        html+= `<div class="container"><li><button class="btn btn-light" onclick="GetBusinessPerDate('${e.eventID}', '${e.date}', '${e.location}')">${e.date}</button</li></div>`
    })

    html+= `</ul>
    </div>
    </div>`

    document.getElementById('date-select').innerHTML = html;

    html = ` <div class="text-center mt-5">
      <p class="display-6  lh-1 mb-3">(please select a date to continue)</p>
    </div>
    `
    document.getElementById('businesses-at-market-table').innerHTML = html;
}

async function GetBusinessPerDate(id, date, location){
    localStorage.setItem('pickedDate', date)
    localStorage.setItem('pickedLocation', location)
    localStorage.setItem('eventID', id)
    console.log(id)
    console.log(date)
    let businesses = await GetAllBusinesses();
    let attendsplural = await GetAllAttends();
    let events = await GetAllEvents();

    let html = `<div class="container my-5 text-center">
    <h1 class="display-4 text-body-emphasis">${location} ${date}<button onclick="ShowMap()" class="btn btn-lg btn-light my-5 ms-5">
    <i class="bi bi-pin-map"></i>
  </button></h1>
  `
  html+=`
  <div class="dropdown">
  <button class="btn btn-dark btn-lg dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
  <i class="bi bi-calendar4"></i>
  </button>
  <ul class="dropdown-menu" id="dropdown-container" style="max-height: 300px; overflow-y: auto;">`

  events.forEach(function(e){
      html+= `<div class="container"><li><button class="btn btn-light" onclick="GetBusinessPerDate('${e.eventID}', '${e.date}', '${e.location}')">${e.date}</button</li></div>`
  })

  html+= `</ul>
  </div>
  </div>`
  document.getElementById('date-select').innerHTML = html;

    html =`
    <div class="container text-center">

    <div class="p-5 text-center rounded-3 egshell" style="background-color: hsl(0, 0%, 100%);">
    <table class="table center" id="myTable">
        <thead id="table-header">
            <tr>
                <th scope="col">Booth Location</th>
                <th scope="col">Company Name</th>
                <th scope="col">Product Type</th>
                <th scope="col">Logo</th>
            </tr>
        </thead>
        <tbody id="myTableBody" class="table-group-divider">`;

    attendsplural.forEach(function(a){
        if (a.eventID == id){
            html+=`
            <tr>
                <td>${a.boothLocation}</td>
                <td>${businesses[a.businessID-1].companyName}</td>
                <td>${businesses[a.businessID-1].productType}</td>
                <td><img src="${businesses[a.businessID-1].logo}" alt="logo failed" style="max-width: 100px; max-height: 100px;"></td>
            </tr>`;

        }
    })
    html+=`</tbody>
    </table>
    </div>
    </div>

    <div class="center-container">
    <button class="btn btn-lg btn-primary my-5 ms-5">
        <a class="nav-link active" aria-current="page" href="purchasetickets2.html">Next</a>
    </button>
    </div>`
    document.getElementById('businesses-at-market-table').innerHTML = html;

    const pickedDate = localStorage.getItem('pickedDate');
    console.log('the date selected = ' + pickedDate);
}

function ShowMap(){
  window.open('map.html')
}

function handleOnLoadPage2(){
    const pickedDate = localStorage.getItem('pickedDate');
    console.log(pickedDate);
    // document.getElementById('testing').innerHTML = html;

    CreateCheckoutTable(pickedDate)
}

function CreateCheckoutTable(pickedDate){
    let html = `
    <div class="container py-5 col-md-8">
        <header>
            <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
                <h1 class="display-4 fw-normal text-body-emphasis">${localStorage.getItem('pickedLocation')}: ${localStorage.getItem('pickedDate')}</h1>
                <p class="fs-5 text-body-secondary">Please select how many of each ticket you would like to purchase</p>
            </div>
        </header>
    
        <main>

        <div class=" justify-content-center align-items-center">
        <div class="shadow card text-center">
            <div class="card-body" >

            <table class="table center" id="myTable">
                <thead id="table-header">
                    <tr>
                        <th scope="col">Type</th>
                        <th scope="col">Cost</th>
                        <th scope="col"></th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody id="myTableBody" class="table-group-divider">
                    <tr>
                        <td>Adult</td>
                        <td>$5</td>
                        <td><div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" onclick="RemoveTicket('adult', '${pickedDate}')" class="btn btn-light"><i class="bi bi-dash-lg"></i></button>
                            <button type="button" onclick="AddTicket('adult', '${pickedDate}')" class="btn btn-light"><i class="bi bi-plus-lg"></i></button>
                          </div></td>
                        <td>${adultTickets}</td>
                    </tr>
                    <tr>
                        <td>Child</td>
                        <td>$2</td>
                        <td><div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" onclick="RemoveTicket('child', '${pickedDate}')" class="btn btn-light"><i class="bi bi-dash-lg"></i></button>
                            <button type="button" onclick="AddTicket('child', '${pickedDate}')" class="btn btn-light"><i class="bi bi-plus-lg"></i></button>
                          </div></td>
                        <td>${childTickets}</td>
                    </tr>
                    <tr>
                        <td>Student</td>
                        <td>$3</td>
                        <td><div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" onclick="RemoveTicket('student', '${pickedDate}')" class="btn btn-light"><i class="bi bi-dash-lg"></i></button>
                            <button type="button" onclick="AddTicket('student', '${pickedDate}')" class="btn btn-light"><i class="bi bi-plus-lg"></i></button>
                          </div></td>
                        <td>${studentTickets}</td>
                    </tr>
                    <tr>
                        <td>Senior</td>
                        <td>$3</td>
                        <td><div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" onclick="RemoveTicket('senior', '${pickedDate}')" class="btn btn-light"><i class="bi bi-dash-lg"></i></button>
                            <button type="button" onclick="AddTicket('senior', '${pickedDate}')" class="btn btn-light"><i class="bi bi-plus-lg"></i></button>
                          </div></td>
                        <td>${seniorTickets}</td>
                    </tr>
                </tbody>
            </table>
                


            </div>
        </div>
        </div>

            <div class="center-container">
            <button class="btn btn-lg btn-secondary my-5 ms-5"><a class="dropdown-item" href="purchasetickets1.html">&#8592;</a></button>
                <button class="btn btn-lg btn-primary my-5 ms-5">
                    <a class="nav-link active" aria-current="page" href="#" onclick="SubmitTickets()">Next</a>
                </button>
            </div>

            

        </main>
    </div>`

    document.getElementById('page2').innerHTML = html;
}

function SubmitTickets(){
    let html = `
    <div class="container">
  <main>
    <div class="py-5 text-center">
      <img class="d-block mx-auto mb-4" src="./resources/styles/big-als-farmers-market-high-resolution-logo-transparent.png" alt="" width="150" height="150">
      <h2>Checkout</h2>
    </div>

    <div class="row g-5">
      <div class="col-md-5 col-lg-4 order-md-last">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-primary">Your cart</span>
          <span class="badge bg-primary rounded-pill">${adultTickets + childTickets + seniorTickets + studentTickets}</span>
        </h4>

        <ul class="list-group mb-3">
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Adult (${adultTickets})</h6>
            </div>
            <div>
            <h6 class="my-0">$${adultTickets * 5}</h6>
          </div>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Child (${childTickets})</h6>
            </div>
            <div>
            <h6 class="my-0">$${childTickets * 2}</h6>
          </div>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Student (${studentTickets})</h6>
            </div>
            <div>
            <h6 class="my-0">$${studentTickets * 3}</h6>
          </div>
          </li>
          <li class="list-group-item d-flex justify-content-between bg-body-tertiary">
            <div>
              <h6 class="my-0">Senior (${seniorTickets})</h6>
            </div>
            <div>
            <h6 class="my-0">$${seniorTickets * 3}</h6>
          </div>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>Total</span>
            <strong>$${(adultTickets * 5) + (childTickets*2) + (studentTickets*3) + (seniorTickets*3)}</strong>
          </li>
        </ul>

      </div>
      <div class="col-md-7 col-lg-8">
        <h4 class="mb-3">Customer Info</h4>
        <form class="needs-validation" novalidate onsubmit="event.preventDefault(); CompletePurchase();">
          <div class="row g-3">
            <div class="col-sm-6">
              <label for="firstName" class="form-label">First name</label>
              <input type="text" class="form-control" id="firstName" placeholder="" value="" autocomplete="off" required>
              <div class="invalid-feedback">
                Valid first name is required.
              </div>
            </div>

            <div class="col-sm-6">
              <label for="lastName" class="form-label">Last name</label>
              <input type="text" class="form-control" id="lastName" placeholder="" value="" autocomplete="off" required>
              <div class="invalid-feedback">
                Valid last name is required.
              </div>
            </div>

            <div class="col-12">
              <label for="email" class="form-label">Email <span class="text-body-secondary">(Optional)</span></label>
              <input type="email" class="form-control" id="email" placeholder="you@example.com" autocomplete="off">
              <div class="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>

            <div class="col-12">
                <label for="password" class="form-label">Password</label>
                <input type="text" class="form-control" id="password" placeholder="" autocomplete="off">
            </div>

          </div>

          <hr class="my-4">

          <div class="row gy-3">
            <div class="col-md-5">
              <label for="cc-name" class="form-label">Name on card</label>
              <input type="text" class="form-control" id="cc-name" placeholder="" autocomplete="off" required>
              <small class="text-body-secondary">Full name as displayed on card</small>
              <div class="invalid-feedback">
                Name on card is required
              </div>
            </div>

            <div class="col-md-5">
              <label for="cc-number" class="form-label">Credit card number</label>
              <input type="text" class="form-control" id="cc-number" placeholder="" autocomplete="off" required>
              <div class="invalid-feedback">
                Credit card number is required
              </div>
            </div>

            <div id="creditCardLogo" class="col-md-2">
              <label for="cc-number" class="form-label"></label>
              <img class="limit-size" src="" alt="">
            </div>

            <!-- <div class="col-md-3">
              <label for="cc-expiration" class="form-label">Expiration</label>
              <input type="text" class="form-control" id="cc-expiration" placeholder="" required>
              <div class="invalid-feedback">
                Expiration date required
              </div>
            </div> -->

            <!-- <div class="col-md-3">
              <label for="cc-cvv" class="form-label">CVV</label>
              <input type="text" class="form-control" id="cc-cvv" placeholder="" required>
              <div class="invalid-feedback">
                Security code required
              </div>
            </div> -->
      
          </div>

          <hr class="my-4">

          <button class="w-100 btn btn-primary btn-lg" type="submit">Submit Order</button>
        </form>
      </div>
    </div>

    <button class="btn btn-lg btn-secondary my-5 ms-5"><a class="dropdown-item" href="./purchasetickets2.html">&#8592;</a></button>
  </main>

  <footer class="my-5 pt-5 text-body-secondary text-center text-small">
    <p class="mb-1">&copy; Big Al's Farmer's Market Inc.</p>
    <ul class="list-inline">
      <li class="list-inline-item"><a href="#">Privacy</a></li>
      <li class="list-inline-item"><a href="#">Terms</a></li>
      <li class="list-inline-item"><a href="#">Support</a></li>
    </ul>
  </footer>
</div>`
    
    document.getElementById('page2').innerHTML = html
    console.log('adult tickets = ' + adultTickets)
    console.log('child tickets = ' + childTickets)
    console.log('senior tickets = ' + seniorTickets)
    console.log('student tickets = ' + studentTickets)


    const ccNumberInput = document.getElementById('cc-number');
    ccNumberInput.addEventListener('input', function () {
      const ccNumberValue = ccNumberInput.value.replace(/\D/g, '');
        if (ccNumberValue.length == 16 || ccNumberValue.length == 15) {
            console.log('Input event triggered!');
            if (ValidateMastercard()) {
              console.log("woo hoo, you entered a Mastercard");
              
              let html = `<div id="creditCardLogo" class="col-md-2">
              <label for="cc-number" class="form-label"></label>
              <img class="limit-size" src="./resources/styles/Mastercard-logo.png" alt="Mastercard">
            </div>`
              document.getElementById("creditCardLogo").innerHTML = html;
            } else if (ValidateVisa()){
              console.log("wee, you entered a VISA")

              let html = `<div id="creditCardLogo" class="col-md-2">
              <label for="cc-number" class="form-label"></label>
              <img class="limit-size" src="./resources/styles/visa-logo-800x450.webp" alt="VISA">
              </div>`
              document.getElementById("creditCardLogo").innerHTML = html;
            } else if(ValidateAmericanExpress()){
              console.log("woop, you entered an American Express card")

              let html = `<div id="creditCardLogo" class="col-md-2">
              <label for="cc-number" class="form-label"></label>
              <img class="limit-size" src="./resources/styles/4-you-might-not-notice-amex-new-brand.jpg.png" alt="American Express">
              </div>`
              document.getElementById("creditCardLogo").innerHTML = html;
            }
        }
    });
}

function AddTicket(type, pickedDate){
    if(type == "adult"){
        adultTickets++
        CreateCheckoutTable(pickedDate)
    } else if(type == "child"){
        childTickets++
        CreateCheckoutTable(pickedDate)
    } else if (type == "senior"){
        seniorTickets++
        CreateCheckoutTable(pickedDate)
    } else if (type == "student"){
        studentTickets++
        CreateCheckoutTable(pickedDate)
    }
}

function RemoveTicket(type, pickedDate){
    if(type == "adult"){
        adultTickets--
        CreateCheckoutTable(pickedDate)
    } else if(type == "child"){
        childTickets--
        CreateCheckoutTable(pickedDate)
    } else if (type == "senior"){
        seniorTickets--
        CreateCheckoutTable(pickedDate)
    } else if (type == "student"){
        studentTickets--
        CreateCheckoutTable(pickedDate)
    }
}

async function CompletePurchase(){
    console.log('inside complete purchase')
    localStorage.setItem('enteredName', document.getElementById('firstName').value)
    let formResult = {firstName: document.getElementById('firstName').value, lastName: document.getElementById('lastName').value, email: document.getElementById('email').value, password: document.getElementById('password').value, creditCard: document.getElementById('cc-number').value};
    console.log(formResult)
    
    let attendeeUrl ='https://big-als-farmers-market-6868e4ee73b9.herokuapp.com/api/attendance'
    let transactionUrl = 'https://big-als-farmers-market-6868e4ee73b9.herokuapp.com/api/transaction'

    let foundID;

    if (!ValidateGeneral()) {
      alert("Invalid credit card number. Please enter a valid 16-digit credit card number.");
      return; 
    }

    // get all the attendees and find the id of the one who's email you are posting - used in next 2 fetch calls
    let accounts = await GetAllAttendees();

    let accountExists = false;
    // to see if the account already exists
    accounts.forEach(function(acc){
      if(acc.email == formResult.email && acc.password == formResult.password){
        accountExists = true;
      }
    })

    if(!accountExists){
      await fetch(attendeeUrl, {
          method: "POST",
          body: JSON.stringify(formResult),
          headers: {
              "Content-type": "application/json; charset=UTF-8"
          }
      })
    }

    // for the form below
    accounts.forEach(function(a){
        if(a.email == document.getElementById('email').value){
          foundID = a.attendeeID
        }
    })


    let transactionObject = {totalCost: (adultTickets * 5) + (childTickets*2) + (studentTickets*3) + (seniorTickets*3), numAdultTickets: adultTickets, numChildTickets: childTickets, numSeniorTickets: seniorTickets, numStudentTickets: studentTickets, eventID: localStorage.getItem('eventID'), attendeeID: foundID}

    await fetch(transactionUrl, {
      method: "POST",
      body: JSON.stringify(transactionObject),
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
    })
    
    ConfirmationPage()
}

function ValidateGeneral() { 
  let value = document.getElementById("cc-number").value; // Update this line to get the credit card input by its ID
  const regEx = /^[0-9]{15,16}$/; // Assuming a valid credit card number is a 16-digit number
  return regEx.test(value); 
}

function ValidateMastercard() { 
  let value = document.getElementById("cc-number").value; // Update this line to get the credit card input by its ID
  const regEx = /^5[1-5][0-9]{14}|^(222[1-9]|22[3-9]\\d|2[3-6]\\d{2}|27[0-1]\\d|2720)[0-9]{12}$/; // Assuming a valid credit card number is a 16-digit number
  return regEx.test(value); 
}

function ValidateVisa() { 
  let value = document.getElementById("cc-number").value; // Update this line to get the credit card input by its ID
  const regEx = /^4[0-9]{12}(?:[0-9]{3})?$/; // Assuming a valid credit card number is a 16-digit number
  return regEx.test(value); 
}

function ValidateAmericanExpress() { 
  let value = document.getElementById("cc-number").value; // Update this line to get the credit card input by its ID
  const regEx = /^3[47][0-9]{13}$/; // Assuming a valid credit card number is a 16-digit number
  return regEx.test(value); 
}


// THERE IS AN ISSUE DISPLAYING THE NAME OF WHO PURCHASED THE TICKETS
// before I had it doing document.getelementbyid and pulling from the form
// I made some changes elsewhere in the code and that no longer worked (i think becuase i prevent the default event on the form now)
// My solution was to try to save name in local storage and pull it...
// that did not work

// it seems to be working now...

function ConfirmationPage(){
    let html = `
    <div class="container my-5">
        <div class="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border border-3 shadow-lg">
            <div class="col-lg-7 p-3 p-lg-5 pt-lg-3">
                <h1 class="display-4 fw-bold lh-1">Thank you ${localStorage.getItem('enteredName')}!</h1>
                <p class="lead">Thank you sincerely for your ticket purchase to attend Big Al's Farmer's Market! We're thrilled to have you join us on ${localStorage.getItem('pickedDate')}. Your support contributes to the success of our event, ensuring a vibrant market experience filled with local delights. We look forward to welcoming you and creating lasting memories together. Should you have any questions, feel free to reach out. See you at the market!</p>
                <div class="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                    <button type="button" class="btn btn-outline-secondary btn-lg px-4"><a href="./index.html">Back to Home</a></button>
                </div>
            </div>
            <div class="col-lg-4 p-0 shadow-lg">
                <div class="border border-2 p-3">
                    <h2 class="display-6">Order Summary</h2>
                    <p class="lead">Date: ${localStorage.getItem('pickedDate')} <br>Location: ${localStorage.getItem('pickedLocation')}</p>
                    <ul class="lead">
                        <li>Adult Tickets: ${adultTickets}</li>
                        <li>Child Tickets: ${childTickets}</li>
                        <li>Student Tickets: ${studentTickets}</li>
                        <li>Senior Tickets: ${seniorTickets}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>`

    document.getElementById('page2').innerHTML = html
}