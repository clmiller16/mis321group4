function handleOnLoad(){
    let html = `
    
    <div class="container col-5">
    <main class="form-signin w-100 m-auto">
        <form onsubmit="event.preventDefault(); ValidateAdmin();">
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
    document.getElementById('sign-in').innerHTML = html
}

async function GetAdminAccounts(){
    let response = await fetch('http://localhost:5124/api/admin');
    accounts = await response.json();
    return accounts;
}

async function ValidateAdmin(){
    let accounts = await GetAdminAccounts();

    let email = document.getElementById('floatingInput').value
    let password = document.getElementById('floatingPassword').value

    let foundAccount = false

    accounts.forEach(function(a){
        if(email == a.email && password == a.password){
            foundAccount = true
        }
    })

    if(foundAccount){
        console.log('you entered correct info')
        window.open('adminhome.html')
    } else console.log('INVALID LOGIN')

    




}