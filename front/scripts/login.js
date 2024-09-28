import {auth} from './auth.js';

// Si está autenticado y es administrador, redirigir a la lista de tareas general
if (auth.isAuthenticated() && auth.getRole()) {
    window.location.href = 'generalTasks/index.html';
} else if (auth.isAuthenticated()) {
    window.location.href = 'myTasks/index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const submitButton = document.getElementById('submit-button');
    submitButton.addEventListener('click', handleLogin);
})

async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await auth.login(username, email, password);
        handleSuccessfulLogin();
    } catch (error) {
        handleLoginError(error);
    }
}

function handleSuccessfulLogin() {
    window.alert('Login exitoso');
    document.dispatchEvent(new Event('authChanged'));
    if (auth.getRole()) {
        window.location.href = 'generalTasks/index.html';
    } else {
        window.location.href = 'myTasks/index.html';
    }
}

function handleLoginError(error) {
    window.alert('Login fallido');
    console.error('Login error:', error);
}