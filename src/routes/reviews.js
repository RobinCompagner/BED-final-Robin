import { Router } from "express";
import * as reviewService from '../services/reviews/exports.js';
import auth from "../middleware/auth.js";
import { ValidationError } from "../middleware/validationHandler.js";

const router = Router();

// Routes
// Get all reviews
router.get("/", async (req, res, next) => {
    try {
        const reviews = await reviewService.getReviews();
        res.status(200).json(reviews);
    } catch (error) {
        next(error);
    }
});

// Get review by ID
router.get("/:id", async (req, res, next) => {
    try {
        const review = await reviewService.getReviewById(req.params.id);
        if (review === null) {
            return next(null); // This will trigger 404 in the error handler
        }
        res.status(200).json(review);
    } catch (error) {
        next(error);
    }
});

// Create new review
router.post("/", auth, async (req, res, next) => {
    try {
        const requiredFields = ['userId', 'propertyId', 'rating', 'comment'];

        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            throw new ValidationError(`Missing required fields: ${missingFields.join(', ')}`);
        }

        const newReview = await reviewService.createReview(req.body);

        res.status(201).json({
            message: "Review successfully created",
            review: newReview
        });
    } catch (error) {
        next(error);
    }
});

// Update review by ID
router.put("/:id", auth, async (req, res, next) => {
    try {
        const updatedReview = await reviewService.updateReviewById(req.params.id, req.body);
        res.status(200).json({ message: `Review with id ${updatedReview} successfully updated` });
    } catch (error) {
        next(error);
    }
});

// Delete review by ID
router.delete("/:id", auth, async (req, res, next) => {
    try {
        const deletedReviewId = await reviewService.deleteReviewById(req.params.id);
        res.status(200).json({ message: `Review with id ${deletedReviewId} successfully deleted` });
    } catch (error) {
        next(error);
    }
});

export default router;
