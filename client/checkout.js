let adultTickets = 0
let childTickets = 0
let seniorTickets = 0
let studentTickets = 0

async function GetAllEvents(){
    let response = await fetch('http://localhost:5124/api/event');
    events = await response.json();
    // console.log(events);
    return events;
}
async function GetAllBusinesses(){
    let response = await fetch('http://localhost:5124/api/business');
    businesses = await response.json();
    // console.log(businesses);
    return businesses;
}

async function GetAllAttends(){
    let response = await fetch('http://localhost:5124/api/attends');
    attends = await response.json();
    // console.log(attends);
    return attends;
}

async function handleOnLoad(){
    await createDropdown()
}

async function createDropdown(){
    let events = await GetAllEvents();

    let html =`
    <div>
    <div class="dropdown text-center">
    <button class="btn btn-dark btn-lg dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Select a Date
    </button>
    <ul class="dropdown-menu" id="dropdown-container" style="max-height: 300px; overflow-y: auto;">`

    events.forEach(function(e){
        html+= `<div class="container"><li><button class="btn btn-light" onclick="GetBusinessPerDate('${e.eventID}', '${e.date}')">${e.date}</button</li></div>`
    })

    html+= `</ul>
    </div>
    </div>`

    document.getElementById('date-select').innerHTML = html;
}

async function GetBusinessPerDate(id, date){
    localStorage.setItem('pickedDate', date)
    console.log(id)
    console.log(date)
    let businesses = await GetAllBusinesses();
    let attendsplural = await GetAllAttends();

    let html =`
    <div class="container my-5 text-center">
        <h1 class="display-5 fw-bold">Businesses Attending ${date}</h1>
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
            // console.log(a)
            // console.log('found a business that attends the event you chose')
            // createTable(a.attendsID)
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
    </div>
    <div class="center-container">
    <button class="btn btn-primary my-5 ms-5">
        <a class="nav-link active" aria-current="page" href="purchasetickets2.html">SUBMIT</a>
    </button>
    </div>`
    document.getElementById('businesses-at-market-table').innerHTML = html;

    const pickedDate = localStorage.getItem('pickedDate');
    console.log(pickedDate);
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
                <h1 class="display-4 fw-normal text-body-emphasis">${pickedDate}</h1>
                <p class="fs-5 text-body-secondary">Please select how many of each ticket you would like to purchase</p>
            </div>
        </header>
    
        <main>
            <table class="table table-hover center" id="myTable">
                <thead id="table-header">
                    <tr>
                        <th scope="col">Type</th>
                        <th scope="col"></th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody id="myTableBody" class="table-group-divider">
                    <tr>
                        <td>Adult</td>
                        <td><div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" onclick="RemoveTicket('adult', '${pickedDate}')" class="btn btn-dark"><i class="bi bi-dash"></i></button>
                            <button type="button" onclick="AddTicket('adult', '${pickedDate}')" class="btn btn-dark"><i class="bi bi-plus"></i></button>
                          </div></td>
                        <td>${adultTickets}</td>
                    </tr>
                    <tr>
                        <td>Child</td>
                        <td><div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" onclick="RemoveTicket('child', '${pickedDate}')" class="btn btn-dark"><i class="bi bi-dash"></i></button>
                            <button type="button" onclick="AddTicket('child', '${pickedDate}')" class="btn btn-dark"><i class="bi bi-plus"></i></button>
                          </div></td>
                        <td>${childTickets}</td>
                    </tr>
                    <tr>
                        <td>Student</td>
                        <td><div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" onclick="RemoveTicket('student', '${pickedDate}')" class="btn btn-dark"><i class="bi bi-dash"></i></button>
                            <button type="button" onclick="AddTicket('student', '${pickedDate}')" class="btn btn-dark"><i class="bi bi-plus"></i></button>
                          </div></td>
                        <td>${studentTickets}</td>
                    </tr>
                    <tr>
                        <td>Senior</td>
                        <td><div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" onclick="RemoveTicket('senior', '${pickedDate}')" class="btn btn-dark"><i class="bi bi-dash"></i></button>
                            <button type="button" onclick="AddTicket('senior', '${pickedDate}')" class="btn btn-dark"><i class="bi bi-plus"></i></button>
                          </div></td>
                        <td>${seniorTickets}</td>
                    </tr>
                </tbody>
            </table>
            <div class="center-container">
                <button class="btn btn-primary my-5 ms-5">
                    <a class="nav-link active" aria-current="page" href="checkout.html">SUBMIT</a>
                </button>
            </div>
        </main>
    </div>`

    document.getElementById('page2').innerHTML = html;
}

function AddTicket(type, pickedDate){
    console.log('adding')

    if(type == "adult"){
        adultTickets++
        console.log('adult ticket added')
        CreateCheckoutTable(pickedDate)
    } else if(type == "child"){
        childTickets++
        console.log('child ticket added')
        CreateCheckoutTable(pickedDate)
    } else if (type == "senior"){
        seniorTickets++
        console.log('senior ticket added')
        CreateCheckoutTable(pickedDate)
    } else if (type == "student"){
        studentTickets++
        console.log('student ticket added')
        CreateCheckoutTable(pickedDate)
    }
}

function RemoveTicket(type, pickedDate){
    console.log('removing')

    if(type == "adult"){
        adultTickets--
        console.log('adult ticket added')
        CreateCheckoutTable(pickedDate)
    } else if(type == "child"){
        childTickets--
        console.log('child ticket added')
        CreateCheckoutTable(pickedDate)
    } else if (type == "senior"){
        seniorTickets--
        console.log('senior ticket added')
        CreateCheckoutTable(pickedDate)
    } else if (type == "student"){
        studentTickets--
        console.log('student ticket added')
        CreateCheckoutTable(pickedDate)
    }
}