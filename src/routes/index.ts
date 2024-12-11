import {Request, Response, Router} from "express"
import {compile} from "morgan"
import {Offer, IOffer} from '../models/Offer'

const router: Router = Router()

router.post("/upload", async (req: Request, res: Response) => {
    try {
        const existingOffers: IOffer | null = await Offer.findOne({offer: req.body.offer})

        const offer: IOffer = new Offer({
            title: req.body.title,
            descripton: req.body.description,
            price: req.body.number
        })
        await offer.save()
        console.log("offer saved")
    } catch (error: any) {
        console.error(error)
    }
}) 

export default router