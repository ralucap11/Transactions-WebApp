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

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
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