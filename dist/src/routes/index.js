"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Offer_1 = require("../models/Offer");
const router = (0, express_1.Router)();
router.post("/upload", async (req, res) => {
    try {
        const existingOffers = await Offer_1.Offer.findOne({ offer: req.body.offer });
        const offer = new Offer_1.Offer({
            title: req.body.title,
            descripton: req.body.description,
            price: req.body.number
        });
        await offer.save();
        console.log("offer saved");
    }
    catch (error) {
        console.error(error);
    }
});
exports.default = router;
