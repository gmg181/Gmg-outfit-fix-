const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const app = express();

// Enable CORS to allow requests from different domains
app.use(cors());

// Configure Multer to save uploaded files in 'uploads' directory
const upload = multer({ dest: 'uploads/' });

// API endpoint to handle file upload
app.post('/upload', upload.single('metaFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    res.json({
        message: 'File uploaded successfully!',
        file: req.file
    });
});

// Serve static files (Frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
