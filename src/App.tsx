import { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './Form';
import Transaction from './Transaction';
import './App.css';

export interface UserTransaction {
  id: number;
  name: string;
  transactionValue: number;
  date: Date;
}

const API_URL = "http://localhost:5055/api/UserTransaction";

function App() {
  const [tasks, setTasks] = useState<UserTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [newValue, setNewValue] = useState<number | string>("");
  const [newDate, setNewDate] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [currentType, setCurrentType] = useState("all");
 const [currentTime, setCurrentTime] = useState("all");

  const fetchTasks = async (type = currentType, time = currentTime) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}?type=${type}&dateFilter=${time}`);     
      setTasks(response.data);

      setCurrentType(type);
    setCurrentTime(time);
    } catch (error) {
      console.error("error at taking tasks", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
     const response =  await axios.post(API_URL, {
        name: newName,
        transactionValue: newValue,
        date: newDate
      });
      setNewName("");
      setNewValue(""); 
      setNewDate("");

      const newTransaction = response.data;
      setTasks(prevTasks => [newTransaction, ...prevTasks]);
      //fetchTasks();
    } catch (error) {
      console.error("error posting data", error);
    }
    
  };
     
  const deleteTransaction = async (id: number) => {
    try{
         await axios.delete(`${API_URL}/${id}`);
        setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
        console.error("error deleting transaction", error);
        alert("failed to delete transaction.");
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) return <div>The data from API is loading...</div>;

  return (
    <div className='App'>
      <h1>Transactions Form</h1>
    
      <Form 
        newName={newName} setNewName={setNewName}
        newDate={newDate} setNewDate={setNewDate}
        newValue={newValue} setNewValue={setNewValue}
        onSubmit={handleSubmission}
      />
          <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
  <button onClick={() => fetchTasks("all")} className="filter-btn btn-all">
    All
  </button>
  <button onClick={() => fetchTasks("income", currentTime)} className="filter-btn btn-income">
    Income
  </button>
  <button onClick={() => fetchTasks("expense")} className="filter-btn btn-expense">
    Expenses
  </button>
  <select onChange={(e) => fetchTasks(currentType, e.target.value)} className="date-filter">
  <option value="all">All Time</option>
  <option value="month">Last Month</option>
  <option value="3months">Last 3 Months</option>
  <option value="6months">Last 6 Months</option>
  <option value="year">Last Year</option>
</select>
</div>
      <ul>
        {tasks.length === 0 && <li>No transactions found.</li>}
        {tasks.map((task) => (
          <Transaction 
            key={task.id} 
            task={task} 
            isExpanded={expandedId === task.id}
            onToggle={() => setExpandedId(expandedId === task.id ? null : task.id)}
            onDelete={() => deleteTransaction(task.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;