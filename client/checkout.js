

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
async function handleOnLoad(){
    await createDropdown()
    console.log('hello')
}

async function createDropdown(){
    let events = await GetAllEvents();

    let html =`
    <div>
    <div class="dropdown text-center">
    <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Select a Date
    </button>
    <ul class="dropdown-menu" id="dropdown-container" style="max-height: 300px; overflow-y: auto;">`

    events.forEach(function(e){
        html+= `<div class="container"><li><button class="btn btn-light" onclick="GetBusinessPerDate('${e.eventid}')">${e.date}</button</li></div>`
    })

    html+= `</ul>
    </div>
    </div>`

    document.getElementById('date-select').innerHTML = html;
}

function GetBusinessPerDate(id){
    console.log('success')
    let businesses = GetAllBusinesses();

    businesses.forEach(function(b){
        if (b.BusinessID == id){
            console.log(b)
            console.log('found a business')
        }
    })
    
    
}







