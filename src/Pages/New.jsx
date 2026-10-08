import React, { useEffect, useState } from 'react';

import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

import '../Styles/New.css';

import { useNavigate, useParams } from 'react-router-dom';


export default function New() {

    const { id } = useParams();
    const navigate = useNavigate();


    const emptyData = {
        name: "",
        amount: "",
        date: "",
        category: ""
    };


    const [formData, setformData] = useState(emptyData);


    // GET EXISTING EXPENSE WHEN EDITING
    useEffect(() => {

        if (id) {

            const getData = async () => {

                const res = await fetch(
                    `${import.meta.env.VITE_API_URL ?? ""}/expenses/${id}`
                );

                const data = await res.json();

                console.log(data);

                setformData({
                    name: data.name,
                    amount: data.amount,
                    date: new Date(data.dates).toISOString().split("T")[0],
                    category: data.category
                });
            };

            getData();
        }

    }, [id]);


    // HANDLE INPUT CHANGES
    const handleChange = (e) => {

        setformData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    // CREATE NEW EXPENSE
    const submitData = async () => {

        const response = await fetch(
            `${import.meta.env.VITE_API_URL ?? ""}/new`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            }
        );

        if (response.ok) {
            navigate("/expenses");
        }
    };


    // UPDATE EXISTING EXPENSE
    const updateData = async () => {

        const response = await fetch(
            `${import.meta.env.VITE_API_URL ?? ""}/expenses/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            }
        );

        if (response.ok) {
            navigate("/expenses");
        }
    };


    // FORM SUBMIT
    const handleSubmit = (e) => {

        e.preventDefault();

        if (id) {
            updateData();
        } else {
            submitData();
        }
    };


    return (
        <div className="newForm">

            <CardContent>

                <form onSubmit={handleSubmit}>

                    <div className="field">

                        <TextField
                            value={formData.name}
                            className="inputField"
                            name="name"
                            id="expense"
                            label="Expense Name"
                            variant="outlined"
                            onChange={handleChange}
                        />

                    </div>


                    <div className="field">

                        <TextField
                            value={formData.amount}
                            className="inputField"
                            name="amount"
                            id="amount"
                            type="number"
                            label="Amount"
                            variant="outlined"
                            onChange={handleChange}
                        />

                    </div>


                    <div className="field">

                        <TextField
                            value={formData.date}
                            className="inputField"
                            name="date"
                            type="date"
                            id="date"
                            variant="outlined"
                            onChange={handleChange}
                        />

                    </div>


                    <div className="field">

                        <label
                            className="labelCategory"
                            htmlFor="categoryselection"
                        >
                            Category
                        </label>

                        <select
                            value={formData.category}
                            className="inputField"
                            id="categoryselection"
                            name="category"
                            onChange={handleChange}
                        >

                            <option value="">
                                Select Category
                            </option>

                            <option value="Food">
                                Food
                            </option>

                            <option value="Travel">
                                Travel
                            </option>

                            <option value="Shopping">
                                Shopping
                            </option>

                            <option value="Bills">
                                Bills
                            </option>

                            <option value="Loan Given">
                                Loan given
                            </option>

                            <option value="Debt">
                                Debt
                            </option>

                        </select>

                    </div>


                    <CardActions className="submitButton">

                        <Button
                            type="submit"
                            size="small"
                            variant="contained"
                        >
                            {id ? "Update Expense" : "Submit"}
                        </Button>

                    </CardActions>

                </form>

            </CardContent>

        </div>
    );
}