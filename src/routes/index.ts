import {Request, Response, Router} from "express"
import {compile} from "morgan"
import {Offer, IOffer} from '../models/Offer'

const router: Router = Router()

router.post("/upload", async (req: Request, res: Response) => {
    try {
        const {title, description, price} = req.body

        console.log("Title Type: ", typeof(title), "Title: ", title);
        console.log("Description Type: ", typeof(description), "Description: ", description);
        console.log("Price Type: ", typeof(price), "Price: ", price);

        const offer: IOffer = new Offer({
            title,
            description,
            price: parseFloat(price)
        })
        console.log(req.body)
        console.log(typeof(title))
        console.log(typeof(description))
        console.log(typeof(price))
        await offer.save()
        console.log("offer saved")
        res.status(201).json({ message: "Offer save successfully", body: req.body})
    } catch (error: any) {
        console.error(error)
        res.status(500).json({error: "Internal server error"})
    }
}) 

export default router