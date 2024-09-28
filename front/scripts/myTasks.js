import {auth} from './auth.js';

// Si está autenticado y no es administrador, redirigir a la lista de tareas personales
if (auth.isAuthenticated() && auth.getRole()) {
    window.location.href = 'generalTasks/index.html';
}

// Obtenemos el id del usuario
const id= auth.getId()

// Obtener todas las tareas desde el backend
const API_URL = `http://localhost/back//usuarios/${id}/tareas/`;

const taskList = document.getElementById('card-list');

document.addEventListener('DOMContentLoaded', () => {
    if (!auth.isAuthenticated()) {
        window.location.href = '../index.html';
    } else {
        initializePage();
    }
});

async function initializePage() {
    await getTasksList();
    setupAddTaskButton();
}

async function getTasksList() {
    try {
        const response = await fetch(`${API_URL}`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch tasks list');
        }
        const data = await response.json();
        renderTasksList(data);
    } catch (error) {
        console.error('Error al obtener el listado de tareas:', error);
        alert('Error al cargar la lista de tareas. Por favor, intente de nuevo más tarde.');
    }
}

function renderTasksList(tasks) {
    tasks.forEach(task => {
        const card = createTaskCard(task);
        taskList.appendChild(card);
    });
}

function createTaskCard(task) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="card">
            <h4>Nombre: ${task.nombre}</h4>
            <p>Duracion: ${task.duracion}</p>
            <p>Creador: ${task.creador}</p>
            <p>Usuarios: ${task.usuarios}</p>
        </div>
    `;
    return card;
}

function setupAddTaskButton() {
    const addPersonButton = document.getElementById('addTask');
    if (addPersonButton) {
        addPersonButton.addEventListener('click', () => {
            window.location.href = '../form/index.html';
        });
    }
}

// Logout
const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
    auth.logout();
    window.location.href = '../index.html';
});