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

  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  
  //calculating total amount per category
  const categoryTotals = expenseTransactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const chartData = Object.keys(categoryTotals).map(cat => ({
    name: cat === 'Food' ? 'Food & Dining' : 
          cat === 'Rent' ? 'Rent/Utilities' : 
          cat === 'Entertainment' ? 'Entertainment' : 
          cat === 'Medicine' ? 'Medical & Health' : 'Miscellaneous',
    value: categoryTotals[cat]
  }));

const COLORS = ['#6366f1', '#f43f5e', '#ec4899', '#cbd5e1', '#14b8a6'];

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

      {/* Main  Workspaces */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Interactive Column (Forms & Ledger) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Entry Capture Form */}
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-md font-bold mb-4">Add New Record</h3>
            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Item details..." 
                  value={text} 
                  onChange={e => setText(e.target.value)} 
                  className="border p-2 rounded w-full text-sm"
                />
                <input 
                  type="number" 
                  placeholder="Amount (₹)" 
                  value={amount} 
                  onChange={e => setAmount(e.target.value)} 
                  className="border p-2 rounded w-full text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select value={type} onChange={e => setType(e.target.value)} className="border p-2 rounded bg-white text-sm">
                  <option value="expense">Expense Log</option>
                  <option value="income">Income Log</option>
                </select>
                {type === 'expense' && (
                  <select value={category} onChange={e => setCategory(e.target.value)} className="border p-2 rounded bg-white text-sm">
                    <option value="Food">Food</option>
                    <option value="Rent">Rent</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Medicine">Medicine</option>
                    <option value="Misc">Miscellaneous</option>
                  </select>
                )}
              </div>

              <button type="submit" className="w-full bg-slate-800 text-white p-2 rounded font-medium text-sm">
                Save Record
              </button>
            </form>
          </div>

          {/* Dynamic Data Ledger */}
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-md font-bold">Transaction Ledger</h3>
              {transactions.length > 0 && (
                <button 
                  onClick={() => {
                    if(window.confirm('Clear all ledger records?')) {
                      setTransactions([]);
                      localStorage.removeItem('fintrack_data');
                    }
                  }} 
                  className="text-xs text-rose-500 font-bold"
                >
                  Clear All
                </button>
              )}
            </div>

             {/* list down current transactions  */}

            {transactions.length === 0 ? (
              <p className="text-gray-400 text-sm py-4 text-center">Empty Ledger.</p>
            ) : (
              <div className="divide-y max-h-64 overflow-y-auto pr-1">
                {transactions.map(t => (
                  <div key={t.id} className="flex justify-between items-center py-2.5 text-sm">
                    <div>
                      <p className="font-medium text-gray-800">{t.text}</p>
                      <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded uppercase font-bold">{t.category}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={t.type === 'income' ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                        {t.type === 'income' ? '+' : '-'}₹{t.amount}
                      </span>
                      <button onClick={() => handleDeleteTransaction(t.id)} className="text-gray-400 hover:text-rose-500">✕</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>      
        
        {/* Right Analytics Column (Visual Recharts Render) */}
        <div className="lg:col-span-1">
          <div className="bg-white p-5 rounded-lg shadow-sm h-full min-h-[300px]">
            <h3 className="text-md font-bold mb-1">Expense Ratios</h3>
            <p className="text-xs text-gray-400 mb-4">By category groups</p>
            
            <div className="h-48">
              {chartData.length === 0 ? (
                <p className="text-gray-400 text-sm text-center pt-16">No expense data.</p>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={65}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(val) => `₹${val}`} />
                    <Legend iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

      </div>


      </div>
  );
}

export default App;