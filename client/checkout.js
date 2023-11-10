

async function GetAllEvents(){
    let response = await fetch('http://localhost:5124/api/event');
    events = await response.json();
    console.log(events);
    return events;
}
async function GetAllBusinesses(){
    let response = await fetch('http://localhost:5124/api/business');
    businesses = await response.json();
    console.log(businesses);
    return businesses;
}

async function GetAllAttends(){
    let response = await fetch('http://localhost:5124/api/attends');
    attends = await response.json();
    console.log(attends);
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
            console.log(a)
            console.log('found a business that attends the event you chose')
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
    <button class="btn btn-primary my-5 ms-5" onclick="ChooseEvent(a.eventID)">
        <a class="dropdown-item" href="purchasetickets2.html">Submit</a>
    </button>
    </div>`
    document.getElementById('businesses-at-market-table').innerHTML = html;
}

function createTable(foundId){

}

function ChooseEvent(id){
    window.location.href = 'newPage.html';
    console.log(id)    
}







