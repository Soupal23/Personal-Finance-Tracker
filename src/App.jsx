import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

function App(){
  //1. storage & state engine
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('fintrack_data');
    if (savedTransactions) {
      return JSON.parse(savedTransactions);
    }
    return [
      { id: 1, text: 'Sample Salary', amount: 50000, type: 'income', category: 'Salary' },
      { id: 2, text: 'Sample Groceries', amount: 2500, type: 'expense', category: 'Food' },
      { id: 3, text: 'Movie Night', amount: 800, type: 'expense', category: 'Entertainment' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('fintrack_data', JSON.stringify(transactions));
  }, [transactions]);
  //2.input element controllers

  //3.Mathematical metrics

  //4. Recharts Layout Data transformer

  //5.Interaction Methods

  //6.Presentation Interface (JSX Renger)
  return(
    
    <div className="bg-stale-100 min-h-screen md:p-8">

    {/* Header banner */}
      <header className="bg-white p-4 rounded-lg shadow-sm mb-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-emerald-600">FinTrack</h1>
      </header>
      
      {/* Top Math Summary Cards */}
      

      </div>
  );
}

export default App;