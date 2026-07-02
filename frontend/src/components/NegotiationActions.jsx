import ActionCard from "./ActionCard";

const NegotiationActions = ({
	deal,
	isMyTurn,
	loading,
	updateDeal,
	setShowCounterModal,
}) => {
	if (
		deal.status !== "PENDING" &&
		deal.status !== "NEGOTIATING"
	) {
		return null;
	}

	return (
		<ActionCard title="Negotiation">
			{isMyTurn ? (
				<div className="flex gap-3 flex-wrap">
					<button
						onClick={() => setShowCounterModal(true)}
						className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded"
					>
						Counter Offer
					</button>

					<button
						disabled={loading}
						onClick={() => updateDeal("ACCEPT")}
						className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded disabled:opacity-50"
					>
						Accept
					</button>

					<button
						disabled={loading}
						onClick={() => updateDeal("REJECT")}
						className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded disabled:opacity-50"
					>
						Reject
					</button>
				</div>
			) : (
				<p className="text-gray-500">
					Waiting for the other party to respond...
				</p>
			)}
		</ActionCard>
	);
};

export default NegotiationActions;