document.getElementById('registerForm').addEventListener('submit', function(event){
    event.preventDefault();
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if(!validateName(name)) {
        showAlert('alert-fail','Please enter a valid name');
        return;
    }

    if(!validateEmail(email)) {
        showAlert('alert-fail','Please enter a valid email address');
        return;
    }

    if(!validatePassword(password)) {
        showAlert('alert-fail','Please enter a valid password');
        return;
    }

    let userData = name + ',' + email + ',' + password;
    localStorage.setItem(email, userData);
    showAlert('alert-success','Registration successful');

    // Pakel regisration ev bacel login
    document.getElementById('registerForm').classList.add('hide');
    document.getElementById('loginForm').classList.remove('hide');
});

document.getElementById('loginForm').addEventListener('submit', function(event){
    event.preventDefault();
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;

    let storedData = localStorage.getItem(email);
    if(storedData) {
        let storedPassword = storedData.split(',')[2];

        if(password === storedPassword) {
            alert('Login successful');
        } else {
            alert('Incorrect password');
        }
    } else {
        alert('User not found');
    }
});

function validateName(name){
    return /^[a-zA-Z\s]{4,20}$/.test(name);
}

function validateEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password){
    return /^(?=.*[A-Z])(?=.*[!@#$%^&*()])(?=.*[a-zA-Z]{4,}).{8,12}$/.test(password);
}

function showAlert(className, message){
    let existingAlerts = document.querySelectorAll('.alert');

    existingAlerts.forEach(function(alert){
        alert.remove();
    });

    let alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', className);
    alertDiv.textContent = message;

    let container = document.querySelector('.container');
    container.insertBefore(alertDiv, container.firstChild);

    setTimeout(function() {
        alertDiv.remove();
    }, 2000);
}