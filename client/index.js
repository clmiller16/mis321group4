const url = 'http://localhost:5124/api/attendance';

// this url needs to change to be /attendee instead of mis321 group 4... the controller also needs to change to match it
// prolly need to have seperate controllers for each entity... maybe

function handleRestart(){
    sessionStorage.clear()
}

async function GetAllAttendees(){
    let response = await fetch(url);
    myAttendees = await response.json();
    console.log(myAttendees);
}

async function GetAllEvents(){
    let response = await fetch('http://localhost:5124/api/event');
    myEvents = await response.json();
    console.log('getting events')
    console.log(myEvents);
}

async function GetAllTransactions(){
    let response = await fetch('http://localhost:5124/api/transaction');
    transactions = await response.json();
    console.log(transactions);
}

async function handleOnLoad(){
    if(sessionStorage.getItem('account') != null){
        createTable()
    } else SignIn();
}

async function findAccountName(){
    await GetAllAttendees()
    myAttendees.forEach(function(a){
        if (sessionStorage.getItem('account') == a.email){
            sessionStorage.setItem('name', a.firstName)
            sessionStorage.setItem('lastName', a.lastName)
            sessionStorage.setItem('foundID', a.attendeeID)
        }
    })

    console.log(sessionStorage.getItem('name'))
    console.log('the found id is ' + sessionStorage.getItem('foundID'))
}

async function createTable(){
    console.log(sessionStorage.getItem('account'))
    await GetAllTransactions();

    findAccountName();
    
    let html =`
    <div class="container my-5 text-center">
        <h1 class="display-5 fw-bold">Your Tickets</h1>
    <div class="p-5 text-center rounded-3" style="background-color: hsl(0, 0%, 100%);">
    <table class="table table-hover center" id="myTable">
        <thead id="table-header">
            <tr>
                <th scope="col">Transaction ID</th>
                <th scope="col">Name</th>
                <th scope="col">Event Date</th>
                <th scope="col">Adult</th>
                <th scope="col">Child</th>
                <th scope="col">Student</th>
                <th scope="col">Senior</th>
            </tr>
        </thead>
        <tbody id="myTableBody" class="table-group-divider">`;
    
    await GetAllEvents();
    transactions.forEach(function(t){
            if (t.attendeeID == sessionStorage.getItem('foundID')){
                
                let foundDate;
                myEvents.forEach(function(e){
                    if (t.eventID == e.eventID){
                        foundDate = e.date
                    }
                })

                html+=`
                <tr>
                    <td>${t.transactionID}</td>
                    <td>${sessionStorage.getItem('name')} ${sessionStorage.getItem('lastName')}</td>
                    <td>${foundDate}</td>
                    <td>${t.numAdultTickets}</td>
                    <td>${t.numChildTickets}</td>
                    <td>${t.numStudentTickets}</td>
                    <td>${t.numSeniorTickets}</td>
                </tr>`;
            }
    })

    html+=`</tbody>
    </table>
    </div>
    </div>`
    document.getElementById('app').innerHTML = html;
}

function SignIn(){
    let html = `
    <div class="container col-5">
    <main class="form-signin w-100 m-auto">
        <form onsubmit="event.preventDefault(); ValidateAccount();">
            <h1 class="h3 mb-3 fw-normal text-center">Please sign in</h1>
            <div class="form-floating">
            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" autocomplete="off">
            <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
            <label for="floatingPassword">Password</label>
            </div>
            <div class="form-check text-start my-3">
            
            </div>
            <button class="btn btn-primary w-100 py-2" type="submit"><a class="dropdown-item">Sign in</a></button>
        </form>
        <div class="dropdown-divider"></div>
        
    </main>
    </div>
    <button class="btn btn-secondary my-5 ms-5"><a class="dropdown-item" href="index.html">&#8592;</a></button>
    `

    document.getElementById('attendee-signin').innerHTML = html
}


async function GetAccounts(){
    let response = await fetch('http://localhost:5124/api/attendance');
    accounts = await response.json();
    return accounts;
}

async function ValidateAccount(){
    let accounts = await GetAccounts();

    let email = document.getElementById('floatingInput').value
    let password = document.getElementById('floatingPassword').value

    let foundAccount = false

    accounts.forEach(function(a){
        if(email == a.email && password == a.password && email != '' && password != ''){
            foundAccount = true
        }
    })

    if(foundAccount){
        console.log('you entered correct info')
        sessionStorage.setItem('account', email)

        let html = ``
        document.getElementById('attendee-signin').innerHTML = html
        createTable();
    } else console.log('INVALID LOGIN')
}
