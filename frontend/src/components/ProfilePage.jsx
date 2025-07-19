import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [crops, setCrops] = useState([]);
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  const fetchUser = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
    } catch (err) {
      console.error("Failed to fetch user profile", err);
    }
  };

  const fetchCrops = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/crops/farmer`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCrops(res.data.crops || []);
    } catch (err) {
      console.error("Error fetching crops", err);
    }
  };

  const fetchOrders = async () => {
    try {
      const url =
        user?.role === "farmer"
          ? `http://localhost:3000/orders/farmer`
          : `http://localhost:3000/orders/buyer`;
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      if (user.role === "farmer") fetchCrops();
      fetchOrders();
    }
  }, [user]);

  if (!user) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-green-700">My Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-lg">
          <div className="space-y-2">
            <p><span className="font-semibold">Name:</span> {user.name}</p>
            <p><span className="font-semibold">Mobile:</span> {user.mobile}</p>
            <p><span className="font-semibold">Email:</span> {user.email || "N/A"}</p>
            <p><span className="font-semibold">Location:</span> {user.location || "N/A"}</p>
            <p><span className="font-semibold">Role:</span> {user.role}</p>
          </div>

          <div className="space-y-4">
            {user.role === "farmer" && (
              <>
                <div className="bg-green-100 p-4 rounded-xl shadow text-center">
                  <p className="text-xl font-bold text-green-800">{crops.length}</p>
                  <p className="text-sm">Crops Listed</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-xl shadow text-center">
                  <p className="text-xl font-bold text-yellow-800">{orders.length}</p>
                  <p className="text-sm">Orders Received</p>
                </div>
              </>
            )}
            {user.role === "buyer" && (
              <div className="bg-blue-100 p-4 rounded-xl shadow text-center">
                <p className="text-xl font-bold text-blue-800">{orders.length}</p>
                <p className="text-sm">Total Orders Placed</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
