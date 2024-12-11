import {Request, Response, Router} from "express"
import {compile} from "morgan"
import {Offer, IOffer} from '../models/Offer'
import Image from '../models/Image'
import upload from '../middleware/uploadImage'

const router: Router = Router()

router.post("/upload", upload.single("image"), async (req: Request, res: Response) => {
    try {
        const {title, description, price} = req.body
        //had a bit of debugging situation       
        if (!title || !description || isNaN(price)) {
            console.log( res.status(400).json({ error: "Invalid input data" }));
        }

        const offerData: any = { 
            title,
            description,
            price: parseFloat(price)
        }

        if(req.file) {
            const {filename, path} = req.file

            const image = new Image({
                filename,
                path: `public/images/${filename}`
            })
            await image.save()

            offerData.imageId = image._id
        }
        const offer = new Offer(offerData)
        await offer.save()
        res.status(201).json({ message: "Offer save successfully", body: req.body})
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            console.error("Validation Error:", error.errors);
        } else {
            console.error("Error:", error);
        }
        res.status(500).json({ error: error.message || "Internal server error" });
    }
}) 

router.get("/offers", async (req: Request, res: Response) => {
    try {
        const offers = await Offer.find().populate({
            path: "imageId",
            select: "filename path -_id"
        })

        const offerList = offers.map((offer) => ({
            id: offer._id,
            title: offer.title,
            description: offer.description,
            price: offer.price,
            image: offer.imageId ? `/images/${offer.imageId}` : null
        }))

        res.status(200).json(offerList)
    } catch(error: any) {
        res.status(500).json({error: error.message})
    }
})

export default router