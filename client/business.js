
function handleOnLoad(){
    CreateTable();
}


async function GetAllEvents(){
    let response = await fetch('http://localhost:5124/api/event');
    events = await response.json();
    // console.log(events);
    return events;
}

async function CreateTable(){
    let events = await GetAllEvents()
    let html =`
    <div class="container my-5 text-center">
        <h1 class="display-5 fw-bold">Upcoming Events</h1>
    <div class="p-5 text-center rounded-3" style="background-color: hsl(0, 0%, 100%);">
    <table class="table table-hover center" id="myTable">
        <thead id="table-header">
            <tr>
                <th scope="col">Event ID</th>
                <th scope="col">Date</th>
                <th scope="col">Location</th>
                <th scope="col">Select</th>
            </tr>
        </thead>
        <tbody id="myTableBody" class="table-group-divider">`;

    events.forEach(function(e){
            html+=`
            <tr>
                <td>${e.eventID}</td>
                <td>${e.date}</td>
                <td>${e.location}</td>
                <td><button class="btn btn-primary" onclick=SelectEvent('${e.eventID}')>Select</button></td>
            </tr>`;
    })
    html+=`</tbody>
    </table>
    </div>
    </div>`
    document.getElementById('events-table').innerHTML = html;
}

// currently this code shows a drop-down of dates, it should be updated to show booths that are available to choose

async function SelectEvent(id){
    let events = await GetAllEvents();
    console.log('success!')
    console.log(id)
    let html = `
    <div class="container">
    <img src="./resources/styles/Map_2017_2-e1588350571960.jpg" alt="failed to load">
    <div>
    <div class="dropdown text-center">

    <button class="btn btn-dark btn-lg dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Select a Booth Location
    </button>
    <ul class="dropdown-menu" id="dropdown-container" style="max-height: 300px; overflow-y: auto;">`

    events.forEach(function(e){
        html+= `<div class="container"><li><button class="btn btn-light" onclick="GetBusinessPerDate('${e.eventID}', '${e.date}')">${e.date}</button</li></div>`
    })

    html+= `</ul>
    </div>
    </div>
    </div>`

    document.getElementById('choose-booth').innerHTML = html;
}
