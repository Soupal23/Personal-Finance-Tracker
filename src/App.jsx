import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import './App.css';

function App(){
  //1. state engine
  const [transactions, setTransactions] = useState([]);

  // useEffect(() => {
  //   localStorage.setItem('fintrack_data', JSON.stringify(transactions));
  // }, [transactions]);

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
    const parsedAmount = parseFloat(amount);
    if(!text.trim() || !amount || isNaN(parsedAmount) || parsedAmount<=0){
      alert('Please enter valid details and an amount greater than 0');
      return;
    }
    
    //Add the new transaction
    const newTransaction = {
      id: Date.now(),
      text: text,
      amount: parseFloat(amount),
      type: type,
      category: type === 'income' ? 'Salary' : category
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
    
    <div className="app-container">

      {/* Header banner */}
      <header className="header-banner">
        <h1>FinTrack</h1>
      </header>
      
      {/* Top Math Summary Cards */}
      <section className="summary-section">
        <div className="card">
          <p>Net Balance</p>
          <h2>₹{balance.toFixed(2)}</h2>
        </div>
        <div className="card">
          <p>Total Income</p>
          <h2 className="text-income">+₹{income.toFixed(2)}</h2>
        </div>
        <div className="card">
          <p>Total Expenses</p>
          <h2 className="text-expense">-₹{expenses.toFixed(2)}</h2>
        </div>
      </section>

      {/* Main Workspaces Layout */}
      <div className="main-workspace">
        
        {/* Left Interactive Column */}
        <div className="left-column space-y-6">
          
          {/* Entry Capture Form */}
          <div className="panel">
            <h3>Add New Record</h3>
            <form onSubmit={handleAddTransaction} className="form-layout">
              <div className="form-row">
                <input 
                  type="text" 
                  placeholder="Item details..." 
                  value={text} 
                  onChange={e => setText(e.target.value)} 
                  className="input-field"
                />
                <input 
                  type="number" 
                  placeholder="Amount (₹)" 
                  value={amount} 
                  onChange={e => setAmount(e.target.value)} 
                  className="input-field"
                />
              </div>

              <div className="form-row">
                <select value={type} onChange={e => setType(e.target.value)} className="select-field">
                  <option value="expense">Expense Log</option>
                  <option value="income">Income Log</option>
                </select>
                {type === 'expense' && (
                  <select value={category} onChange={e => setCategory(e.target.value)} className="select-field">
                    <option value="Food">Food</option>
                    <option value="Rent">Rent</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Medicine">Medicine</option>
                    <option value="Misc">Miscellaneous</option>
                  </select>
                )}
              </div>

              <button type="submit" className="submit-btn">
                Save Record
              </button>
            </form>
          </div>

          {/* Dynamic Data Ledger */}
          <div className="panel">
            <div className="ledger-header">
              <h3>Transaction Ledger</h3>
              {transactions.length > 0 && (
                <button 
                  onClick={() => {
                    if(window.confirm('Clear all ledger records?')) {
                      setTransactions([]);
                      
                    }
                  }} 
                  className="clear-btn"
                >
                  Clear All
                </button>
              )}
            </div>

             {/* list down current transactions  */}

            {transactions.length === 0 ? (
              <p className="empty-text">Empty Ledger.</p>
            ) : (
              <div className="ledger-list">
                {transactions.map(t => (
                  <div key={t.id} className="ledger-item">
                    <div className="item-details">
                      <p>{t.text}</p>
                      <span className="category-badge">{t.category}</span>
                    </div>
                    <div className="item-actions">
                      <span className={t.type === 'income' ? 'text-income font-bold' : 'text-expense font-bold'}>
                        {t.type === 'income' ? '+' : '-'}₹{t.amount}
                      </span>
                      <button onClick={() => handleDeleteTransaction(t.id)} className="delete-btn">✕</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>     
        
        {/* Right Analytics Column (Visual Recharts Render) */}
        <div className="right-column">
          <div className="panel chart-card">
            <h3 className="mb-1">Expense Ratios</h3>
            <p className="text-xs text-gray-400 mb-4">By category groups</p>
            
            <div className="chart-wrapper">
              {chartData.length === 0 ? (
                <p className="empty-text" style={{ paddingTop: '4rem' }}>No expense data.</p>
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