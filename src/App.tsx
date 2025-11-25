import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

interface UserTransaction {
  id: number;
  name: string;
  transactionValue: boolean;
  date: Date;
}

const API_URL = "http://localhost:5055/api/UserTransaction";

function App()
{
  const [tasks, setTasks] = useState<UserTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [newValue, setNewValue] = useState(0);
  const [newDate, setNewDate] = useState("");

  
    const fetchTasks = async () => {
      try {
        const response =  await axios.get(API_URL);
        setTasks(response.data);
      }catch(error){
        console.error("error at taking tasks", error);
      } finally{
        setLoading(false);
      }
  };
     
  const handleSubmission = async (e : React.FormEvent) => {
   e.preventDefault(); //prevents the page from refreshing automatically

   try{
    await axios.post(API_URL, {
     name: newName,
     transactionValue : newValue,
     date: newDate
    });

    setNewName("");
    setNewDate("");

    fetchTasks();   //refresh the list
   }catch(error) {
    console.error("error posting data", error);
   }
  }
  useEffect(() => {
    fetchTasks();
  }, []);
    

  if(loading) {
    return <div>The data from API is loading...</div>
  }
  return (
    <div className='App'>
      <h1>Transactions Form</h1>
      <div className="form-container" style={{marginBottom: "20px", border: "1px solid", padding: "10px"}}>
     <form onSubmit = {handleSubmission}>
      <div style={{marginBottom: '5px'}}>
        <input
        type="text"
        placeholder='Name'
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        required
        />
      </div>
    
         <div style = {{marginBottom: '5px'}}>
          <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          required
          />
         </div>
           <div style={{marginBottom: '5px'}}>
          <input
        type="number"
        value={newValue}
        onChange={(e) => {
          setNewValue(Number(e.target.value));
        }}
        />
         </div>
       
         <div style={{marginBottom: '20px'}}>
        <button type="submit" style={{marginRight: '10px'}}>
            Add transaction
        </button>
      </div>
        
         </form>
     </div>
      
      <ul>
        {tasks.length === 0 && <li></li>}
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name} - {task.transactionValue ? "true" : "false"}
          </li>
        ))}
      </ul>
    </div>
  );
  
}

export default App;