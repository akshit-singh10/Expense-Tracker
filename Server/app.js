const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());

require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

app.get("/expenses/:id", (req, res) => {
    let { id } = req.params;
    const q = `SELECT * FROM ExpenseTable WHERE id = ${id}`;

    connection.query(q, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err.message });
        }
        console.log(result);
        res.json(result[0]);
    });
});

app.put("/expenses/:id", (req, res) => {

    const { id } = req.params;
    const { name, amount, date, category } = req.body;

    const q = `
        UPDATE ExpenseTable
        SET name = ?, amount = ?, dates = ?, category = ?
        WHERE id = ?
    `;

    connection.query(
        q,
        [name, amount, date, category, id],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json({ error: err.message });
            }

            res.json(result);
        }
    );
});

app.get("/expenses", (req, res) => {
    const q = 'SELECT * FROM ExpenseTable';

    connection.query(q, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
});

app.delete("/expenses/:id", (req, res) => {
    let { id } = req.params;
    const q = `DELETE FROM EXPENSETABLE Where id = ${id}`;

    connection.query(q, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err.message });
        }
        console.log(result);
        res.send(result.message);
    });
});

app.get("/expenses/category/:name", (req, res) => {
    const name = req.params.name.trim();
    const q = name === "" ? 'SELECT * FROM ExpenseTable' : `SELECT * FROM ExpenseTable WHERE category = '${name}'`;
    connection.query(q, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });

})

app.post("/new", (req, res) => {
    const { name, amount, date, category } = req.body;
    const q = "INSERT INTO ExpenseTable (name, amount, dates, category) VALUES (?, ?, ?, ?)";

    connection.query(q, [name.trim(), amount, date, category], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: result.insertId });
    });
});

app.use((req, res) => {
    res.status(404).send("Route not found");
});

app.get(/.*/, (req, res) => {
    res.status(404).send("Page not found");
});


app.listen(process.env.PORT || 5050, () => {

    console.log("Server is connected on port 5050");

});