import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

function App(){
  //1. storage & state engine
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('fintrack_data');
    //if already data is present, retrieve it
    if (savedTransactions) {
      return JSON.parse(savedTransactions);
    }
    //else return a sample data
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
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Food');
  //3.Mathematical metrics
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expenses;
  //4. Recharts Layout Data transformer

  //5.Interaction Methods
  //capture event in function (e)
  const handleAddTransaction = (e)=>{
    e.preventDefault();
    
    if(!text.trim() || !amount){
      alert('Please fill out all feilds');
      return;
    }
    
    //Add the new transaction
    const newTransaction = {
      id: Date.now(),
      text: text,
      amount: parseFloat(amount),
      type: type,
      category: type === 'income' ? 'salary' : category
    };
    
    setTransactions([newTransaction, ...transactions]);
    setText('');
    setAmount('');

  }

  const handleDeleteTransaction = (id) =>{
    setTransactions(transactions.filter(t => t.id !== id));
  }

  //6.Presentation Interface (JSX Renger)
  return(
    
    <div className="bg-stale-100 min-h-screen md:p-8">

    {/* Header banner */}
      <header className="bg-white p-4 rounded-lg shadow-sm mb-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-emerald-600">FinTrack</h1>
      </header>
      
      {/* Top Math Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Net Balance</p>
          <h2 className="text-2xl font-bold mt-1">₹{balance.toFixed(2)}</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Total Income</p>
          <h2 className="text-2xl font-bold text-emerald-600 mt-1">+₹{income.toFixed(2)}</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Total Expenses</p>
          <h2 className="text-2xl font-bold text-rose-600 mt-1">-₹{expenses.toFixed(2)}</h2>
        </div>
      </section>

      {/* Main Operational Workspaces */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"></div>
      
      </div>
  );
}

export default App;