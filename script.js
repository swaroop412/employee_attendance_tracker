// DOM Elements
const newUserBtn = document.getElementById('newUserBtn');
const addUserBtn = document.getElementById('addUserBtn');
const cancelNewUserBtn = document.getElementById('cancelNewUserBtn');
const checkInBtn = document.getElementById('checkInBtn');
const checkOutBtn = document.getElementById('checkOutBtn');
const attendanceTableBody = document.querySelector('#attendanceTable tbody');
const messageDiv = document.getElementById('message');
const newUserForm = document.getElementById('newUserForm');

let users = []; // Array to store users

// Show or hide new user form
newUserBtn.addEventListener('click', () => {
    newUserForm.classList.toggle('hidden');
});

// Add a new user
addUserBtn.addEventListener('click', () => {
    const username = document.getElementById('newUsername').value.trim();
    const id = document.getElementById('newUserId').value.trim();
    const pin = document.getElementById('newUserPin').value.trim();

    if (username && id && pin && pin.length === 4) {
        addUser(username, id, pin);
        showMessage('New user added successfully!', 'success');
        updateAttendanceHistory();
        newUserForm.classList.add('hidden'); // Hide form after adding user
        clearNewUserForm();
    } else {
        showMessage('Invalid input! Please try again.', 'error');
    }
});

// Function to add a new user
function addUser(username, id, pin) {
    const newUser = { username, id, pin, checkInTime: null, checkOutTime: null };
    users.push(newUser);
}

// Update the attendance table
function updateAttendanceHistory() {
    attendanceTableBody.innerHTML = ''; // Clear table before updating
    users.forEach(user => {
        const row = document.createElement('tr');
        
        // Determine attendance status
        const checkInStatus = user.checkInTime ? user.checkInTime : 'Absent';
        const checkOutStatus = user.checkOutTime ? user.checkOutTime : '-';

        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.id}</td>
            <td>${checkInStatus}</td>
            <td>${checkOutStatus}</td>
        `;
        attendanceTableBody.appendChild(row);
    });
}

// Clear the new user form inputs
function clearNewUserForm() {
    document.getElementById('newUsername').value = '';
    document.getElementById('newUserId').value = '';
    document.getElementById('newUserPin').value = '';
}

// Check in a user
checkInBtn.addEventListener('click', () => {
    const userId = document.getElementById('checkId').value.trim();
    const pin = document.getElementById('checkPin').value.trim();

    const user = users.find(u => u.id === userId);

    if (user && user.pin === pin) {
        if (user.checkInTime) {
            showMessage('You have already checked in today.', 'error');
        } else {
            user.checkInTime = new Date().toLocaleTimeString();
            showMessage('Check-in successful!', 'success');
            updateAttendanceHistory();
            clearCheckInputs();
        }
    } else {
        showMessage('Invalid PIN or User not found!', 'error');
    }
});

// Check out a user
checkOutBtn.addEventListener('click', () => {
    const userId = document.getElementById('checkId').value.trim();
    const pin = document.getElementById('checkPin').value.trim();

    const user = users.find(u => u.id === userId);

    if (user && user.pin === pin) {
        if (!user.checkInTime) {
            showMessage('You need to check in before checking out.', 'error');
        } else if (user.checkOutTime) {
            showMessage('You have already checked out today.', 'error');
        } else {
            user.checkOutTime = new Date().toLocaleTimeString();
            showMessage('Check-out successful!', 'success');
            updateAttendanceHistory();
            clearCheckInputs();
        }
    } else {
        showMessage('Invalid PIN or User not found!', 'error');
    }
});

// Clear check-in/check-out form inputs
function clearCheckInputs() {
    document.getElementById('checkId').value = '';
    document.getElementById('checkPin').value = '';
}

// Display message for user feedback
function showMessage(message, type) {
    messageDiv.textContent = message;
    messageDiv.style.color = type === 'error' ? 'red' : 'green';
}

// Hide new user form on cancel button click
cancelNewUserBtn.addEventListener('click', () => {
    newUserForm.classList.add('hidden');
});