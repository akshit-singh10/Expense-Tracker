# Expense Tracker

A web app to keep track of your daily spending. You add an expense, and it shows up in a table with the total amount at the top.

## What you can do

- Add an expense (name, amount, date, category)
- See all your expenses in one table
- See the total amount you have spent
- Edit or delete any expense
- Filter expenses by category (Food, Travel, Shopping, Bills, Loan Given, Debt)

## How it works

The project has two parts:

- **Frontend (React):** the pages you see and click on.
- **Backend (Node + Express):** receives requests from the frontend and reads or saves data in the MySQL database.

When you add an expense, React sends it to the backend, the backend saves it in MySQL, and the table shows it.

## Built with

React, Vite, Material UI, React Router, Node.js, Express, MySQL

## Folders

- `src/` - React code (pages and components)
- `Server/` - backend code (`app.js`)

## How to run it

1. Create a MySQL database called `Expense` with a table `ExpenseTable` (columns: id, name, category, amount, dates).

2. Start the backend:

       cd Server
       npm install
       node app.js

   Add a `Server/.env` file with `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` and `PORT=5050`.

3. Start the frontend:

       npm install
       npm run dev

   Add a `.env` file in the root with `VITE_API_URL=http://localhost:5050`.

4. Open http://localhost:5173