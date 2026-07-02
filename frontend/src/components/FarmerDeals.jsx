import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const apiurl = import.meta.env.VITE_BACKEND_BASE_URL;

const FarmerDeals = () => {
	const navigate = useNavigate();

	const token = sessionStorage.getItem("token");

	const [loading, setLoading] = useState(true);
	const [deals, setDeals] = useState([]);

	const fetchDeals = async () => {
		try {
			setLoading(true);

			const res = await axios.get(`${apiurl}/deals/farmer`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			setDeals(res.data.deals || []);
		} catch (err) {
			console.error(err);
			alert(err.response?.data?.message || "Failed to fetch deals.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchDeals();
	}, []);

	if (loading) {
		return (
			<div className="min-h-screen flex justify-center items-center">
				Loading Incoming Deals...
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-100 pt-[80px] p-6">
			<h1 className="text-3xl font-bold mb-6">Incoming Deal Requests</h1>

			{deals.length === 0 ? (
				<div className="text-center text-gray-500 mt-10">
					No incoming deal requests.
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{deals.map((deal) => (
						<div
							key={deal._id}
							className="bg-white rounded-xl shadow-lg overflow-hidden"
						>
							<img
								src={
									deal.crop?.imageUrl ||
									"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
								}
								alt={deal.crop?.name}
								className="w-full h-52 object-cover"
							/>

							<div className="p-5">
								<h2 className="text-xl font-bold">{deal.crop?.name}</h2>

								<div className="mt-4 space-y-2">
									<p>
										Buyer :<strong> {deal.buyer?.name}</strong>
									</p>

									<p>
										Listed Price :<strong> ₹{deal.listedPrice}/kg</strong>
									</p>

									<p>
										Current Offer :
										<strong className="text-green-700">
											{" "}
											₹{deal.currentOffer}/kg
										</strong>
									</p>

									<p>
										Quantity :<strong> {deal.quantity} kg</strong>
									</p>

									<p>
										Status :
										<span className="ml-2 font-semibold text-blue-700">
											{deal.status}
										</span>
									</p>
								</div>

								<button
									onClick={() => navigate(`/deals/${deal._id}`)}
									className="mt-5 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
								>
									View Negotiation
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default FarmerDeals;
