import { useNavigate } from "react-router-dom";
import "../Styles/CategorySelection.css";
import { useState } from "react";
import { Button } from "@mui/material";


export default function CategorySelection()
{
    const [category, setCategory] = useState("");
    let navigate = useNavigate();
    return (
        <div className='categorySelect'>

            <select id="categorySelect" name='category' aria-label="Select Category" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">All Categories</option>
                <option value="food">Food</option>
                <option value="transport">Transport</option>
                <option value="shopping">Shopping</option>
                <option value="bills">Bills</option>
                <option value="loangiven">Loan given</option>
                <option value="debt">Debt</option>
            </select>

            <Button variant="contained" color="success" size='large' className='search' onClick={() => navigate(`/expenses/category/${category}`)}> Search</Button>
        </div>
    )
}