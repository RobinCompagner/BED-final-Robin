import { Router } from "express";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler";
import getAmenities from '../services/getAmenities.js'

const router = Router()
// get amenities by property? check the route
router.get(
    async (req, res, next) => {
        try {
            const { id } = req.params
            const = await

            res.status(200).json()
        } catch (error) {
            next(error)
        }
    },
    notFoundErrorHandler
)

export default router