import GallerySlider from "../models/GallerySlider.js";

// ✅ Create Slider
export const createSlider = async (req, res) => {
    try {
        const slider = new GallerySlider(req.body);
        const saved = await slider.save();

        res.status(201).json({
            success: true,
            message: "Slider created",
            data: saved
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating slider",
            error: error.message
        });
    }
};

// ✅ Get All Sliders
export const getSliders = async (req, res) => {
    try {
        const data = await GallerySlider.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching sliders",
            error: error.message
        });
    }
};

// ✅ Get Slider by ID
export const getSliderById = async (req, res) => {
    try {
        const data = await GallerySlider.findById(req.params.id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Slider not found"
            });
        }

        res.json({
            success: true,
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching slider",
            error: error.message
        });
    }
};

// ✅ Get Sliders by Category
export const getSlidersByCategory = async (req, res) => {
    try {
        const data = await GallerySlider.find({ cate_id: req.params.cate_id });

        res.json({
            success: true,
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching category sliders",
            error: error.message
        });
    }
};

// ✅ Update Slider
export const updateSlider = async (req, res) => {
    try {
        const updated = await GallerySlider.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Slider not found"
            });
        }

        res.json({
            success: true,
            message: "Slider updated",
            data: updated
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating slider",
            error: error.message
        });
    }
};

// ✅ Delete Slider
export const deleteSlider = async (req, res) => {
    try {
        const deleted = await GallerySlider.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Slider not found"
            });
        }

        res.json({
            success: true,
            message: "Slider deleted"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting slider",
            error: error.message
        });
    }
};