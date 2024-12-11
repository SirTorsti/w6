"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Offer_1 = require("../models/Offer");
const Image_1 = __importDefault(require("../models/Image"));
const uploadImage_1 = __importDefault(require("../middleware/uploadImage"));
const router = (0, express_1.Router)();
router.post("/upload", uploadImage_1.default.single("image"), async (req, res) => {
    try {
        const { title, description, price } = req.body;
        //had a bit of debugging situation       
        if (!title || !description || isNaN(price)) {
            console.log(res.status(400).json({ error: "Invalid input data" }));
        }
        const offerData = {
            title,
            description,
            price: parseFloat(price)
        };
        if (req.file) {
            const { filename, path } = req.file;
            const image = new Image_1.default({
                filename,
                path: `public/images/${filename}`
            });
            await image.save();
            offerData.imageId = image._id;
        }
        const offer = new Offer_1.Offer(offerData);
        await offer.save();
        res.status(201).json({ message: "Offer save successfully", body: req.body });
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            console.error("Validation Error:", error.errors);
        }
        else {
            console.error("Error:", error);
        }
        res.status(500).json({ error: error.message || "Internal server error" });
    }
});
router.get("/offers", async (req, res) => {
    try {
        const offers = await Offer_1.Offer.find().populate({
            path: "imageId",
            select: "filename path -_id"
        });
        const offerList = offers.map((offer) => ({
            id: offer._id,
            title: offer.title,
            description: offer.description,
            price: offer.price,
            image: offer.imageId ? `/images/${offer.imageId.filename}` : null
        }));
        res.status(200).json(offerList);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.default = router;
