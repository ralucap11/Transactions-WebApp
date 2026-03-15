import Form from './Form';
import Transaction from './Transaction';

const TransactionList = ({ 
  tasks, fetchTasks, loading, 
  newName, setNewName, newDate, setNewDate, newValue, setNewValue, 
  handleSubmission, expandedId, setExpandedId, deleteTransaction,
  currentType, currentTime, currentSort 
}: any) => {
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
        <button onClick={() => fetchTasks("all", currentTime, currentSort)} className="filter-btn btn-all">All</button>
        <button onClick={() => fetchTasks("income", currentTime, currentSort)} className="filter-btn btn-income">Income</button>
        <button onClick={() => fetchTasks("expense", currentTime, currentSort)} className="filter-btn btn-expense">Expenses</button>
        <select
          value={currentTime}
          onChange={(e) => {
          e.preventDefault()
          console.log(e.target.value)
          fetchTasks(currentType, e.target.value, currentSort)
          }} className="date-filter">
          <option value="all">All Time</option>
          <option value="month">Last Month</option>
          <option value="3months">Last 3 Months</option>
          <option value="6months">Last 6 Months</option>
          <option value="year">Last Year</option>
        </select>
        <select
          value={currentSort}
          onChange={(e) => {
          e.preventDefault()
          console.log(e.target.value)
          fetchTasks(currentType, currentTime, e.target.value)
          }} className='sort-filter'>
          <option value="newest">Newest</option>
          <option value="priceAsc">Ascending</option>
          <option value="priceDesc">Descending</option>
        </select>
      </div>
      <ul>
        {tasks.length === 0 && <li>No transactions found.</li>}
        {tasks.map((task: any) => (
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

export default TransactionList;