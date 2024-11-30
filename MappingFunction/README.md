**Detailed User Guide for our Course Mapping Application**

Overview
This application is designed to help students at Miami University efficiently view and plan their course schedule. It allows users to upload an Excel file containing their course data, view buttons for courses that match the data, and click on those buttons to plot course locations on a map and view directions from their current location. The application also has features for logging in with a university email and API key.

Step-by-Step Instructions
1. Accessing the Application

Navigate to the application in your web browser:
Open the URL where the application is hosted.

Ensure your browser supports modern web features:
The application requires JavaScript and the HTML5 File API.

**2. Logging In**
Open the login modal:
Click on the “Login” button or icon to open the modal where you can enter your login details.

Enter your credentials:

Email: 
Enter your Miami University email address. Ensure it ends with @miamioh.edu (e.g., username@miamioh.edu).

Password: 
Enter your account password.

Canvas API Key: 
Enter your Canvas API key (if applicable; this is required for fetching course data).

Submit the login form:
Click the “Submit” button to log in. If the credentials are correct, the modal will close, and you will see a message confirming a successful login.

Log out:
If you want to log out reclick on the login button, then click on the “Logout” button, which will clear your stored credentials and log you out.

**3. Uploading the Excel File, this will be phased out when integrated / passed to web and the Excel file will be a datbase**
Select the Excel file:
Locate the “Choose File” or file input button on the page. Click it and select the Excel file that contains your course data.

File format requirements:
The Excel file should have a specific structure. Ensure it includes columns for course subject code, course number, section, building name, room number, date, and time, among other necessary data.

Upload the file:
Once the file is selected, it will be automatically processed by the application. The courses within the file will be compared against the fetched courses from Canvas to create buttons for matching courses.

**4. Viewing and Interacting with Course Buttons**
Find the course buttons:
After the file has been processed, a series of buttons will appear under the “Available Courses” section. Each button represents an individual course that matches the data from your Excel file and your Canvas account.

Understand the button labels:
Each button will be labeled with the course subject code, course number, section, and room number (e.g., “CSC 101 - A (Room 205)”).

Click a button to view details:
Clicking a button will perform the following actions:

Plot the course location on the map: 
The map will center on the course’s building and display a marker.

Fetch directions from your current location: 
Directions will be shown from your current location to the course location. The travel mode can be adjusted in the application settings (e.g., walking, driving).

**5. Using the Map Features**
Navigate the map:
The map will be embedded within the application and will show the university campus and other relevant locations.
Use the zoom in/out buttons or drag the map to explore the campus and surrounding area.

Interact with map markers:
Clicking on a course location marker will show more information about the location.

Get directions:
Directions from your current location to the plotted course location will be displayed, allowing you to see how to get there and an estimated travel time.

**6. Calendar Integration (Optional)**
View the schedule:
If the calendar feature is implemented, it will allow you to see your course schedule visually.

**7. Troubleshooting and Common Issues**
No file selected:
Ensure you have selected an Excel file with the correct structure before submitting.

Login issues:
If login fails, verify your email format (@miamioh.edu) and ensure you have the correct API key. Contact IT support for assistance with your Canvas API key.

Course buttons not appearing:
Confirm that the courses in your Excel file match the courses fetched from Canvas. Double-check the data structure and the section ID formats.

Map or directions not working:
Ensure that your browser has location services enabled and that you have given the necessary permissions for location access.
