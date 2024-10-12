const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql2');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const db = mysql.createConnection({
    host: process.env.localhost,
    user: process.env.root,
    password: process.env.123456,
    database: process.env.hospital_db,
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

app.get('/patients', (req, res) => {
    db.query('SELECT patient_id, first_name, last_name, date_of_birth FROM patients', (error, results) => {
        if (error) return res.status(500).send(error);
        res.json(results);
    });
});

app.get('/providers', (req, res) => {
    db.query('SELECT first_name, last_name, provider_specialty FROM providers', (error, results) => {
        if (error) return res.status(500).send(error);
        res.json(results);
    });
});

app.get('/patients/filter', (req, res) => {
    const { firstName } = req.query;
    db.query('SELECT * FROM patients WHERE first_name = ?', [firstName], (error, results) => {
        if (error) return res.status(500).send(error);
        res.json(results);
    });
});

app.get('/providers/filter', (req, res) => {
    const { specialty } = req.query;
    db.query('SELECT * FROM providers WHERE provider_specialty = ?', [specialty], (error, results) => {
        if (error) return res.status(500).send(error);
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



