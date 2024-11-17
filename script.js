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
    // Replace 'YOUR_ACCESS_TOKEN' with your actual Mapbox token
    mapboxgl.accessToken = 'pk.eyJ1IjoicmVhbWptIiwiYSI6ImNtMmVxY3Q0djAwemIyanExZjh3bXBrbDYifQ.vR08rw_la1g59duJyMpH9g';

    // Initialize the map
    var map = new mapboxgl.Map({
        container: 'map', // The HTML element to initialize the map in
        style: 'mapbox://styles/mapbox/streets-v11', // Custom style similar to Miami's map
        center: [-84.7333, 39.5000], // Starting position [lng, lat]
        zoom: 14 // Starting zoom level
    });

    // Add navigation controls (zoom, rotate, etc.)
    map.addControl(new mapboxgl.NavigationControl());

    // Add the geocoder (search bar)
    var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl, // Use Mapbox GL
        marker: true, // Add marker when searching
        placeholder: "Search for places", // Placeholder text in the search bar
    });

    // Add the search bar to the map
    map.addControl(geocoder);

    // Add markers for specific locations
    // var locations = [
    //    { lng: -84.7333, lat: 39.5000, name: "King Library" },
    //    { lng: -84.7345, lat: 39.5010, name: "Armstrong Student Center" },
    //    { lng: -84.7320, lat: 39.4995, name: "McGuffey Hall" }
    // ];

    locations.forEach(function(location) {
        new mapboxgl.Marker()
            .setLngLat([location.lng, location.lat])
            .setPopup(new mapboxgl.Popup().setText(location.name)) // Popup shows the location name
            .addTo(map);
    });

    // Sidebar functionality: Zoom to location on click
    document.querySelectorAll('.location-item').forEach(function(item) {
        item.addEventListener('click', function() {
            var lng = this.getAttribute('data-lng');
            var lat = this.getAttribute('data-lat');
            map.flyTo({
                center: [lng, lat],
                zoom: 16
            });
        });
    });

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
