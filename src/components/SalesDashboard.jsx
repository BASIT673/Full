// import React, { useState, useEffect } from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// const SalesDashboard = () => {
//   const [sales, setSales] = useState([]);
//   const [filteredSales, setFilteredSales] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterPeriod, setFilterPeriod] = useState('all');
//   const [monthlyRevenue, setMonthlyRevenue] = useState([]);

//   useEffect(() => {
//     fetchSales();
//   }, []);

//   const fetchSales = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/admin/sales');
//       const data = await response.json();
//       setSales(data);
//       setFilteredSales(data);
//       processMonthlyRevenue(data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching sales:', error);
//       setLoading(false);
//     }
//   };

//   const processMonthlyRevenue = (salesData) => {
//     const monthly = salesData.reduce((acc, sale) => {
//       const date = new Date(sale.createdAt);
//       const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      
//       if (!acc[monthYear]) {
//         acc[monthYear] = 0;
//       }
//       acc[monthYear] += sale.amount;
//       return acc;
//     }, {});

//     const chartData = Object.entries(monthly).map(([month, amount]) => ({
//       month,
//       amount: amount / 100 // Converting from paise to INR
//     }));

//     setMonthlyRevenue(chartData);
//   };

//   const filterSales = () => {
//     let filtered = [...sales];

//     // Apply search filter
//     if (searchTerm) {
//       filtered = filtered.filter(sale => 
//         sale.packageDetails.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         sale.razorpay_payment_id.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Apply time period filter
//     if (filterPeriod !== 'all') {
//       const now = new Date();
//       const periods = {
//         'today': 1,
//         'week': 7,
//         'month': 30,
//         'year': 365
//       };
      
//       filtered = filtered.filter(sale => {
//         const saleDate = new Date(sale.createdAt);
//         const diffTime = Math.abs(now - saleDate);
//         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//         return diffDays <= periods[filterPeriod];
//       });
//     }

//     setFilteredSales(filtered);
//   };

//   useEffect(() => {
//     filterSales();
//   }, [searchTerm, filterPeriod]);

//   const calculateTotalRevenue = () => {
//     return filteredSales.reduce((total, sale) => total + sale.amount, 0) / 100;
//   };

//   if (loading) {
//     return <div style={{ padding: '1rem' }}>Loading sales data...</div>;
//   }

//   return (
//     <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//       {/* Revenue Overview Card */}
//       <div style={{ border: '1px solid #e2e8f0', borderRadius: '0.5rem', padding: '1rem' }}>
//         <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Revenue Overview</h2>
//         <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>₹{calculateTotalRevenue().toLocaleString()}</div>
//         <div style={{ height: '16rem', marginTop: '1rem' }}>
//           <BarChart width={800} height={200} data={monthlyRevenue}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="amount" fill="#3b82f6" name="Revenue (INR)" />
//           </BarChart>
//         </div>
//       </div>

//       {/* Filters */}
//       <div style={{ display: 'flex', gap: '1rem' }}>
//         <input
//           type="text"
//           placeholder="Search by tour name or payment ID"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           style={{ maxWidth: '24rem', padding: '0.5rem', border: '1px solid #e2e8f0', borderRadius: '0.25rem' }}
//         />
//         <select
//           value={filterPeriod}
//           onChange={(e) => setFilterPeriod(e.target.value)}
//           style={{ width: '12rem', padding: '0.5rem', border: '1px solid #e2e8f0', borderRadius: '0.25rem' }}
//         >
//           <option value="all">All Time</option>
//           <option value="today">Today</option>
//           <option value="week">This Week</option>
//           <option value="month">This Month</option>
//           <option value="year">This Year</option>
//         </select>
//       </div>

//       {/* Sales Table */}
//       <div style={{ border: '1px solid #e2e8f0', borderRadius: '0.5rem', padding: '1rem' }}>
//         <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Sales Transactions</h2>
//         <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//           <thead>
//             <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
//               <th style={{ padding: '0.75rem', textAlign: 'left' }}>Date</th>
//               <th style={{ padding: '0.75rem', textAlign: 'left' }}>Tour Name</th>
//               <th style={{ padding: '0.75rem', textAlign: 'left' }}>Payment ID</th>
//               <th style={{ padding: '0.75rem', textAlign: 'left' }}>Amount</th>
//               <th style={{ padding: '0.75rem', textAlign: 'left' }}>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredSales.map((sale) => (
//               <tr key={sale.razorpay_payment_id} style={{ borderBottom: '1px solid #e2e8f0' }}>
//                 <td style={{ padding: '0.75rem' }}>
//                   {new Date(sale.createdAt).toLocaleDateString()}
//                 </td>
//                 <td style={{ padding: '0.75rem' }}>{sale.packageDetails.name}</td>
//                 <td style={{ padding: '0.75rem' }}>{sale.razorpay_payment_id}</td>
//                 <td style={{ padding: '0.75rem' }}>₹{(sale.amount / 100).toLocaleString()}</td>
//                 <td style={{ padding: '0.75rem' }}>
//                   <span style={{
//                     padding: '0.25rem 0.5rem',
//                     borderRadius: '9999px',
//                     fontSize: '0.875rem',
//                     backgroundColor: sale.status === 'successful' ? '#dcfce7' : '#fee2e2',
//                     color: sale.status === 'successful' ? '#166534' : '#991b1b'
//                   }}>
//                     {sale.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };



// export default SalesDashboard;


// import React, { useState, useEffect } from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// const SalesDashboard = () => {
//   const [sales, setSales] = useState([]);
//   const [filteredSales, setFilteredSales] = useState([]); // Ensure this is always an array
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterPeriod, setFilterPeriod] = useState('all');
//   const [monthlyRevenue, setMonthlyRevenue] = useState([]);

//   useEffect(() => {
//     fetchSales();
//   }, []);

// const fetchSales = async () => {
//   try {
//     const response = await fetch('http://localhost:5000/api/admin/sales');
//     console.log("Raw API Response:", response);

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log("Parsed API Data:", data);

//     // Extract the correct sales array from the response
//     const salesArray = data?.data?.sales || [];

//     console.log("Api response:", salesArray);

//     setSales(salesArray);
//     setFilteredSales(salesArray);
//     processMonthlyRevenue(salesArray);
//   } catch (error) {
//     console.error('Error fetching sales:', error);
//     setSales([]);
//     setFilteredSales([]);
//   } finally {
//     setLoading(false);
//   }
// };


//   const processMonthlyRevenue = (salesData) => {
//     const monthly = salesData.reduce((acc, sale) => {
//       const date = new Date(sale.createdAt);
//       const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      
//       if (!acc[monthYear]) {
//         acc[monthYear] = 0;
//       }
//       acc[monthYear] += sale.amount;
//       return acc;
//     }, {});

//     const chartData = Object.entries(monthly).map(([month, amount]) => ({
//       month,
//       amount: amount / 100 // Converting from paise to INR
//     }));

//     setMonthlyRevenue(chartData);
//   };

//   const filterSales = () => {
//     let filtered = [...sales];

//     // Apply search filter
//     if (searchTerm) {
//       filtered = filtered.filter(sale => 
//         sale.packageDetails.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         sale.razorpay_payment_id.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Apply time period filter
//     if (filterPeriod !== 'all') {
//       const now = new Date();
//       const periods = {
//         'today': 1,
//         'week': 7,
//         'month': 30,
//         'year': 365
//       };
      
//       filtered = filtered.filter(sale => {
//         const saleDate = new Date(sale.createdAt);
//         const diffTime = Math.abs(now - saleDate);
//         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//         return diffDays <= periods[filterPeriod];
//       });
//     }

//     setFilteredSales(filtered);
//   };

//   useEffect(() => {
//     filterSales();
//   }, [searchTerm, filterPeriod]);

//   const calculateTotalRevenue = () => {
//     if (!Array.isArray(filteredSales)) {
//       return 0; // Return 0 if filteredSales is not an array
//     }
//     return filteredSales.reduce((total, sale) => total + sale.amount, 0) / 100;
//   };

//   if (loading) {
//     return <div style={{ padding: '1rem' }}>Loading sales data...</div>;
//   }

//   return (
//     <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//       {/* Revenue Overview Card */}
//       <div style={{ border: '1px solid #e2e8f0', borderRadius: '0.5rem', padding: '1rem' }}>
//         <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Revenue Overview</h2>
//         <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>₹{calculateTotalRevenue().toLocaleString()}</div>
//         <div style={{ height: '16rem', marginTop: '1rem' }}>
//           <BarChart width={800} height={200} data={monthlyRevenue}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="amount" fill="#3b82f6" name="Revenue (INR)" />
//           </BarChart>
//         </div>
//       </div>

//       {/* Filters */}
//       <div style={{ display: 'flex', gap: '1rem' }}>
//         <input
//           type="text"
//           placeholder="Search by tour name or payment ID"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           style={{ maxWidth: '24rem', padding: '0.5rem', border: '1px solid #e2e8f0', borderRadius: '0.25rem' }}
//         />
//         <select
//           value={filterPeriod}
//           onChange={(e) => setFilterPeriod(e.target.value)}
//           style={{ width: '12rem', padding: '0.5rem', border: '1px solid #e2e8f0', borderRadius: '0.25rem' }}
//         >
//           <option value="all">All Time</option>
//           <option value="today">Today</option>
//           <option value="week">This Week</option>
//           <option value="month">This Month</option>
//           <option value="year">This Year</option>
//         </select>
//       </div>

//       {/* Sales Table */}
//       <div style={{ border: '1px solid #e2e8f0', borderRadius: '0.5rem', padding: '1rem' }}>
//         <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Sales Transactions</h2>
//         <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//           <thead>
//             <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
//               <th style={{ padding: '0.75rem', textAlign: 'left' }}>Date</th>
//               <th style={{ padding: '0.75rem', textAlign: 'left' }}>Tour Name</th>
//               <th style={{ padding: '0.75rem', textAlign: 'left' }}>Payment ID</th>
//               <th style={{ padding: '0.75rem', textAlign: 'left' }}>Amount</th>
//               <th style={{ padding: '0.75rem', textAlign: 'left' }}>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredSales.map((sale) => (
//               <tr key={sale.razorpay_payment_id} style={{ borderBottom: '1px solid #e2e8f0' }}>
//                 <td style={{ padding: '0.75rem' }}>
//                   {new Date(sale.createdAt).toLocaleDateString()}
//                 </td>
//                 <td style={{ padding: '0.75rem' }}>{sale.packageDetails.name}</td>
//                 <td style={{ padding: '0.75rem' }}>{sale.razorpay_payment_id}</td>
//                 <td style={{ padding: '0.75rem' }}>₹{(sale.amount / 100).toLocaleString()}</td>
//                 <td style={{ padding: '0.75rem' }}>
//                   <span style={{
//                     padding: '0.25rem 0.5rem',
//                     borderRadius: '9999px',
//                     fontSize: '0.875rem',
//                     backgroundColor: sale.status === 'successful' ? '#dcfce7' : '#fee2e2',
//                     color: sale.status === 'successful' ? '#166534' : '#991b1b'
//                   }}>
//                     {sale.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default SalesDashboard;


import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const SalesDashboard = () => {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPeriod, setFilterPeriod] = useState('all');
  useEffect(() => {
        fetchSales();
      }, []);
  const fetchSales = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/sales');
      console.log("Raw API Response:", response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Parsed API Data:", data);

      // Extract the correct sales array from the response
      const salesArray = data?.data?.sales || [];

      console.log("Api response:", salesArray);

      setSales(salesArray);
      setFilteredSales(salesArray);
      processMonthlyRevenue(salesArray);
    } catch (error) {
      console.error('Error fetching sales:', error);
      setSales([]);
      setFilteredSales([]);
    } finally {
      setLoading(false);
    }
  };

  const processMonthlyRevenue = (salesData) => {
    const monthly = salesData.reduce((acc, sale) => {
      const date = new Date(sale.createdAt);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      
      if (!acc[monthYear]) {
        acc[monthYear] = 0;
      }
      acc[monthYear] += sale.amount;
      return acc;
    }, {});

    const chartData = Object.entries(monthly).map(([month, amount]) => ({
      month,
      amount: amount / 100 // Converting from paise to INR
    }));

    setMonthlyRevenue(chartData);
  };

  const filterSales = () => {
    let filtered = [...sales];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(sale => 
        sale.packageDetails?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.razorpay_payment_id?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply time period filter
    if (filterPeriod !== 'all') {
      const now = new Date();
      const periods = {
        'today': 1,
        'week': 7,
        'month': 30,
        'year': 365
      };
      
      filtered = filtered.filter(sale => {
        const saleDate = new Date(sale.createdAt);
        const diffTime = Math.abs(now - saleDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= periods[filterPeriod];
      });
    }

    setFilteredSales(filtered);
  };

  useEffect(() => {
    filterSales();
  }, [searchTerm, filterPeriod]);

  const calculateTotalRevenue = () => {
    if (!Array.isArray(filteredSales)) {
      return 0; // Return 0 if filteredSales is not an array
    }
    return filteredSales.reduce((total, sale) => total + sale.amount, 0) / 100;
  };

  if (loading) {
    return <div style={{ padding: '1rem' }}>Loading sales data...</div>;
  }

  return (
    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Revenue Overview Card */}
      <div style={{ border: '1px solid #e2e8f0', borderRadius: '0.5rem', padding: '1rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Revenue Overview</h2>
        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>₹{calculateTotalRevenue().toLocaleString()}</div>
        <div style={{ height: '16rem', marginTop: '1rem' }}>
          <BarChart width={800} height={200} data={monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#3b82f6" name="Revenue (INR)" />
          </BarChart>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Search by tour name or payment ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: '24rem', padding: '0.5rem', border: '1px solid #e2e8f0', borderRadius: '0.25rem' }}
        />
        <select
          value={filterPeriod}
          onChange={(e) => setFilterPeriod(e.target.value)}
          style={{ width: '12rem', padding: '0.5rem', border: '1px solid #e2e8f0', borderRadius: '0.25rem' }}
        >
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Sales Table */}
      <div style={{ border: '1px solid #e2e8f0', borderRadius: '0.5rem', padding: '1rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Sales Transactions</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Date</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Tour Name</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Payment ID</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Amount</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((sale) => (
              <tr key={sale.razorpay_payment_id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '0.75rem' }}>
                  {new Date(sale.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: '0.75rem' }}>{sale.packageDetails?.name || 'N/A'}</td>
                <td style={{ padding: '0.75rem' }}>{sale.razorpay_payment_id || 'N/A'}</td>
                <td style={{ padding: '0.75rem' }}>₹{(sale.amount / 100).toLocaleString()}</td>
                <td style={{ padding: '0.75rem' }}>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    backgroundColor: sale.status === 'successful' ? '#dcfce7' : '#fee2e2',
                    color: sale.status === 'successful' ? '#166534' : '#991b1b'
                  }}>
                    {sale.status || 'N/A'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesDashboard;




