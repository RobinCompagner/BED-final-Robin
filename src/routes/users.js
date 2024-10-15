import { Router } from "express";
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';
import getUsers from '../services/users/getUsers.js'

const router = Router()

router.get(
    async (req, res, next) => {
        try {
            const users = await getUsers()

            res.status(200).json(users)
        } catch (error) {
            next(error)
        }
    },
    notFoundErrorHandler
)

export default router