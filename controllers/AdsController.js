import Ads from "../models/AdsModel.js";

// ✅ Create Ad
export const createAd = async (req, res) => {
    try {
        const ad = new Ads({
            id: req.body.id,
            add_placement: req.body.add_placement,
            addSize: req.body.addSize,
            click: req.body.click,
            banner_image: req.body.banner_image,
            status: req.body.status
        });

        const savedAd = await ad.save();

        res.status(201).json({
            success: true,
            message: "Ad created successfully",
            data: savedAd
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating ad",
            error: error.message
        });
    }
};

// ✅ Get All Ads
export const getAllAds = async (req, res) => {
    try {
        const ads = await Ads.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            data: ads
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching ads",
            error: error.message
        });
    }
};

// ✅ Get Single Ad
export const getAdById = async (req, res) => {
    try {
        const ad = await Ads.findById(req.params.id);

        if (!ad) {
            return res.status(404).json({
                success: false,
                message: "Ad not found"
            });
        }

        res.json({
            success: true,
            data: ad
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching ad",
            error: error.message
        });
    }
};

// ✅ Update Ad
export const updateAd = async (req, res) => {
    try {
        const updatedAd = await Ads.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedAd) {
            return res.status(404).json({
                success: false,
                message: "Ad not found"
            });
        }

        res.json({
            success: true,
            message: "Ad updated successfully",
            data: updatedAd
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating ad",
            error: error.message
        });
    }
};

// ✅ Delete Ad
export const deleteAd = async (req, res) => {
    try {
        const deletedAd = await Ads.findByIdAndDelete(req.params.id);

        if (!deletedAd) {
            return res.status(404).json({
                success: false,
                message: "Ad not found"
            });
        }

        res.json({
            success: true,
            message: "Ad deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting ad",
            error: error.message
        });
    }
};