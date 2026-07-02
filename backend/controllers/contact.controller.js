import Deal from "../models/Deal.model.js";
import ContactRequest from "../models/ContactRequest.model.js";

export const getDealContactStatus = async (req, res) => {
	try {
		const { dealId } = req.params;

		const deal = await Deal.findById(dealId);

		if (!deal) {
			return res.status(404).json({
				success: false,
				message: "Deal not found",
			});
		}

		const request = await ContactRequest.findOne({
			buyer: deal.buyer,
			farmer: deal.farmer,
			crop: deal.crop,
		}).populate("farmer", "mobile");

		if (!request) {
			return res.status(200).json({
				success: true,
				status: "NONE",
			});
		}

		return res.status(200).json({
			success: true,
			status: request.status.toUpperCase(),
			requestId: request._id,
			mobile: request.status === "approved" ? request.farmer.mobile : null,
		});
	} catch (error) {
		console.error(error);

		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};
