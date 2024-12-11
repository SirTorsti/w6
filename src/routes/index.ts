import {Request, Response, Router} from "express"
import {compile} from "morgan"
import {Offer, IOffer} from '../models/Offer'

const router: Router = Router()

router.post("/upload", async (req: Request, res: Response) => {
    try {
        const {title, description, price} = req.body

        const offer: IOffer = new Offer({
            title,
            description,
            price: parseFloat(price)
        })
        await offer.save()
        console.log("offer saved")
        res.status(201).json({ message: "Offer save successfully"})
    } catch (error: any) {
        console.error(error)
        res.status(500).json({error: "Internal server error"})
    }
}) 

export default router