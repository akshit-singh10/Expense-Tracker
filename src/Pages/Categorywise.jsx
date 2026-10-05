import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Table from '../components/Table';

export default function Categorywise() {
   const [expenses, setExpenses] = useState([]);
   const {category} = useParams();


  useEffect(async () => {
      const getData = async () => {
        try {
          const res = await fetch(`${import.meta.env.VITE_API_URL}/expenses/category/${category}`);
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
          <Table expenses={expenses} setExpenses={setExpenses} />
    
        </div>
      );
}
