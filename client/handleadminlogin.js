
//Admin Login
document.addEventListener('DOMContentLoaded', (event) => {
    isLoggedIn = sessionStorage.getItem('isLoggedInAdmin')
    if (isLoggedIn) {
      window.location.href = 'adminhome.html'; // Redirect to home page
    }
  })

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    var email = document.getElementById('adminFloatingEmail').value
    var password = document.getElementById('adminFloatingPassword').value


    await fetch('http://localhost:5124/api/admin/Login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            sessionStorage.setItem("isLoggedInAdmin", "true")
            window.location.href = 'adminhome.html';
        } else 
        {
            
                var errorMessageHolder = document.getElementById('errorMessage');
                errorMessageHolder.textContent = "Invalid Email or Password.";
                errorMessageHolder.style.display = 'block'; // Show the error message element
            
        }
    })
})


