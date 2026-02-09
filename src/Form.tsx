import React from 'react';

interface FormProps {
  newName: string;
  setNewName: (val: string) => void;
  newDate: string;
  setNewDate: (val: string) => void;
  newValue: number | string;
  setNewValue: (val: number) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const Form: React.FC<FormProps> = ({ 
  newName, setNewName, newDate, setNewDate, newValue, setNewValue, onSubmit 
}) => {
  return (
    <div className="form-container" style={{ marginBottom: "20px", border: "1px solid", padding: "10px" }}>
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: '5px' }}>
          <input type="text" placeholder='Name' value={newName} onChange={(e) => setNewName(e.target.value)} required />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} required />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <input type="number" value={newValue} onChange={(e) => setNewValue(Number(e.target.value))} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <button type="submit" style={{ marginRight: '10px', backgroundColor: 'blue', color: 'white' }}>
            Add transaction
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;