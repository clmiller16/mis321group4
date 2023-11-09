const url = 'http://localhost:5124/api/attendance';

// this url needs to change to be /attendee instead of mis321 group 4... the controller also needs to change to match it
// prolly need to have seperate controllers for each entity... maybe

async function GetAllAttendees(){
    let response = await fetch(url);
    myAttendees = await response.json();
    console.log(myAttendees);
}

async function handleOnLoad(){
    createTable()
}

async function createTable(){
    await GetAllAttendees();
    

    let html =`
    <div class="container my-5 text-center">
        <h1 class="display-5 fw-bold">Attendees</h1>
    <div class="p-5 text-center rounded-3" style="background-color: hsl(0, 0%, 100%);">
    <table class="table table-hover center" id="myTable">
        <thead id="table-header">
            <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
            </tr>
        </thead>
        <tbody id="myTableBody" class="table-group-divider">`;
    
    myAttendees.forEach(function(attendee){
            html+=`
            <tr>
                <td>${attendee.firstName}</td>
                <td>${attendee.lastName}</td>
                <td>${attendee.email}</td>
            </tr>`;
    })

    html+=`</tbody>
    </table>
    </div>
    </div>`
    document.getElementById('app').innerHTML = html;
}
