import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import DealHeader from "./DealHeader";
import DealTimeline from "./DealTimeline";
import DealActions from "./DealActions";

const apiurl = import.meta.env.VITE_BACKEND_BASE_URL;

const DealDetails = () => {
	const { id } = useParams();

	const [deal, setDeal] = useState(null);
	const [loading, setLoading] = useState(true);

	const token = sessionStorage.getItem("token");

	const fetchDeal = async () => {
		try {
			setLoading(true);

			const res = await axios.get(`${apiurl}/deals/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			setDeal(res.data.deal);
		} catch (err) {
			console.error(err);
			alert(err.response?.data?.message || "Failed to load deal.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchDeal();
	}, []);

	if (loading) {
		return (
			<div className="min-h-screen flex justify-center items-center">
				Loading Deal...
			</div>
		);
	}

	if (!deal) {
		return (
			<div className="min-h-screen flex justify-center items-center">
				Deal Not Found
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-100 pt-[80px] p-6">
			<div className="max-w-5xl mx-auto space-y-6">
				<DealHeader deal={deal} />

				<DealTimeline deal={deal} />

				<DealActions deal={deal} refreshDeal={fetchDeal} />
			</div>
		</div>
	);
};

export default DealDetails;
