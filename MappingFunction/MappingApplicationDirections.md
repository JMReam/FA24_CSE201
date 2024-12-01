# Course Scheduling Application

## Overview
This application helps students at Miami University efficiently view and plan their course schedule. Users can upload an Excel file containing their course data, view buttons for matching courses, and click these buttons to plot course locations on a map and get directions from their current location.

---

## Features
- Upload an Excel file with course information.
- Match courses from the file with Canvas course data.
- Display course-specific buttons for easy interaction.
- Plot course locations on a map.
- View directions to course locations from your current location.

---

## How to Use

### 1. Accessing the Application
1. **Open the application** in a web browser by navigating to its URL.
2. Ensure your browser supports modern web features (JavaScript and HTML5 File API).

### 2. Obtaining Your Canvas API Key
1. **Log in to Canvas**:
   - Navigate to [Miami University's Canvas portal](https://miamioh.instructure.com/) and log in with your credentials.
2. **Access your profile**:
   - Click your profile icon in the top-left corner of the Canvas dashboard.
3. **Go to Account Settings**:
   - Select “Settings” from the dropdown menu.
4. **Generate a new API token**:
   - Scroll down to the “Approved Integrations” section.
   - Click “New Access Token.”
5. **Enter token details**:
   - Provide a name for the token (e.g., “Course Scheduler App”) and set an expiration date if required.
6. **Copy the token**:
   - Click “Generate Token” and copy the API key. Keep it secure as it provides access to your Canvas data.
7. **Input the token**:
   - Paste the token into the “Canvas API Key” field in the login modal.

### 3. Logging In
1. **Open the login modal**:
   - Click the “Login” button or icon to access the login form.
2. **Enter credentials**:
   - **Email**: Use your Miami University email (e.g., `username@miamioh.edu`).
   - **Password**: Enter your account password.
   - **Canvas API Key**: Input your Canvas API key (if applicable).
3. **Submit the form**:
   - Click “Submit” to log in. A confirmation message will appear on success.
4. **Log out**:
   - Click “Logout” to clear credentials and end the session.

### 4. Uploading the Excel File
1. **Choose a file**:
   - Use the “Choose File” button to select the Excel file containing your course data.
2. **File format requirements**:
   - Ensure the Excel file includes columns for:
     - Course subject code
     - Course number
     - Section
     - Building name
     - Room number
     - Date and time
3. **Upload the file**:
   - The application automatically processes the file and matches courses to Canvas data.

### 5. Viewing and Interacting with Course Buttons
1. **Find course buttons**:
   - After processing the file, course buttons appear in the “Available Courses” section.
2. **Button labels**:
   - Buttons are labeled with course details, e.g., “CSC 101 - A (Room 205).”
3. **Click a button**:
   - Clicking a button:
     - Plots the course location on the map.
     - Displays directions from your current location to the course.

### 6. Using Map Features
1. **Navigate the map**:
   - Explore the map by zooming or dragging to view different locations.
2. **Interact with markers**:
   - Click a marker to view more details about a course location.
3. **Get directions**:
   - Directions from your current location to the course will appear, showing estimated travel time.

### 7. Calendar Integration (Optional)
1. **View the calendar**:
   - If the access to Banner is available, the calendar displays your course schedule visually.


---

## Troubleshooting
- **No file selected**:
  - Ensure an Excel file is selected before processing.
- **Login issues**:
  - Verify your email format (`@miamioh.edu`) and API key. Contact IT support if needed.
- **Buttons not appearing**:
  - Check that the courses in your Excel file match Canvas data and use the correct section ID format.
- **Map or directions not working**:
  - Ensure your browser’s location services are enabled and permissions are granted.

---

For additional support or feedback, contact [burketc3@miamioh.edu](mailto:burketc3@miamioh.edu).

