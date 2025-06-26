require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

// MySQL Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "Snkumar30",
    database: process.env.DB_NAME || "aastha_db",
});

app.use(express.static(path.join(__dirname)));

// MySQL Connection Check
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL Database');
    }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// User Contact Form
app.post("/contact", (req, res) => {
    const { name, email,  message } = req.body;

    const query = "INSERT INTO contact (name, email, message) VALUES (?, ?, ?)";
    db.query(query, [name, email,  message], (err, results) => {
        if (err) {
            console.error("Error inserting data into contact:", err);
            res.status(500).json({ success: false, message: 'Error submitting message' });
        } else {
            res.status(200).json({ success: true, message: 'Message submitted successfully' });
        }
    });
});

// Serve static files
app.get("/index", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});