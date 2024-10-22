import { Router } from "express";
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';
import * as reviewService from '../services/reviews/exports.js';
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const reviews = await reviewService.getReviews();
        res.status(200).json(reviews);
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler);

router.get("/:id", async (req, res, next) => {
    try {
        const review = await reviewService.getReviewById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: `Review with id ${req.params.id} not found` });
        }
        return res.status(200).json(review);
    } catch (error) {
        next(error);
    }
});

router.post("/", auth, async (req, res, next) => {
    try {
        const newReview = await reviewService.createReview(req.body);
        res.status(201).json(newReview);
    } catch (error) {
        if (error.message === 'Review with these details already exists' || error.message === 'Invalid review data') {
            res.status(400).json({ message: error.message });
        } else {
            next(error);
        }
    }
});

router.put("/:id", auth, async (req, res, next) => {
    try {
        const updatedReview = await reviewService.updateReviewById(req.params.id, req.body);
        if (!updatedReview) {
            return res.status(404).json({ message: `Review with id ${req.params.id} not found` });
        }
        return res.status(200).json(updatedReview);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", auth, async (req, res, next) => {
    try {
        const deletedReviewId = await reviewService.deleteReviewById(req.params.id);

        if (!deletedReviewId) {
            return res.status(404).json({ message: `Review with id ${req.params.id} not found` });
        } else {
            res.status(200).json({ message: `Review with id ${deletedReviewId} successfully deleted` });
        }

    } catch (error) {
        next(error);
    }
});

export default router;
