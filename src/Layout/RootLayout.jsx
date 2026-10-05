import { Outlet } from 'react-router-dom'
import '../components/Navbar.jsx'
import Navbar from '../components/Navbar.jsx'


export default function RootLayout()
{
    let styles = {overflow : "auto"}
    return(
        <div style={styles}>
            <Navbar/>
            <Outlet/>
        </div>
    )
}