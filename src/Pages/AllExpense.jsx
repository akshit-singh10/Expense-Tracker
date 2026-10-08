import { useState, useEffect } from "react";
import Table from "../components/Table";
import TotalExpense from "../components/TotalExpense";


export default function Home() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL ?? ""}/expenses`);
        if (!res.ok) throw new Error("Server error");
        const data = await res.json();
        console.log(data);
        setExpenses(data);
      } catch (err) {
        console.error("Fetch failed:", err.message);
      }
    };
    getData();
  }, []);



  return (
    <div>
      <TotalExpense expenses={expenses} />
      <Table expenses={expenses} setExpenses={setExpenses} />

    </div>
  );

}
