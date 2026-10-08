const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 4000,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        ca: fs.readFileSync(path.join(__dirname, process.env.CA)),
    },
    waitForConnections: true,
    connectionLimit: 5,
    enableKeepAlive: true,
});

// serve React build
app.use(express.static(path.join(__dirname, '../dist')));

app.get("/expenses/category/:name", (req, res) => {
    const name = req.params.name.trim();
    const q = name === ""
        ? 'SELECT * FROM ExpenseTable'
        : 'SELECT * FROM ExpenseTable WHERE category = ?';
    connection.query(q, [name], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

app.get("/expenses/:id", (req, res) => {
    connection.query("SELECT * FROM ExpenseTable WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result[0]);
    });
});

app.get("/expenses", (req, res) => {
    connection.query('SELECT * FROM ExpenseTable', (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

app.put("/expenses/:id", (req, res) => {
    const { name, amount, date, category } = req.body;
    const q = "UPDATE ExpenseTable SET name = ?, amount = ?, dates = ?, category = ? WHERE id = ?";
    connection.query(q, [name, amount, date, category, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

app.delete("/expenses/:id", (req, res) => {
    connection.query("DELETE FROM ExpenseTable WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: result.affectedRows });
    });
});

app.post("/new", (req, res) => {
    const { name, amount, date, category } = req.body;
    const q = "INSERT INTO ExpenseTable (name, amount, dates, category) VALUES (?, ?, ?, ?)";
    connection.query(q, [name.trim(), amount, date, category], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId });
    });
});

// anything else -> React app
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});