// Simulating user authentication state
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Retrieve login status from localStorage
let userSchedule = JSON.parse(localStorage.getItem('userSchedule')) || []; // Retrieve schedule from localStorage
let map; // Declare map variable globally to ensure access

// Function to toggle login/logout
function toggleLogin() {
    isLoggedIn = !isLoggedIn;
    localStorage.setItem('isLoggedIn', isLoggedIn); // Store login status in localStorage
    const loginStatus = document.getElementById("loginStatus");

    if (isLoggedIn) {
        loginStatus.innerHTML = '<a href="#" onclick="toggleLogin()">Logout</a>';
        loadUserSchedule(); // Load schedule if logged in
    } else {
        loginStatus.innerHTML = '<a href="#" onclick="toggleLogin()">Login</a>';
        clearSchedule(); // Clear schedule if logged out
    }

    updateMapWithClasses(); // Update map when login state changes
}

// Function to add class to schedule
function addToSchedule(button) {
    if (!isLoggedIn) {
        alert("Please log in to add classes to your schedule.");
        return;
    }

    const classCard = button.parentElement; // Get the class card (div) element
    const className = classCard.querySelector('h3').textContent;
    const classTime = classCard.querySelector('p:nth-child(2)').textContent;
    const classLocation = classCard.querySelector('p:nth-child(3)').textContent;

    // Add the class to the user's schedule array
    userSchedule.push({ name: className, time: classTime, location: classLocation });

    // Remove the class card from the available classes section
    classCard.remove();

    // Re-render the schedule with the updated classes
    renderSchedule();
    updateMapWithClasses();

    // Save updated schedule in localStorage
    localStorage.setItem('userSchedule', JSON.stringify(userSchedule));
}

// Function to render the user's schedule
function renderSchedule() {
    const scheduleList = document.getElementById('scheduleList');
    scheduleList.innerHTML = ''; // Clear the existing schedule list

    userSchedule.forEach(course => {
        const listItem = document.createElement('li');
        listItem.textContent = `${course.name} - ${course.time} @ ${course.location}`;

        // Add remove button to each scheduled class
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.onclick = () => removeFromSchedule(course.name);

        listItem.appendChild(removeButton);
        scheduleList.appendChild(listItem); // Append each course to the schedule list
    });
}

// Function to remove a class from the schedule
function removeFromSchedule(className) {
    // Remove the class from the user's schedule array
    userSchedule = userSchedule.filter(course => course.name !== className);

    // Re-render the schedule with the updated classes
    renderSchedule();
    updateMapWithClasses();

    // Save updated schedule in localStorage
    localStorage.setItem('userSchedule', JSON.stringify(userSchedule));

    // Optionally, re-add the class back to available classes
    reAddToAvailableClasses(className);
}

// Function to re-add a class back to available classes
function reAddToAvailableClasses(className) {
    const availableClassesList = document.getElementById('availableClassesList');

    // Recreate the class card (you may need to have class data available)
    let classData;
    if (className === 'Class 1') {
        classData = { name: 'Class 1', time: 'Mon 10 AM', location: 'Building A' };
    } else if (className === 'Class 2') {
        classData = { name: 'Class 2', time: 'Wed 2 PM', location: 'Building B' };
    }

    if (classData) {
        const classCard = document.createElement('div');
        classCard.className = 'class-card';
        classCard.innerHTML = `
            <h3>${classData.name}</h3>
            <p>Time: ${classData.time}</p>
            <p>Location: ${classData.location}</p>
            <button onclick="addToSchedule(this)">Add to Schedule</button>
        `;
        availableClassesList.appendChild(classCard);
    }
}

// Function to load the user's schedule (on page load or login)
function loadUserSchedule() {
    renderSchedule();
    updateMapWithClasses();
}

// Function to clear the schedule (on logout)
function clearSchedule() {
    const scheduleList = document.getElementById('scheduleList');
    scheduleList.innerHTML = ''; // Clear the schedule list
}

// Map-related functions
function initializeMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return; // If the map container doesn't exist, exit

    map = L.map('map').setView([40.7128, -74.0060], 13); // Example coordinates: New York City

    // Add tile layer (background map)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Update markers if user is logged in
    updateMapWithClasses();
}

// Function to update the map with classes
function updateMapWithClasses() {
    if (!map) return;

    // Clear all existing markers
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // Add markers for each class in the user's schedule only if logged in
    if (isLoggedIn) {
        userSchedule.forEach(course => {
            const location = course.location === 'Building A' ? [40.7128, -74.0060] : [40.7138, -74.0070]; // Example locations

            const marker = L.marker(location).addTo(map);
            marker.bindPopup(`<b>${course.name}</b><br>${course.time}<br>${course.location}`);
        });
    }
}

// Initialize the map on page load
document.addEventListener('DOMContentLoaded', function () {
    const loginStatus = document.getElementById("loginStatus");

    // Set initial login status on page load
    if (isLoggedIn) {
        loginStatus.innerHTML = '<a href="#" onclick="toggleLogin()">Logout</a>';
        loadUserSchedule();
    } else {
        loginStatus.innerHTML = '<a href="#" onclick="toggleLogin()">Login</a>';
    }

    initializeMap(); // Initialize map regardless of login status
});
