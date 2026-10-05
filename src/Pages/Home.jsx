import '../Styles/Home.css'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import CategorySelection from '../components/CategorySelection';

export default function Home() {

    let navigate = useNavigate();


    return (
        <div>
            <div className="headlines">
                <h1>Welcome to Expense Tracker!</h1>
                <h4>Keep track of your spending and manage your finances easily.</h4>
            </div>

            <div className='buttons'>
                <Button variant="contained" color="primary" sx={{ textTransform: "none" }}>+ Add New expense</Button>
            </div>

            <br /><br /><br />

            <CategorySelection/>
            

        </div>
    )
}