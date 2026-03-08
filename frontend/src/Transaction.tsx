import { Link } from 'react-router-dom';

const Transaction = ({ task, isExpanded, onToggle, onDelete }: any) => {
  return (
    <li style={{ listStyle: 'none', marginBottom: '15px' }}>
      <Link 
        to={`/user/${task.name}`} 
        style={{ 
          cursor: 'pointer', 
          fontWeight: 'bold', 
          textDecoration: 'underline',
          color: 'white' 
        }}
      >
        {task.name} 
      </Link>
      
      <span onClick={onToggle} style={{ cursor: 'pointer', marginLeft: '10px' }}>
        {isExpanded ? '▲' : '▼'}
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
          <button
            onClick={(e) => {
              e.stopPropagation();
              if(window.confirm("Are you sure you want to delete this transaction?")) onDelete(task.id);
            }}
            style={{
              backgroundColor: 'red',
              color: 'black',
              border: 'none',
              borderRadius: '4px',
              padding: '2px 8px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Delete
          </button>
        </div>
      )}  
    </li>
  );
};

export default Transaction;