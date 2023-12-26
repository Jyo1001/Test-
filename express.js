const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path'); // Add this line to use the 'path' module

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Your existing route for adding items
app.post('/addItem', (req, res) => {
  // ... (existing logic)
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
