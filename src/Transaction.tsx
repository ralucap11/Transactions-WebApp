
const Transaction = ({ task, isExpanded, onToggle }: any) => {
  return (
    <li style={{ listStyle: 'none', marginBottom: '15px' }}>
      <span 
        onClick={onToggle}
        style={{ cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}
      >
        {task.name} 
      </span>
      {isExpanded && (
        <div style={{
          marginTop: '5px',
          padding: '10px',
          backgroundColor: '#222',
          borderRadius: '5px',
          border: '1px solid #444'
        }}>
          <p style={{ margin: '5px 0', color: 'white' }}>
            Value: 
            <span style={{ 
              marginLeft: '5px',
              fontWeight: 'bold',
              color: task.transactionValue >= 0 ? 'green' : 'red' 
            }}>
              {task.transactionValue >= 0 ? '+' : ''}{task.transactionValue}
            </span>
          </p>
          <p style={{ margin: '5px 0' }}>
            Date: {new Date(task.date).toLocaleDateString()}
          </p> 
        </div>
      )}  
    </li>
  );
};

export default Transaction;