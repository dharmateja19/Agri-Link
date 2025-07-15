import React, { useEffect, useState } from "react";
import axios from "axios";

const BuyerMarketplace = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);
  const [requestStatuses, setRequestStatuses] = useState({});

  const token = localStorage.getItem("token");

  // Fetch all crops
  const fetchCrops = async () => {
    try {
      const res = await axios.get("http://localhost:3000/crops", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data.crops || res.data);
    } catch (err) {
      console.error("Error fetching crops:", err);
    }
  };

  // Fetch all orders placed by buyer
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/orders/buyer", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const requestContact = async (farmerId, cropId) => {
    try {
      await axios.post(
        "http://localhost:3000/contact/request",
        {
          farmerId,
          cropId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRequestStatuses((prev) => ({ ...prev, [cropId]: "pending" }));
    } catch (err) {
      alert("Contact request failed");
    }
  };

  const fetchContactStatus = async (farmerId, cropId) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/contact/status/${farmerId}/${cropId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRequestStatuses((prev) => ({
        ...prev,
        [cropId]: res.data?.status || "none",
      }));
    } catch (err) {
      console.error("Error fetching contact status", err);
    }
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  useEffect(() => {
    products.forEach((p) => {
      if (p.farmer?._id && p._id) {
        fetchContactStatus(p.farmer?._id, p._id);
      }
    });
  }, [products]);

  const handleQuantityChange = (cropId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [cropId]: value,
    }));
  };

  const handleBuy = async (cropId, availableQuantity) => {
    console.log("i am inside handleBuy");

    const qty = Number(quantities[cropId]);
    if (qty < 1000 || qty > availableQuantity) {
      alert(`Enter a quantity between 1000 and ${availableQuantity}`);
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/orders/addorder",
        {
          cropId,
          quantity: qty,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Order placed successfully!");
      setQuantities((prev) => ({ ...prev, [cropId]: "" }));
      fetchCrops(); // refresh available quantities
    } catch (err) {
      console.error("Order failed:", err);
      alert("Failed to place order.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {showOrders ? "My Orders" : "Available Farm Products"}
        </h2>
        <button
          onClick={() => {
            if (!showOrders) fetchOrders();
            setShowOrders((prev) => !prev);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {showOrders ? "Back to Products" : "View My Orders"}
        </button>
      </div>

      {showOrders ? (
        <div>
          {orders.length === 0 ? (
            <p>No orders yet.</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {orders.map((order) => (
                <li
                  key={order._id}
                  className="bg-white p-4 rounded shadow border"
                >
                  <img
                    src={
                      order.crop?.imageUrl ||
                      "https://via.placeholder.com/400x250.png?text=No+Image"
                    }
                    alt={order.crop?.name}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                  <p className="text-lg font-semibold">{order.crop?.name}</p>
                  <p className="text-gray-700">Quantity: {order.quantity} kg</p>
                  <p className="text-gray-700">
                    Total Price: ₹{order.totalPrice}
                  </p>
                  <p className="text-gray-600">
                    Status: <span className="capitalize">{order.status}</span>
                  </p>
                  <p className="text-gray-600">
                    Farmer: {order.farmer?.name || "N/A"}
                  </p>
                  <p className="text-gray-600">
                    Location: {order.farmer?.location || "N/A"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((p) => (
            <li key={p._id} className="bg-white rounded-lg shadow p-4 border">
              <img
                src={
                  p.imageUrl ||
                  "https://via.placeholder.com/400x250.png?text=No+Image"
                }
                alt={p.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <p className="text-lg font-semibold">{p.name}</p>
              <p className="text-gray-700">Available: {p.quantity} kg</p>
              <p className="text-gray-700">Price: ₹{p.price} /kg</p>
              <p className="text-gray-600 text-sm">
                Farmer: {p.farmer?.name || "Unknown"} | Location:{" "}
                {p.farmer?.location || "N/A"}
              </p>
              <>
                {requestStatuses[p._id] === "approved" ? (
                  <p>Mobile: {p.farmer?.mobile || "Approved"}</p>
                ) : requestStatuses[p._id] === "pending" ? (
                  <p>Request sent. Waiting for farmer’s approval.</p>
                ) : (
                  <button
                    className="mt-3 bg-blue-600 text-white px-4 py-2 rounded w-full"
                    onClick={() => requestContact(p.farmer?._id, p._id)}
                  >
                    Request Farmer's Mobile Number
                  </button>
                )}
              </>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Quantity (min 1000kg):
                </label>
                <input
                  type="number"
                  value={quantities[p._id] || ""}
                  onChange={(e) => handleQuantityChange(p._id, e.target.value)}
                  className="w-full border rounded p-2"
                  min={1000}
                  max={p.quantity}
                  placeholder="Enter quantity in kg"
                />
              </div>

              <button
                onClick={() => handleBuy(p._id, p.quantity)}
                className="mt-3 bg-green-600 text-white px-4 py-2 rounded w-full"
              >
                Buy
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BuyerMarketplace;
