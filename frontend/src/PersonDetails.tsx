import { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BarChart } from '@mui/x-charts/BarChart';
import { useItemHighlighted } from '@mui/x-charts';


const PersonDetails = () => {
    const { name } = useParams<{ name: string}>();
  const [data, setData] = useState<any[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");


    useEffect(() => {
        fetch(`http://localhost:5055/api/UserTransaction/user/${name}`)
        .then(res => res.json())
        .then( data => setData(data))
        .catch(err => console.error("error fetching user data", err))
    }, [name]);
     

    const filteredData = useMemo(() => {
      return data.filter(item => {
        const date = new Date(item.date);
        const itemMonth = date.getMonth().toString();
        const itemYear = date.getFullYear().toString();
        
        const monthMatch = selectedMonth === "all" || itemMonth === selectedMonth
        const yearMatch = selectedYear === "all" || itemYear === selectedYear;


        return  monthMatch && yearMatch;

      });
    }, [data, selectedMonth, selectedYear]);
  

    const availableYears = useMemo(() => {
      const startYear = 2020;
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let i = currentYear; i >=startYear; i--) {
         years.push(i.toString());
      }
      return years;
    }, []);
   
    const totals = useMemo(() => {
     return filteredData.reduce((acc, item) => {
     const val = item.transactionValue || 0;
     if( val > 0) acc.income += val;
     else acc.expense += Math.abs(val);
     return acc;
    
     }, { income: 0, expense: 0});
    }, [filteredData]);
   

return (
        <div style={{ padding: '20px', color: 'white' }}>
            <h1>Statistics for {name}</h1>

            <div style={{ marginBottom: '20px', display: 'flex', gap: '15px' }}>
                <div>
                    <label style={{ marginRight: '10px' }}>Year:</label>
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        style={{ padding: '8px', background: '#333', color: 'white', borderRadius: '4px' }}
                    >
                        <option value="all">All Years</option>
                        {availableYears?.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label style={{ marginRight: '10px' }}>Filter by Month</label>
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        style={{ padding: '8px', borderRadius: '4px', background: '#333', color: 'white', border: '1px solid #555' }}
                    >
                        <option value="all">All Months</option>
                        <option value="0">January</option>
                        <option value="1">February</option>
                        <option value="2">March</option>
                        <option value="3">April</option>
                        <option value="4">May</option>
                        <option value="5">June</option>
                        <option value="6">July</option>
                        <option value="7">August</option>
                        <option value="8">September</option>
                        <option value="9">October</option>
                        <option value="10">November</option>
                        <option value="11">December</option>
                    </select>
                </div>
            </div> 

            <div className="chart-area" style={{ height: '300px', background: '#333', margin: '20px 0' }}>
                <BarChart
                    xAxis={[{
                        scaleType: 'band',
                        data: ['Financial Overview'],
                        tickLabelStyle: { fill: 'white' }
                    }]}
                    series={[
                        { data: [totals.income], label: 'Income', color: '#4caf50' }, // Green for income
                        { data: [totals.expense], label: 'Expenses', color: '#f44336' } // Red for expenses
                    ]}
                    height={300}
                />
                <p>Chart for {filteredData.length} items</p>
            </div>
            
            <Link to="/" style={{ color: "white" }}>Back to transactions</Link>
        </div>
    );
};

export default PersonDetails;