import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useNavigate, useLocation } from "react-router-dom";
import '../Styles/Navbar.css'

export default function Navbar() {
    let navigate = useNavigate();
    let location = useLocation();
    return (
        <AppBar className="navbars" position="static" sx={{ bgcolor: "white", color: "#3b5bdb" }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Typography variant="h6" fontWeight="bold">
                    <div className="logoText">
                        <AccountBalanceWalletIcon /> &nbsp; &nbsp;
                        <h3>Expense Tracker</h3>
                    </div>
                </Typography>

                <Box>
                    <Button onClick={() => navigate("/")} className={location.pathname === "/" ? "active" : ""}>Home</Button>
                    <Button onClick={() => navigate("/new")} className={location.pathname === "/new" ? "active" : ""}>Add New Expense</Button>
                    <Button onClick={() => navigate("/expenses")} className={location.pathname === "/expenses" ? "active" : ""}>Show all Expenses</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}