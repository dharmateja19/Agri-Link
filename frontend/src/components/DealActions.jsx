import React, { useEffect, useState } from "react";
import axios from "axios";
import CounterOfferModal from "./CounterOfferModal";
import ActionCard from "./ActionCard";
import StatusBadge from "./StatusBadge";
import ContactActions from "./ContactActions";
import NegotiationActions from "./NegotiationActions";
import CompletionActions from "./CompletionActions";

const apiurl = import.meta.env.VITE_BACKEND_BASE_URL;

const DealActions = ({ deal, refreshDeal }) => {
	const token = sessionStorage.getItem("token");
	const user = JSON.parse(sessionStorage.getItem("user"));
	const userId = user?.id;

	const [showCounterModal, setShowCounterModal] = useState(false);
	const [loading, setLoading] = useState(false);

	const isBuyer = deal.buyer?._id === userId;
	const isFarmer = deal.farmer?._id === userId;

	const lastOffer = deal.offers[deal.offers.length - 1];

	const isMyTurn = lastOffer?.offeredBy?._id !== userId;

	const [contactStatus, setContactStatus] = useState("NONE");
	const [requestId, setRequestId] = useState(null);
	const [farmerMobile, setFarmerMobile] = useState("");
	const [contactLoading, setContactLoading] = useState(false);

	const updateDeal = async (decision) => {
		try {
			setLoading(true);

			await axios.patch(
				`${apiurl}/deals/${deal._id}/respond`,
				{
					decision,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			refreshDeal();
		} catch (err) {
			alert(err.response?.data?.message);
		} finally {
			setLoading(false);
		}
	};

	const fetchContactStatus = async () => {
		try {
			const res = await axios.get(`${apiurl}/contact/status/deal/${deal._id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			setContactStatus((res.data.status || "NONE").toUpperCase());
			setRequestId(res.data.requestId || null);
			setFarmerMobile(res.data.mobile || "");
		} catch (err) {
			console.error("Failed to fetch contact status:", err);
		}
	};

	useEffect(() => {
		if (deal?._id) {
			fetchContactStatus();
		}
	}, [deal]);

	const requestContact = async () => {
		try {
			setContactLoading(true);

			await axios.post(
				`${apiurl}/contact/request`,
				{
					farmerId: deal.farmer._id,
					cropId: deal.crop._id,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			await fetchContactStatus();
		} catch (err) {
			alert(err.response?.data?.message || "Failed to send contact request.");
		} finally {
			setContactLoading(false);
		}
	};

	const approveContact = async () => {
		try {
			setContactLoading(true);

			await axios.put(
				`${apiurl}/contact/respond/${requestId}`,
				{
					status: "approved",
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			await fetchContactStatus();
		} catch (err) {
			alert(err.response?.data?.message || "Failed to approve request.");
		} finally {
			setContactLoading(false);
		}
	};

	const rejectContact = async () => {
		try {
			setContactLoading(true);

			await axios.put(
				`${apiurl}/contact/respond/${requestId}`,
				{
					status: "rejected",
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			await fetchContactStatus();
		} catch (err) {
			alert(err.response?.data?.message || "Failed to reject request.");
		} finally {
			setContactLoading(false);
		}
	};

	const requestCompletion = async () => {
		try {
			await axios.patch(
				`${apiurl}/deals/${deal._id}/request-completion`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			refreshDeal();
		} catch (err) {
			alert(err.response?.data?.message);
		}
	};

	const confirmCompletion = async () => {
		try {
			await axios.patch(
				`${apiurl}/deals/${deal._id}/confirm-completion`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			refreshDeal();
		} catch (err) {
			alert(err.response?.data?.message);
		}
	};

	return (
		<>
			<div className="bg-white rounded-xl shadow-lg p-6">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-bold">Deal Actions</h2>

					<StatusBadge status={deal.status} />
				</div>

				<NegotiationActions
					deal={deal}
					isMyTurn={isMyTurn}
					loading={loading}
					updateDeal={updateDeal}
					setShowCounterModal={setShowCounterModal}
				/>

				<CompletionActions
					deal={deal}
					isBuyer={isBuyer}
					isFarmer={isFarmer}
					requestCompletion={requestCompletion}
					confirmCompletion={confirmCompletion}
				/>

				<ContactActions
					isBuyer={isBuyer}
					isFarmer={isFarmer}
					contactStatus={contactStatus}
					farmerMobile={farmerMobile}
					contactLoading={contactLoading}
					requestContact={requestContact}
					approveContact={approveContact}
					rejectContact={rejectContact}
				/>
			</div>

			<CounterOfferModal
				isOpen={showCounterModal}
				onClose={() => setShowCounterModal(false)}
				deal={deal}
				refreshDeal={refreshDeal}
			/>
		</>
	);
};

export default DealActions;



	// 	return (
	// 		<>
	// 			<div className="bg-white rounded-xl shadow-lg p-6">
	// 				<div className="flex items-center justify-between mb-6">
	// 					<h2 className="text-2xl font-bold">Deal Actions</h2>

	// 					<StatusBadge status={deal.status} />
	// 				</div>

	// 				{/* ---------------- NEGOTIATION ---------------- */}

	// 				<NegotiationActions
	// 					deal={deal}
	// 					isMyTurn={isMyTurn}
	// 					loading={loading}
	// 					updateDeal={updateDeal}
	// 					setShowCounterModal={setShowCounterModal}
	// 				/>

	// 				{/* ---------------- COMPLETION ---------------- */}

	// 				{(deal.status === "ACCEPTED" ||
	// 					deal.status === "COMPLETION_PENDING" ||
	// 					deal.status === "COMPLETED") && (
	// 					<div className="space-y-6">
	// 						<h3 className="text-lg font-semibold mb-3">Completion</h3>

	// 						{/* ACCEPTED */}

	// 						{deal.status === "ACCEPTED" && (
	// 							<>
	// 								{isFarmer ? (
	// 									<div>
	// 										<p className="text-gray-600 mb-3">
	// 											Once the crop has been delivered, request the buyer to
	// 											confirm completion.
	// 										</p>

	// 										<button
	// 											onClick={requestCompletion}
	// 											className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded"
	// 										>
	// 											Request Completion
	// 										</button>
	// 									</div>
	// 								) : (
	// 									<p className="text-gray-600">
	// 										Waiting for the farmer to request completion.
	// 									</p>
	// 								)}
	// 							</>
	// 						)}

	// 						{/* COMPLETION PENDING */}

	// 						{deal.status === "COMPLETION_PENDING" && (
	// 							<>
	// 								{isBuyer ? (
	// 									<div>
	// 										<p className="text-gray-600 mb-3">
	// 											The farmer has requested completion of this deal.
	// 										</p>

	// 										<button
	// 											onClick={confirmCompletion}
	// 											className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
	// 										>
	// 											Confirm Completion
	// 										</button>
	// 									</div>
	// 								) : (
	// 									<p className="text-gray-600">
	// 										Waiting for the buyer to confirm completion.
	// 									</p>
	// 								)}
	// 							</>
	// 						)}

	// 						{/* COMPLETED */}

	// 						<CompletionActions
	// 							deal={deal}
	// 							isBuyer={isBuyer}
	// 							isFarmer={isFarmer}
	// 							requestCompletion={requestCompletion}
	// 							confirmCompletion={confirmCompletion}
	// 						/>
	// 					</div>
	// 				)}

	// 				{/* ---------------- CONTACT REQUEST ---------------- */}

	// 				<ContactActions
	// 					isBuyer={isBuyer}
	// 					isFarmer={isFarmer}
	// 					contactStatus={contactStatus}
	// 					farmerMobile={farmerMobile}
	// 					contactLoading={contactLoading}
	// 					requestContact={requestContact}
	// 					approveContact={approveContact}
	// 					rejectContact={rejectContact}
	// 				/>
	// 			</div>

	// 			<CounterOfferModal
	// 				isOpen={showCounterModal}
	// 				onClose={() => setShowCounterModal(false)}
	// 				deal={deal}
	// 				refreshDeal={refreshDeal}
	// 			/>
	// 		</>
	// 	);
