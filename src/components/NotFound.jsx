import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import "../Styles/Notfound.css"

export default function NotFound()
{

    let navigate = useNavigate();

    return(
        <div className="outer">
            <h1 className="heading">Error 404! Page Not Found</h1>
            <div className="inner">
                <h3>Go to home page? click here</h3>
                <Button variant="outlined" size="large" className="letsgo" onClick={()=> navigate('/')}>Let's GO</Button>
            </div>
            
        </div>
    )
}