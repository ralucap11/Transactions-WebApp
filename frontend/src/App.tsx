import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import PersonDetails from './PersonDetails';
import './App.css';
import TransactionList from './TransactionList';
import { API_URL } from './constants';

export interface UserTransaction {
  id: number;
  name: string;
  transactionValue: number;
  date: Date;
}

function App() {
  const [tasks, setTasks] = useState<UserTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [newValue, setNewValue] = useState<number | string>("");
  const [newDate, setNewDate] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [currentType, setCurrentType] = useState("all");
  const [currentTime, setCurrentTime] = useState("all");
  const [currentSort, setCurrentSort] = useState("newest");

  const fetchTasks = async (type = currentType, time = currentTime, sort = currentSort) => {
    try {
      setLoading(true);
      setCurrentType(type);
      setCurrentTime(time);
      setCurrentSort(sort);
      const response = await axios.get(`${API_URL}?type=${type}&dateFilter=${time}&sortOrder=${sort}`);     
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
      const response = await axios.post(API_URL, {
        name: newName,
        transactionValue: newValue,
        date: newDate
      });
      setNewName(""); setNewValue(""); setNewDate("");
      setTasks(prevTasks => [response.data, ...prevTasks]);
    } catch (error) {
      console.error("error posting data", error);
    }
  };
     
  const deleteTransaction = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error("error deleting transaction", error);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  return (
    <Routes>
      <Route path="/" element={
        <TransactionList 
          tasks={tasks} fetchTasks={fetchTasks} loading={loading}
          newName={newName} setNewName={setNewName}
          newDate={newDate} setNewDate={setNewDate}
          newValue={newValue} setNewValue={setNewValue}
          handleSubmission={handleSubmission}
          expandedId={expandedId} setExpandedId={setExpandedId}
          deleteTransaction={deleteTransaction}
          currentType={currentType} currentTime={currentTime} currentSort={currentSort}
        />
      } />
      <Route path="/user/:name" element={<PersonDetails />} />
    </Routes>
  );
}

export default App;