import ActionCard from "./ActionCard";

const ContactActions = ({
	isBuyer,
	isFarmer,
	contactStatus,
	farmerMobile,
	contactLoading,
	requestContact,
	approveContact,
	rejectContact,
}) => {
	return (
		<ActionCard
			title={
				<>
					Contact Request{" "}
					<span className="text-sm font-normal text-gray-500">
						(Optional)
					</span>
				</>
			}
		>
			{/* ================= BUYER ================= */}

			{isBuyer && (
				<>
					{contactStatus === "NONE" && (
						<div>
							<p className="text-gray-600 mb-3">
								Need the farmer's contact details? Send a request.
							</p>

							<button
								onClick={requestContact}
								disabled={contactLoading}
								className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded disabled:opacity-50"
							>
								{contactLoading ? "Sending..." : "Request Contact"}
							</button>
						</div>
					)}

					{contactStatus === "PENDING" && (
						<div className="rounded-xl border border-yellow-200 bg-yellow-50 p-5">
							<h4 className="font-semibold text-yellow-700">
								Contact Request Pending
							</h4>

							<p className="mt-2 text-gray-600">
								Your request has been sent to the farmer. You'll receive the
								mobile number once it is approved.
							</p>
						</div>
					)}

					{contactStatus === "APPROVED" && (
						<div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
							<div className="flex items-center justify-between">
								<div>
									<h4 className="font-semibold text-blue-700">
										Contact Information
									</h4>

									<p className="text-gray-600 text-sm">
										Farmer approved sharing contact details.
									</p>
								</div>

								<span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
									Approved
								</span>
							</div>

							<div className="mt-5">
								<p className="text-gray-500 text-sm">
									Mobile Number
								</p>

								<p className="text-2xl font-bold tracking-wide mt-1">
									📞 {farmerMobile}
								</p>
							</div>
						</div>
					)}

					{contactStatus === "REJECTED" && (
						<div className="rounded-lg bg-red-50 border border-red-300 p-4">
							<p className="text-red-700 font-medium">
								❌ Contact request rejected by the farmer.
							</p>
						</div>
					)}
				</>
			)}

			{/* ================= FARMER ================= */}

			{isFarmer && (
				<>
					{contactStatus === "NONE" && (
						<div className="rounded-lg bg-gray-50 border p-4">
							<p className="text-gray-600">
								The buyer has not requested your contact details.
							</p>
						</div>
					)}

					{contactStatus === "PENDING" && (
						<div>
							<p className="mb-3 text-gray-700">
								The buyer has requested your contact details.
							</p>

							<div className="flex gap-3">
								<button
									onClick={approveContact}
									disabled={contactLoading}
									className="flex-1 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded disabled:opacity-50"
								>
									Approve
								</button>

								<button
									onClick={rejectContact}
									disabled={contactLoading}
									className="flex-1 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded disabled:opacity-50"
								>
									Reject
								</button>
							</div>
						</div>
					)}

					{contactStatus === "APPROVED" && (
						<div className="rounded-lg bg-green-50 border border-green-300 p-4">
							<p className="text-green-700 font-medium">
								✅ Your contact details have been shared with the buyer.
							</p>
						</div>
					)}

					{contactStatus === "REJECTED" && (
						<div className="rounded-lg bg-red-50 border border-red-300 p-4">
							<p className="text-red-700 font-medium">
								You rejected the contact request.
							</p>
						</div>
					)}
				</>
			)}
		</ActionCard>
	);
};

export default ContactActions;