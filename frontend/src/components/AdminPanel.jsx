import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders,setOrders] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/users', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setUsers(res.data.users));
    axios.get('http://localhost:3000/crops', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setProducts(res.data.crops));
    axios.get('http://localhost:3000/orders', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setOrders(res.data.orders));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>

      <h3 className="text-lg font-semibold mb-2">All Users</h3>
      <ul className="mb-6">
        {users.map(u => (
          <li key={u._id}>{u.name} ({u.email}) - {u.role}</li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold mb-2">All Products</h3>
      <ul>
        {products.map(p => (
          <li key={p._id}>{p.name} by {p.farmer?.name} - ₹{p.price}</li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold mb-2">All Orders</h3>
      <ul className="space-y-3">
        {orders.map((order) => (
          <li
            key={order._id}
            className="border p-4 rounded shadow-sm bg-white text-sm"
          >
            <p><span className="font-semibold">Crop:</span> {order.crop?.name}</p>
            <p><span className="font-semibold">Farmer:</span> {order.farmer?.name ?? "N/A"}</p>
            <p><span className="font-semibold">Buyer:</span> {order.buyer?.name ?? "N/A"}</p>
            <p><span className="font-semibold">Quantity:</span> {order.quantity} kg</p>
            <p><span className="font-semibold">Price per kg:</span> ₹{order.crop.price}</p>
            <p><span className="font-semibold">Total:</span> ₹{order.quantity * order.crop.price}</p>
            <p><span className="font-semibold">Status:</span> {order.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;