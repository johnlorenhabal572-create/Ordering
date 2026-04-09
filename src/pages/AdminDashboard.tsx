import { useState, useEffect } from 'react';
import { getOrders, updateOrderStatus } from '../api/orderService';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrderList = updateOrderStatus(orderId, newStatus);
    setOrders(updatedOrderList); 
  };

  // The Search and Filter Engine
  const filteredOrders = orders.filter(order => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      order.id.toLowerCase().includes(searchLower) || 
      order.customer.name.toLowerCase().includes(searchLower);
      
    const matchesStatus = filterStatus === 'All' || order.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Processing': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Completed': return 'bg-green-100 text-green-800 border-green-300';
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Store Admin Dashboard</h1>
      
      {/* Search and Filter Controls */}
      <div className="bg-white p-4 rounded-lg shadow-sm border mb-6 flex flex-col md:flex-row gap-4">
        <input 
          type="text" 
          placeholder="Search by Order ID or Customer Name..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 border border-gray-300 p-2 rounded focus:outline-none focus:border-primary"
        />
        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:border-primary font-medium"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Manage Customer Orders</h2>
        
        {filteredOrders.length === 0 ? (
          <p className="text-gray-500 bg-gray-50 p-4 rounded text-center">No orders match your search criteria.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="p-3 text-sm font-semibold text-gray-700">Order ID</th>
                  <th className="p-3 text-sm font-semibold text-gray-700">Type</th>
                  <th className="p-3 text-sm font-semibold text-gray-700">Customer Name</th>
                  <th className="p-3 text-sm font-semibold text-gray-700">Total Amount</th>
                  <th className="p-3 text-sm font-semibold text-gray-700">Action (Status)</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-xs font-mono text-gray-500">{order.id}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        order.userEmail === 'anonymous' 
                          ? 'bg-gray-100 text-gray-600' 
                          : 'bg-primary/10 text-primary'
                      }`}>
                        {order.userEmail === 'anonymous' ? 'Customer' : 'Staff'}
                      </span>
                    </td>
                    <td className="p-3 font-medium text-gray-800">{order.customer.name}</td>
                    <td className="p-3 font-bold text-primary">₱{order.total}</td>
                    <td className="p-3">
                      <select 
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`py-1 px-2 rounded text-xs font-bold border outline-none cursor-pointer transition ${getStatusColor(order.status)}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;