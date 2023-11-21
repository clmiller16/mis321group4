//Business Login
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
            sessionStorage.setItem("business-email", email);
            sessionStorage.setItem("business-password", password);
            sessionStorage.setItem("business-id", data.businessid) //returns business id so that you can use this to reference business data on other pages
            window.location.href = 'businesshome.html';
        } else 
        {
            
                var errorMessageHolder = document.getElementById('errorMessage');
                errorMessageHolder.textContent = "Invalid Email or Password.";
                errorMessageHolder.style.display = 'block'; // Show the error message element
            
        }
    })
})