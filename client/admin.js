let adultTickets = 0
let childTickets = 0
let seniorTickets = 0
let studentTickets = 0

const url = 'http://localhost:5124/api/'

async function GetAllEvents(){
    let response = await fetch('http://localhost:5124/api/event');
    events = await response.json();
    return events;
}
async function GetAllBusinesses(){
    let response = await fetch('http://localhost:5124/api/business');
    businesses = await response.json();
    return businesses;
}

async function GetAllAttends(){
    let response = await fetch('http://localhost:5124/api/attends');
    attends = await response.json();
    return attends;
}

async function GetAllAttendees(){
  let response = await fetch('http://localhost:5124/api/attendance');
  attends = await response.json();
  return attends;
}

async function GetAllTransactions(){
    let response = await fetch('http://localhost:5124/api/transaction');
    transactions = await response.json();
    return transactions;
  }

async function handleOnLoad(type){
    if(type == "a"){
        await createAttendeeDropdown()
    } else if (type == "b"){
        await createDropdown()
    }
}

async function createDropdown(){
    let events = await GetAllEvents();

    let html =`
    <div>
    <div class="dropdown text-center mt-5">
    <button class="btn btn-dark btn-lg dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Select a Date
    </button>
    <ul class="dropdown-menu" id="dropdown-container" style="max-height: 300px; overflow-y: auto;">`

    events.forEach(function(e){
        html+= `<div class="container"><li><button class="btn btn-light" onclick="GetBusinessPerDate('${e.eventID}', '${e.date}', '${e.location}')">${e.date}</button</li></div>`
    })

    html+= `</ul>
    </div>
    </div>`

    document.getElementById('date-select').innerHTML = html;
}

async function createAttendeeDropdown(){
    let events = await GetAllEvents();

    let html =`
    <div>
    <div class="dropdown text-center mt-5">
    <button class="btn btn-dark btn-lg dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Select a Date
    </button>
    <ul class="dropdown-menu" id="dropdown-container" style="max-height: 300px; overflow-y: auto;">`

    events.forEach(function(e){
        html+= `<div class="container"><li><button class="btn btn-light" onclick="GetAttendeesPerDate('${e.eventID}', '${e.date}', '${e.location}')">${e.date}</button</li></div>`
    })

    html+= `</ul>
    </div>
    </div>`

    document.getElementById('date-select').innerHTML = html;
}

async function GetBusinessPerDate(id, date, location){
    var count = 0
    localStorage.setItem('pickedDate', date)
    localStorage.setItem('pickedLocation', location)
    localStorage.setItem('eventID', id)
    console.log(id)
    console.log(date)
    let businesses = await GetAllBusinesses();
    let attendsplural = await GetAllAttends();

    let html =`
    <div class="container my-5 text-center">
        <h1 class="display-4 fw-normal text-body-emphasis">Businesses Attending ${date}</h1>
    <div class="p-5 text-center rounded-3" style="background-color: hsl(0, 0%, 100%);">
    <table class="table table-hover center" id="myTable">
        <thead id="table-header">
            <tr>
                <th scope="col">Event ID</th>
                <th scope="col">Booth Location</th>
                <th scope="col">Company Name</th>
                <th scope="col">Product Type</th>
                <th scope="col">Logo</th>
            </tr>
        </thead>
        <tbody id="myTableBody" class="table-group-divider">`;

    attendsplural.forEach(function(a){
        if (a.eventID == id){
            count++
            html+=`
            <tr>
                <td>${a.eventID}</td>
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
    </div>`
    document.getElementById('businesses-at-market-table').innerHTML = html;

    const pickedDate = localStorage.getItem('pickedDate');
    console.log('the date selected = ' + pickedDate);

    html = `
    <div class="d-flex justify-content-center align-items-center mx-1">
        <div class="card text-center" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Total Number of Businesses Registered</h5>
                <p class="card-text">${count}</p>
            </div>
        </div>
    </div>`

    document.getElementById('business-summary').innerHTML = html;
}







async function GetAttendeesPerDate(id, date, location){
    count = 0
    var totalPeople = 0
    var totalRevenue = 0
    localStorage.setItem('pickedDate', date)
    localStorage.setItem('pickedLocation', location)
    localStorage.setItem('eventID', id)
    console.log(id)
    console.log(date)
    let attendees = await GetAllAttendees();
    let transactions = await GetAllTransactions();

    let html =`
    <div class="container my-5 text-center">
        <h1 class="display-4 fw-normal text-body-emphasis">People Attending ${date}</h1>
    <div class="p-5 text-center rounded-3" style="background-color: hsl(0, 0%, 100%);">
    <table class="table table-hover center" id="myTable">
        <thead id="table-header">
            <tr>
                <th scope="col">Event ID</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Adult Tickets</th>
                <th scope="col">Child Tickets</th>
                <th scope="col">Student Tickets</th>
                <th scope="col">Senior Tickets</th>
            </tr>
        </thead>
        <tbody id="myTableBody" class="table-group-divider">`;

    transactions.forEach(function(a){
        if (a.eventID == id){
            // math for reports
            totalPeople += a.numAdultTickets + a.numChildTickets + a.numSeniorTickets + a.numStudentTickets
            totalRevenue += (a.numAdultTickets*5) + (a.numChildTickets*2) + (a.numSeniorTickets*3) + (a.numStudentTickets*3)

            count++
            html+=`
            <tr>
                <td>${a.eventID}</td>
                <td>${attendees[a.attendeeID-1].firstName}</td>
                <td>${attendees[a.attendeeID-1].lastName}</td>
                <td>${attendees[a.attendeeID-1].email}</td>
                <td>${a.numAdultTickets}</td>
                <td>${a.numChildTickets}</td>
                <td>${a.numStudentTickets}</td>
                <td>${a.numSeniorTickets}</td>
            </tr>`;
        }
    })
    html+=`</tbody>
    </table>
    </div>
    </div>`
    document.getElementById('attendees-at-market-table').innerHTML = html;

    const pickedDate = localStorage.getItem('pickedDate');
    console.log('the date selected = ' + pickedDate);

    html = `
    <div class="d-flex justify-content-center align-items-center mx-1">
        <div class="card text-center" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Purchasing Accounts</h5>
                <p class="card-text">${count}</p>
            </div>
        </div>

        <div style="width: 20px;"></div>

        <div class="card text-center" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">People Attending</h5>
                <p class="card-text">${totalPeople}</p>
            </div>
        </div>

        <div style="width: 20px;"></div>

        <div class="card text-center" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Average # of Tickets</h5>
                <p class="card-text">${totalPeople / count}</p>
            </div>
        </div>

        <div style="width: 20px;"></div>

        <div class="card text-center" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Total Revenue</h5>
                <p class="card-text">$${totalRevenue}</p>
            </div>
        </div>

        <div style="width: 20px;"></div>

        <div class="card text-center" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Average Transaction Cost</h5>
                <p class="card-text">$${totalRevenue / count}</p>
            </div>
        </div>

    </div>`

    document.getElementById('attendee-summary').innerHTML = html;
}

// const url = 'http://localhost:5124/api/'

// async function GetAllEvents(){
//     let response = await fetch('http://localhost:5124/api/event');
//     events = await response.json();
//     return events;
// }
// async function GetAllBusinesses(){
//     let response = await fetch('http://localhost:5124/api/business');
//     businesses = await response.json();
//     return businesses;
// }

// async function GetAllAttends(){
//     let response = await fetch('http://localhost:5124/api/attends');
//     attends = await response.json();
//     return attends;
// }

// async function GetAllAttendees(){
//   let response = await fetch('http://localhost:5124/api/attendance');
//   attends = await response.json();
//   return attends;
// }

// async function handleOnLoad(){
//     await createDropdown()
//     // await createTypeDropdown()
// }

// async function createDropdown(){
//     let events = await GetAllEvents();

//     let html =`
//     <div>
//     <div class="dropdown text-center">
//     <button class="btn btn-dark btn-lg dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
//     Select a Date
//     </button>
//     <ul class="dropdown-menu" id="dropdown-container" style="max-height: 300px; overflow-y: auto;">`

//     events.forEach(function(e){
//         html+= `<div class="container"><li><button class="btn btn-light" onclick="populateBusinessesTable('${e.eventID}', '${e.date}', '${e.location}')">${e.date}</button</li></div>`
//     })

//     html+= `</ul>
//     </div>
//     </div>`

//     document.getElementById('date-select').innerHTML = html;
// }

// async function createTypeDropdown(){

//     let html =`
//     <div>
//     <div class="dropdown text-center">
//     <button class="btn btn-dark btn-lg dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
//     Type
//     </button>
//     <ul class="dropdown-menu" id="dropdown-container" style="max-height: 300px; overflow-y: auto;">`

//     html+= `<div class="container"><li><button class="btn btn-light" onclick="populateAttendeeTable()">Attendees</button</li></div>
//     <div class="container"><li><button class="btn btn-light" onclick="populateBusinessesTable()">Businesses</button</li></div>`

//     html+= `</ul>
//     </div>
//     </div>`

//     document.getElementById('type-select').innerHTML = html;
// }

// function PassEventData(id, date, location){
//     localStorage.setItem('pickedDate', date)
//     localStorage.setItem('pickedLocation', location)
//     localStorage.setItem('eventID', id)
//     console.log(id)
//     console.log(date)
// }

// async function populateBusinessesTable(){
//     console.log('success for b ')

//     pickedDate = localStorage.getItem('pickedDate');
//     const id = localStorage.getItem('eventID');

//     let businesses = await GetAllBusinesses();
//     let attendsplural = await GetAllAttends();

//     let html =`
//     <div class="container my-5 text-center">
//         <h1 class="display-4 fw-normal text-body-emphasis">Businesses Attending ${date}</h1>
//     <div class="p-5 text-center rounded-3" style="background-color: hsl(0, 0%, 100%);">
//     <table class="table table-hover center" id="myTable">
//         <thead id="table-header">
//             <tr>
//                 <th scope="col">Event ID</th>
//                 <th scope="col">Booth Location</th>
//                 <th scope="col">Company Name</th>
//                 <th scope="col">Product Type</th>
//                 <th scope="col">Logo</th>
//             </tr>
//         </thead>
//         <tbody id="myTableBody" class="table-group-divider">`;

//     attendsplural.forEach(function(a){
//         if (a.eventID == id){
//             html+=`
//             <tr>
//                 <td>${a.eventID}</td>
//                 <td>${a.boothLocation}</td>
//                 <td>${businesses[a.businessID-1].companyName}</td>
//                 <td>${businesses[a.businessID-1].productType}</td>
//                 <td><img src="${businesses[a.businessID-1].logo}" alt="logo failed" style="max-width: 100px; max-height: 100px;"></td>
//             </tr>`;

//         }
//     })
//     html+=`</tbody>
//     </table>
//     </div>
//     </div>
//     <div class="center-container">
//     <button class="btn btn-lg btn-primary my-5 ms-5">
//         <a class="nav-link active" aria-current="page" href="purchasetickets2.html">Next</a>
//     </button>
//     </div>`
//     document.getElementById('businesses-at-market-table').innerHTML = html;

//     const pickedDate = localStorage.getItem('pickedDate');
//     console.log('the date selected = ' + pickedDate);
// }

// function populateAttendeesTable(){
//     console.log('success for a')
// }

