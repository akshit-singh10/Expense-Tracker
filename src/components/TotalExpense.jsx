import '../Styles/TotalExpense.css';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export default function TotalExpense({ expenses = [] }) {

    const total = expenses.reduce((sum, expense) => {
        return sum + Number(expense.amount || 0);
    }, 0);

    return (
        <div className="totalExpense">
            <div className="totalExpenseIcon">
                <AccountBalanceWalletIcon />
            </div>

            <div className="totalExpenseContent">
                <p>Total Expenses:</p>
                <h2>₹ {total.toLocaleString('en-IN')}</h2>
            </div>
        </div>
    );
}