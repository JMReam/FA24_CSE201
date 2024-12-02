const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3000;

// Middleware for parsing JSON requests
app.use(express.json());

// Enable CORS for all origins (can be customized)
app.use(cors());

// Route to get active Canvas courses
app.post('/api/courses', async (req, res) => {
    const { apiKey } = req.body; // API key should be passed in the request body

    if (!apiKey) {
        return res.status(400).json({ error: 'Canvas API key is required.' });
    }

    try {
        // Replace 'https://canvas.instructure.com/api/v1/courses' with the appropriate Canvas API URL
        const response = await axios.get('https://canvas.instructure.com/api/v1/courses', {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        // Filter only active courses
        const activeCourses = response.data.filter(course => course.workflow_state === 'available');

        res.json(activeCourses);
    } catch (error) {
        console.error('Error fetching courses:', error);

        // Handle errors from the Canvas API
        if (error.response) {
            res.status(error.response.status).json({
                error: `Canvas API returned an error: ${error.response.data}`
            });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
