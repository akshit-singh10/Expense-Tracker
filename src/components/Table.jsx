import '../Styles/Table.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Table({ expenses = [] ,setExpenses}) {
    let navigate = useNavigate();

    let deleteRequest = async (id)=>
    {
        const res = await fetch(`${import.meta.env.VITE_API_URL ?? ""}/expenses/${id}`,{
            method : "DELETE",
            headers : { "Content-Type": "application/json"},
        });

        if(res.ok)
        {
            const updatedExpense = expenses.filter((e)=> e.id !== id);
            setExpenses(updatedExpense);
        }
        
        navigate('/expenses');
    }


    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                {expenses.length === 0? <h1>You have no Expenses !</h1> : // if-else
                 <tbody>
                    {expenses.map((e) => (
                        <tr key={e.id}>
                            <td>{e.name}</td>
                            <td>{e.amount}</td>
                            <td>{e.category}</td>
                            <td>{new Date(e.dates).toLocaleDateString()}</td>
                            <td>
                                <button onClick={()=> navigate(`/${e.id}/edit`)}><EditIcon /></button>
                                <button  onClick={()=> deleteRequest(e.id)}><DeleteIcon/></button>

                            </td>
                        </tr>
                    ))}
                </tbody> }
            </table>
        </div>
    )
}