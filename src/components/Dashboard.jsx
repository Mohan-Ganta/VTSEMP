import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getDashboardContent = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/dashboard', {
        headers: { 'Authorization': token }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching dashboard content');
    }
  };

  React.useEffect(() => {
    getDashboardContent();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
