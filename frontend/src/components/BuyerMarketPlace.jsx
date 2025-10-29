import React, { useEffect, useState } from "react";
import axios from "axios";

const apiurl = import.meta.env.VITE_BACKEND_BASE_URL
const BuyerMarketplace = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);
  const [requestStatuses, setRequestStatuses] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");

  // Fetch all crops
  const fetchCrops = async () => {
    try {
      const res = await axios.get(`${apiurl}/crops`, {
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
      const res = await axios.get(`${apiurl}/orders/buyer`, {
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
        `${apiurl}/contact/request`,
        { farmerId, cropId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequestStatuses((prev) => ({ ...prev, [cropId]: "pending" }));
    } catch (err) {
      alert("Contact request failed", err);
    }
  };

  const fetchContactStatus = async (farmerId, cropId) => {
    try {
      const res = await axios.get(
        `${apiurl}/contact/status/${farmerId}/${cropId}`,
        { headers: { Authorization: `Bearer ${token}` } }
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
        fetchContactStatus(p.farmer._id, p._id);
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
    const qty = Number(quantities[cropId]);
    if (qty < 100 || qty > availableQuantity) {
      alert(`Enter a quantity between 100 and ${availableQuantity}`);
      return;
    }

    try {
      await axios.post(
        `${apiurl}/orders/addorder`,
        { cropId, quantity: qty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Order placed successfully!");
      setQuantities((prev) => ({ ...prev, [cropId]: "" }));
      fetchCrops();
    } catch (err) {
      console.error("Order failed:", err);
      alert("Failed to place order.");
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen pt-[70px]">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 flex-wrap">
        <h2 className="text-2xl font-bold flex-shrink-0">
          {showOrders ? "My Orders" : "Available Farm Products"}
        </h2>

        {!showOrders && (
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full md:w-1/3 p-2 border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}

        <button
          onClick={() => {
            if (!showOrders) fetchOrders();
            setShowOrders((prev) => !prev);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
        >
          {showOrders ? "Back to Products" : "View My Orders"}
        </button>
      </div>


      {/* Orders Section */}
      {showOrders ? (
        <div>
          {orders.length === 0 ? (
            <p>No orders yet.</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.map((order) => (
                <li
                  key={order._id}
                  className="bg-white p-4 rounded shadow border"
                >
                  <p className="text-2xl font-semibold">#{order._id}</p>
                  <img
                    src={
                      order.crop?.imageUrl ||
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
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
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(filteredProducts.length === 0) ? "No Products found" :filteredProducts.map((p) => (
            <li
              key={p._id}
              className="bg-white rounded-lg shadow p-4 border hover:shadow-lg transition"
            >
              <img
                src={
                  p.imageUrl ||
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
                }
                alt={p.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <p className="text-lg font-semibold">{p.name}</p>
              <p className="text-gray-700">Available: {p.quantity} kg</p>
              <p className="text-gray-700">Price: ₹{p.price} /kg</p>
              {p.description && <p className="text-gray-700">Description: {p.description}</p>}
              <p className="text-gray-600 text-sm">
                Farmer: {p.farmer?.name || "Unknown"} | Location:{" "}
                {p.farmer?.location || "N/A"}
              </p>

              {/* Contact Request */}
              <div className="mt-2">
                {requestStatuses[p._id] === "approved" ? (
                  <p>Mobile: {p.farmer?.mobile || "Approved"}</p>
                ) : requestStatuses[p._id] === "pending" ? (
                  <p>Request sent. Waiting for farmer’s approval.</p>
                ) : (
                  <button
                    className="mt-3 bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
                    onClick={() => requestContact(p.farmer?._id, p._id)}
                  >
                    Request Farmer's Mobile Number
                  </button>
                )}
              </div>

              {/* Quantity Input */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Quantity (min 100kg):
                </label>
                <input
                  type="number"
                  value={quantities[p._id] || ""}
                  onChange={(e) =>
                    handleQuantityChange(p._id, e.target.value)
                  }
                  className="w-full border rounded p-2"
                  min={100}
                  max={p.quantity}
                  placeholder="Enter quantity in kg"
                />
              </div>

              {/* Buy Button */}
              <button
                onClick={() => handleBuy(p._id, p.quantity)}
                className="mt-3 bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700 transition"
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
