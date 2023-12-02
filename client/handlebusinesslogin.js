//Business Login
document.addEventListener('DOMContentLoaded', (event) => {
    isLoggedIn = sessionStorage.getItem('isLoggedInBusiness')
    if (isLoggedIn) {
      window.location.href = 'businesshome.html'; // Redirect to home page
    }
  })

document.getElementById('businessLoginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    var email = document.getElementById('businessFloatingEmail').value
    var password = document.getElementById('businessFloatingPassword').value


    await fetch('http://localhost:5124/api/business/Login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            sessionStorage.setItem("business-id", data.businessid)
            sessionStorage.setItem("isLoggedInBusiness", 'true')
            window.location.href = 'businesshome.html';
        } else 
        {
            
                var errorMessageHolder = document.getElementById('errorMessage');
                errorMessageHolder.textContent = "Invalid Email or Password.";
                errorMessageHolder.style.display = 'block'; // Show the error message element
            
        }
    })
})