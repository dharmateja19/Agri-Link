import React, { useEffect, useState } from "react";
import axios from "axios";

const FarmerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("crops");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [cropForm, setCropForm] = useState({
    name: "",
    quantity: "",
    price: "",
    imageUrl: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (activeTab === "crops") fetchCrops();
    else if (activeTab === "orders") fetchOrders();
    else if (activeTab === "requests") fetchRequests();
  }, [activeTab]);

  const fetchCrops = async () => {
    try {
      const res = await axios.get("http://localhost:3000/crops/farmer", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data.crops);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/orders/farmer", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data.orders);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:3000/contact/farmer", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data.requests);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCrop = async () => {
    const {name, quantity , price} = cropForm
    if (!name || !quantity || !price ) {
      alert("All fields are required.");
      return;
    }
    try {
      await axios.post("http://localhost:3000/crops/addcrop", cropForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowAddModal(false);
      fetchCrops();
      setCropForm({ name: "", quantity: "", price: "", imageUrl: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateCrop = async () => {
    try {
      await axios.put(
        `http://localhost:3000/crops/updatecrop/${selectedCrop._id}`,
        cropForm,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setShowUpdateModal(false);
      fetchCrops();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/crops/deletecrop/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCrops();
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:3000/orders/updateorder/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Status updated to ${newStatus}`);
      fetchOrders();
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to update status";
      alert(msg);
    }
  };

  const handleRequestResponse = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:3000/contact/respond/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const openUpdateModal = (crop) => {
    setSelectedCrop(crop);
    setCropForm({
      name: crop.name,
      quantity: crop.quantity,
      price: crop.price,
      imageUrl: crop.imageUrl,
    });
    setShowUpdateModal(true);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen relative z-0 pt-[70px]">
      <div className="flex justify-between items-center mb-6">
        <div className="space-x-4">
          <button
            onClick={() => setActiveTab("crops")}
            className={`px-4 py-2 rounded ${
              activeTab === "crops"
                ? "bg-blue-600 text-white"
                : "bg-white border"
            }`}
          >
            Crops
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded ${
              activeTab === "orders"
                ? "bg-blue-600 text-white"
                : "bg-white border"
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab("requests")}
            className={`px-4 py-2 rounded ${
              activeTab === "requests"
                ? "bg-blue-600 text-white"
                : "bg-white border"
            }`}
          >
            Requests
          </button>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded shadow"
        >
          Add Crop
        </button>
      </div>

      {/* CROPS VIEW */}
      {activeTab === "crops" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl shadow-md border hover:shadow-lg transition"
            >
              <img
                src={
                  p.imageUrl ||
                  "https://via.placeholder.com/400x250.png?text=No+Image"
                }
                className="w-full h-48 object-cover"
                alt={p.name}
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p>Quantity: {p.quantity} kg</p>
                <p>Price: ₹{p.price}</p>
                <div className="mt-4 space-x-2">
                  <button
                    onClick={() => openUpdateModal(p)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ORDERS VIEW */}
      {activeTab === "orders" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-4 rounded shadow border">
              <img
                src={
                  order.crop?.imageUrl ||
                  "https://via.placeholder.com/400x250.png?text=No+Image"
                }
                alt={order.crop?.name}
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <p>
                <strong>Buyer:</strong> {order.buyer?.name || "Unknown"}
              </p>
              <p>
                <strong>Crop:</strong> {order.crop?.name}
              </p>
              <p>
                <strong>Quantity:</strong> {order.quantity} kg
              </p>
              <p>
                <strong>Total Price:</strong> ₹{order.totalPrice}
              </p>
              <div className="mt-2">
                <label className="text-sm font-medium text-gray-700 mr-2">
                  Status:
                </label>
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusUpdate(order._id, e.target.value)
                  }
                  className="border p-1 rounded"
                >
                  {[
                    "pending",
                    "confirmed",
                    "shipped",
                    "delivered",
                    "cancelled",
                  ].map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* REQUESTS VIEW */}
      {activeTab === "requests" && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {requests.map((req) => (
            <div key={req._id} className="bg-white p-4 rounded shadow border">
              <p>
                <strong>Buyer:</strong> {req.buyer?.name}
              </p>
              <p>
                <strong>Crop:</strong> {req.crop?.name}
              </p>
              <p>
                <strong>Status:</strong> {req.status}
              </p>
              {req.status === "pending" && (
                <div className="space-x-2 mt-2">
                  <button
                    onClick={() => handleRequestResponse(req._id, "approved")}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleRequestResponse(req._id, "rejected")}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ADD CROP MODAL */}
      {showAddModal && (
        <div className="fixed backdrop-blur-sm inset-0 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Add New Crop</h3>
            <CropForm
              form={cropForm}
              setForm={setCropForm}
              onCancel={() => {
                setShowAddModal(false),
                  setCropForm({
                    name: "",
                    quantity: "",
                    price: "",
                    imageUrl: "",
                  });
              }}
              onSubmit={handleAddCrop}
            />
          </div>
        </div>
      )}

      {/* UPDATE CROP MODAL */}
      {showUpdateModal && (
        <div className="fixed backdrop-blur-sm inset-0 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Update Crop</h3>
            <CropForm
              form={cropForm}
              setForm={setCropForm}
              onCancel={() => {
                setShowUpdateModal(false);
                setCropForm({
                  name: "",
                  quantity: "",
                  price: "",
                  imageUrl: "",
                });
              }}
              onSubmit={handleUpdateCrop}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const CropForm = ({ form, setForm, onCancel, onSubmit }) => (
  <>
    <input
      type="text"
      placeholder="Crop Name"
      className="w-full p-2 mb-3 border rounded"
      value={form.name}
      onChange={(e) => setForm({ ...form, name: e.target.value })}
      required
    />
    <input
      type="number"
      placeholder="Quantity (kg)"
      className="w-full p-2 mb-3 border rounded"
      value={form.quantity}
      onChange={(e) => setForm({ ...form, quantity: e.target.value })}
      required
    />
    <input
      type="number"
      placeholder="Price (₹)"
      className="w-full p-2 mb-3 border rounded"
      value={form.price}
      onChange={(e) => setForm({ ...form, price: e.target.value })}
      required
    />
    <input
      type="text"
      placeholder="Image URL"
      className="w-full p-2 mb-4 border rounded"
      value={form.imageUrl}
      onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
    />
    <div className="flex justify-end space-x-3">
      <button
        onClick={onCancel}
        className="px-4 py-2 bg-gray-400 text-white rounded"
      >
        Cancel
      </button>
      <button
        onClick={onSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Submit
      </button>
    </div>
  </>
);

export default FarmerDashboard;
