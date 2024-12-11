"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Offer_1 = require("../models/Offer");
const router = (0, express_1.Router)();
router.post("/upload", async (req, res) => {
    try {
        const { title, description, price } = req.body;
        const offer = new Offer_1.Offer({
            title,
            description,
            price: parseFloat(price)
        });
        await offer.save();
        console.log("offer saved");
        res.status(201).json({ message: "Offer save successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.default = router;
