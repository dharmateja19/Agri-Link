import React from "react";

const DealTimeline = ({ deal }) => {
	if (!deal?.offers || deal.offers.length === 0) {
		return (
			<div className="bg-white rounded-xl shadow-lg p-6">
				<p className="text-gray-500 text-center">
					No negotiation history available.
				</p>
			</div>
		);
	}

	const formatDate = (date) =>
		new Date(date).toLocaleString("en-IN", {
			dateStyle: "medium",
			timeStyle: "short",
		});

	return (
		<div className="bg-white rounded-xl shadow-lg p-6">
			<h2 className="text-2xl font-bold mb-6">Negotiation Timeline</h2>

			<div className="space-y-6">
				{deal.offers.map((offer) => {
					const isBuyer =
						offer.offeredBy?._id?.toString() === deal.buyer?._id?.toString();

					return (
						<div
							className={`flex ${isBuyer ? "justify-end" : "justify-start"}`}
						>
							<div
								className={`max-w-md rounded-2xl p-4 shadow-md ${
									isBuyer ? "bg-green-600 text-white" : "bg-gray-100"
								}`}
							>
								<div className="flex justify-between items-center mb-2">
									<span className="font-semibold">
										{isBuyer
											? `🛒 ${deal.buyer?.name}`
											: `🌾 ${deal.farmer?.name}`}
									</span>

									<span className="text-xs text-gray-500">
										{formatDate(offer.createdAt)}
									</span>
								</div>

								<p
									className={`text-2xl font-bold ${
										isBuyer ? "text-white" : "text-green-700"
									}`}
								>
									₹{offer.price}/kg
								</p>

								<p
									className={`mt-2 ${
										isBuyer ? "text-gray-100" : "text-gray-700"
									}`}
								>
									{offer.message}
								</p>
							</div>
						</div>
					);
				})}
			</div>

			{/* Status Events */}

			{deal.status === "ACCEPTED" && (
				<div className="flex justify-center mt-8">
					<div className="bg-green-100 text-green-700 px-6 py-3 rounded-full font-semibold">
						🤝 Deal Accepted
					</div>
				</div>
			)}

			{deal.status === "COMPLETION_PENDING" && (
				<div className="flex justify-center mt-8">
					<div className="bg-purple-100 text-purple-700 px-6 py-3 rounded-full font-semibold">
						⏳ Completion Requested
					</div>
				</div>
			)}

			{deal.status === "COMPLETED" && (
				<div className="flex justify-center mt-8">
					<div className="bg-emerald-100 text-emerald-700 px-6 py-3 rounded-full font-semibold">
						✅ Deal Completed Successfully
					</div>
				</div>
			)}

			{deal.status === "REJECTED" && (
				<div className="flex justify-center mt-8">
					<div className="bg-red-100 text-red-700 px-6 py-3 rounded-full font-semibold">
						❌ Deal Rejected
					</div>
				</div>
			)}
		</div>
	);
};

export default DealTimeline;
