**System Requirements**
Operating System: Windows, macOS, or Linux.

Node.js and npm: Ensure you have Node.js installed (v14 or higher recommended). You can download it from Node.js Official Website.
Google Chrome or another modern browser.
Internet Access: Required for Google Maps API and Canvas API calls.

**Step 1: Prepare the Environment**
Install Node.js and npm:

Verify installation by running the following in your terminal:
node -v
npm -v

Install a Code Editor:
Download and install Visual Studio Code (recommended) or any preferred code editor.

**Step 2: Clone or Download the Repository**
Clone the repository (if hosted on GitHub):

git clone <repository-url>

Or download the ZIP file:
Navigate to your repository hosting site.
Download the project as a ZIP file and extract it to a directory of your choice.
Open the project folder in your code editor.

**Step 3: Install Backend Dependencies**

Navigate to the backend directory (if the package.json file is in the root folder, you can skip this step):
cd backend

Install the required Node.js dependencies:
npm install

**Step 4: Configure the Environment**
Create a .env file in the backend directory:

touch .env
Add the following environment variables:
env

GOOGLE_API_KEY=your_google_maps_api_key
CANVAS_API_URL=https://<canvas-instance-url>/api/v1
Replace your_google_maps_api_key with your Google Maps API key.
Replace <canvas-instance-url> with your institution’s Canvas API base URL.

Set up CORS in server.js:
Ensure your frontend URL (e.g., http://localhost:3000) is allowed by the backend.

**Step 5: Run the Backend Server**
Start the server:

npm start
Verify the server is running:
Open a browser and navigate to http://localhost:3000/api/courses (or another test route) or check in your terminal, you should see a message "Server running at http://localhost:3000"

**Step 6: Configure and Run the Frontend**
Open the index.html file in your frontend folder.

Replace the placeholder in the Google Maps script tag with your actual Google Maps API key:
<script src="https://maps.googleapis.com/maps/api/js?key=your_google_maps_api_key&libraries=places"></script>

Set up a local server for the frontend:
Install the Live Server extension in Visual Studio Code or use any other static file server.
Open the project in VS Code, right-click index.html, and select "Open with Live Server."

**Step 7: Verify Excel File Processing**
Ensure the file xlsx.full.min.js (from the SheetJS library) is included in your project directory.
Test file uploads by clicking the file input field in the interface and uploading an Excel file.

**Step 8: Login and Fetch Data**
Open the application in your browser.
Enter your MiamiOH email, password, and Canvas API key in the login form.
After successful login, upload an Excel file to see the course buttons populate dynamically.

**Step 9: Test Mapping Features**
Select a course from the generated buttons.
Verify that the map updates with the course’s location and provides directions from your current location.

**Step 10: Logout and Cleanup**
Use the Logout button to clear session data.
Stop the backend server by pressing Ctrl+C in the terminal where it’s running.

**Troubleshooting**
Map Not Displaying:
Check the console for Google Maps API errors (e.g., missing or invalid API key).

Excel Parsing Issues:
Ensure the Excel file format matches the expected columns (check the code’s handleFile function for structure).

CORS Errors:
Ensure the backend allows requests from the frontend's origin in cors configuration.
