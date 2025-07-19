import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:3000/users`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setUsers(res.data.users));
    axios.get(`http://localhost:3000/crops`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setProducts(res.data.crops));
    axios.get(`http://localhost:3000/orders`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setOrders(res.data.orders));
  }, []);

  const filteredUsers = users.filter(u => u.role !== 'admin');

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h2>

      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-gray-600">Total Users </p>
          <p className="text-2xl font-bold text-green-600">{filteredUsers.length}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-gray-600">Crops Listed</p>
          <p className="text-2xl font-bold text-blue-600">{products.length}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-gray-600">Orders Placed</p>
          <p className="text-2xl font-bold text-purple-600">{orders.length}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-6">
        {['users', 'crops', 'orders'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 mx-2 rounded-full font-medium 
              ${activeTab === tab ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border'} 
              transition-all duration-300`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'users' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredUsers.map(u => (
            <div key={u._id} className="bg-white p-4 rounded-xl shadow">
              <h3 className="font-bold text-lg">{u.name}</h3>
              <p>Email: {u.email}</p>
              <p>Mobile: {u.mobile}</p>
              <p>Role: {u.role}</p>
              <p>Location: {u.location || 'N/A'}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'crops' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map(p => (
            <div key={p._id} className="bg-white p-4 rounded-xl shadow">
              {p.imageUrl && <img src={p.imageUrl} alt={p.name} className="h-40 w-full object-cover rounded mb-3" />}
              <h3 className="font-bold text-lg">{p.name}</h3>
              <p>Price: ₹{p.price} /kg</p>
              <p>Quantity: {p.quantity} kg</p>
              <p>Farmer: {p.farmer?.name || 'N/A'}</p>
              <p>Location: {p.farmer?.location || 'N/A'}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {orders.map(order => (
            <div key={order._id} className="bg-white p-4 rounded-xl shadow">
              {order.crop?.imageUrl && (
                <img src={order.crop.imageUrl} alt={order.crop.name} className="h-32 w-full object-cover rounded mb-3" />
              )}
              <h3 className="font-bold text-lg">{order.crop?.name}</h3>
              <p>Farmer: {order.farmer?.name || 'N/A'}</p>
              <p>Buyer: {order.buyer?.name || 'N/A'}</p>
              <p>Quantity: {order.quantity} kg</p>
              <p>Total Price: ₹{order.totalPrice}</p>
              <p>Status: <span className="font-semibold">{order.status}</span></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
