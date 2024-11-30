let map;
let directionsService;
let directionsRenderer;
let apiKey = null; // Store the Canvas API key after login

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 39.507, lng: -84.745 },
        zoom: 13
    });
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    console.log('Map initialized');
}


// Initialize the map when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    const storedApiKey = localStorage.getItem('canvasApiKey');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    document.getElementById('loginModal').style.display = 'none';

    if (isLoggedIn === 'true' && storedApiKey) {
        apiKey = storedApiKey;
        console.log('User is logged in with API key:', apiKey);
        getCourses(); // Call to fetch courses if user is logged in

        // Change the login button text to "Logout"
        const loginButton = document.getElementById('loginButton');
        if (loginButton) {
            loginButton.textContent = 'Logout';
            loginButton.removeEventListener('click', handleLogin); // Remove login click event if it exists
            loginButton.addEventListener('click', logout); // Add logout event listener
        }
    } else {
        console.log('No active login session found.');
        showCustomAlert('Please log in to fetch courses.');
    }
});

function showCustomAlert(message) {
    const alertBox = document.getElementById('customAlert');
    const alertMessage = document.getElementById('customAlertMessage');
    const closeButton = document.getElementById('customAlertClose');

    alertMessage.textContent = message;
    alertBox.style.display = 'block';

    closeButton.addEventListener('click', () => {
        alertBox.style.display = 'none';
    });
}

document.getElementById('excelFileInput').addEventListener('change', handleFile);
// Add event listener for the login form
document.getElementById('loginForm')?.addEventListener('submit', handleLogin);

function handleLogin(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const email = document.querySelector('.login-form input[type="text"]').value;
    const password = document.querySelector('.login-form input[type="password"]').value;
    let apiKey = document.querySelector('.login-form input[type="password"]:nth-of-type(2)').value;

    if (!email || !password || !apiKey) {
        alert('Please fill in all fields.');
        return;
    }

    const emailPattern = /@miamioh\.edu$/;
    if (!emailPattern.test(email)) {
        alert('Invalid email domain. Please use an email that ends with @miamioh.edu.');
        return;
    }

    // Mock validation logic
    if (email && password && apiKey) {
        console.log('Login successful'); // Debugging log
        showCustomAlert('Login successful!');
        localStorage.setItem('canvasApiKey', apiKey);
        localStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('cameFromOtherPage', 'true'); // Flag for session

        // Change the login button text to "Logout"
        const loginButton = document.getElementById('loginButton');
        if (loginButton) {
            loginButton.textContent = 'Logout';
            loginButton.removeEventListener('click', handleLogin);
            loginButton.addEventListener('click', logout);
        }

        // Directly call getCourses() to fetch courses immediately after login
        apiKey = localStorage.getItem('canvasApiKey'); // Ensure apiKey is updated
        getCourses();

        setTimeout(() => {
            document.getElementById('loginModal').style.display = 'none';
        }, 0);
    } else {
        showCustomAlert('Invalid login credentials.');
    }
}

function logout() {
    localStorage.removeItem('canvasApiKey');
    localStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('cameFromOtherPage'); // Clear session flag
    showCustomAlert('Logged out successfully!');

    // Clear the form fields
    const loginFormInputs = document.querySelectorAll('.login-form input');
    loginFormInputs.forEach(input => {
        input.value = ''; // Clear each input value
    });

    // Change the button text back to "Login"
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        loginButton.textContent = 'Login';
        loginButton.removeEventListener('click', logout); // Remove logout event listener
        loginButton.addEventListener('click', toggleLogin); // Re-add login event listener
    } else {
        console.log('Login button not found'); // Debugging log
    }
}

// Function to toggle modal visibility
function toggleLogin() {
    const modal = document.getElementById('loginModal');
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'block';
    }
}

// Close the modal when the close button is clicked
const closeButton = document.querySelector(".close");
if (closeButton) {
    closeButton.addEventListener("click", function () {
        const loginModal = document.getElementById("loginModal");
        if (loginModal) {
            loginModal.style.display = "none";
        }
    });
}

// Close the modal when clicking outside the modal content
window.addEventListener("click", function (event) {
    const loginModal = document.getElementById("loginModal");
    if (loginModal && event.target === loginModal) {
        loginModal.style.display = "none";
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const storedApiKey = localStorage.getItem('canvasApiKey');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    document.getElementById('loginModal').style.display = 'none';

    if (isLoggedIn === 'true' && storedApiKey) {
        apiKey = storedApiKey;
        console.log('User is logged in with API key:', apiKey);
        getCourses(); // Call to fetch courses if user is logged in

        // Change the login button text to "Logout"
        const loginButton = document.getElementById('loginButton');
        if (loginButton) {
            loginButton.textContent = 'Logout';
            loginButton.removeEventListener('click', handleLogin);
            loginButton.addEventListener('click', logout);
        }
    } else {
        console.log('No active login session found.');
        showCustomAlert('Please log in to fetch courses.');
    }
});



async function handleFile(event) {
    const file = event.target.files[0];

    if (!file) {
        console.error('No file selected');
        return;
    }

    const reader = new FileReader();
    reader.onload = async function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const excelData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
        const courses = await getActiveCanvasCourses();

        const buttonContainer = document.getElementById('courseButtons');
        if (buttonContainer) {
            buttonContainer.innerHTML = '';

            const courseButtons = new Map();

            excelData.slice(1).forEach(row => {
                const [ , courseSubjectCode, courseNumber, courseSection, , , , , , courseBuilding, room, date, time] = row;

                const sectionIDs = expandSectionRange(courseSection);
                if (isCourseActive(courses, courseSubjectCode, courseNumber, sectionIDs)) {
                    const courseKey = `${courseSubjectCode}-${courseNumber}`;

                    if (!courseButtons.has(courseKey)) {
                        const button = document.createElement('button');
                        console.log('Creating button for:', courseKey);
                        button.innerText = `${courseSubjectCode} ${courseNumber} - ${courseSection} (Room ${room})`;
                        button.onclick = () => {
                            plotCourseAndDirections(courseBuilding);
                            plotCourseOnCalendar(date, time, `${courseSubjectCode} ${courseNumber}`);
                        };

                        courseButtons.set(courseKey, button);
                        buttonContainer.appendChild(button);
                    }
                }
            });
        }
    };

    reader.readAsArrayBuffer(file);
}

// // Populate the calendar with the course data
// function plotCourseOnCalendar(date, time, courseName) {
//     const eventDate = new Date(`${date}T${time}`);
//     const calendarEl = document.getElementById('calendar');
//     if (!calendarEl) {
//         console.error('Calendar container not found.');
//         return;
//     }

//     const calendar = new FullCalendar.Calendar(calendarEl, {
//         initialView: 'dayGridMonth',
//         events: []
//     });

//     calendar.addEvent({
//         title: courseName,
//         start: eventDate,
//         allDay: false
//     });

//     calendar.render();
// }

async function getCourses() {
    const apiKey = localStorage.getItem('canvasApiKey');
    if (!apiKey) {
        console.error('No API key found.');
        return [];
    }

    try {
        const response = await fetch('http://localhost:3000/api/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({ apiKey })
        });

        if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status}`);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const courses = await response.json();
        console.log('Fetched courses:', courses);
        return Array.isArray(courses) ? courses : [];
    } catch (error) {
        console.error('Error fetching courses:', error);
        return [];
    }
}

async function getActiveCanvasCourses() {
    const courses = await getCourses();
    console.log('Courses from getCourses:', courses);

    if (!Array.isArray(courses)) {
        console.error('getCourses did not return an array:', courses);
        return [];
    }

    return courses.map(course => {
        if (course.course_code && typeof course.course_code === 'string') {
            const match = course.course_code.match(/^([A-Za-z/]+)(\d+)(?:\s+([A-Za-z]+(?:-[A-Za-z])?))?$/);

            if (match) {
                const subjectCodes = match[1].split('/');
                const courseNumber = match[2];
                const section = match[3] || '';

                const sectionIDs = section.includes('-') ? expandSectionRange(section) : [section];

                console.log(`Parsed course: ${subjectCodes} ${courseNumber} with sections [${sectionIDs}]`);
                return {
                    subjectCodes,
                    courseNumber,
                    sectionIDs
                };
            } else {
                console.warn('Course code is malformed:', course.course_code);
                return null;
            }
        } else {
            console.warn('Course code is missing or malformed:', course);
            return null;
        }
    }).filter(course => course !== null);
}

// Helper function to expand section ranges
function expandSectionRange(sectionRange) {
    sectionRange = sectionRange.trim();
    if (sectionRange.includes('-')) {
        const [start, end] = sectionRange.split('-').map(s => s.toUpperCase());
        const sections = [];
        for (let i = start.charCodeAt(0); i <= end.charCodeAt(0); i++) {
            sections.push(String.fromCharCode(i));
        }
        return sections;
    } else {
        return [sectionRange.toUpperCase()];
    }
}

function isCourseActive(courses, subjectCode, courseNumber, excelSectionIDs) {
    console.log(`Checking ${subjectCode} ${courseNumber} with sections [${excelSectionIDs}]`);
    return courses.some(course => {
        const match = course.subjectCodes.some(code => code.toLowerCase() === subjectCode.toLowerCase()) &&
                      course.courseNumber === courseNumber &&
                      excelSectionIDs.some(excelSectionID => course.sectionIDs.includes(excelSectionID));

        if (match) {
            console.log(`Match found: ${subjectCode} ${courseNumber}`);
        }
        return match;
    });
}

// Plot course location based on building name and initialize directions
function plotCourseAndDirections(building) {
    const service = new google.maps.places.PlacesService(map);

    let query = building.trim();

    // Customize building names to their full addresses if needed
    switch (query.toLowerCase()) {
        case 'art building':
            query = 'Arts Building, 400 S Patterson Ave, Oxford, OH 45056';
            break;
        case 'engineering building':
            query = 'Garland Hall';
            break;
        case 'psychology building':
            query = '90 N. Patterson Avenue, Oxford, OH 45056';
            break;
        default:
            query = `${query} Campus, Oxford`;
            break;
    }

    service.findPlaceFromQuery({
        query: query,
        fields: ['name', 'geometry']
    }, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
            const location = results[0].geometry.location;

            // Place a marker at the course location on the map
            const marker = new google.maps.Marker({
                position: location,
                map: map,
                title: building,
            });

            map.setCenter(location);

            // Get user location and calculate the route
            getUserLocationAndDirections(location);
        } else {
            console.error('Building not found or service error:', status);
            alert('Could not find the building. Please try a different search.');
        }
    });
}

// Function to get user location and initiate route calculation
function getUserLocationAndDirections(courseLocation) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                console.log("User location fetched:", userLocation);
                calculateRoute(userLocation, courseLocation);
            },
            (error) => {
                console.error('Error fetching location:', error);
                const defaultLocation = { lat: 39.507, lng: -84.745 };
                console.log('Using default location:', defaultLocation);
                calculateRoute(defaultLocation, courseLocation);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    } else {
        console.error('Geolocation is not supported by this browser');
        const defaultLocation = { lat: 39.507, lng: -84.745 };
        console.log('Using default location (geolocation not supported):', defaultLocation);
        calculateRoute(defaultLocation, courseLocation);
    }
}

// Function to calculate and display the route
function calculateRoute(start, end) {
    console.log('Calculating route from', start, 'to', end); // Log start and end locations

    const request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.WALKING // You can change to 'DRIVING', 'TRANSIT', etc.
    };

    directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            console.log('Directions request successful:', result);
            directionsRenderer.setDirections(result);
        } else {
            console.error('Directions request failed due to', status);
            alert('Could not fetch directions. Please try again later.');
        }
    });
}
