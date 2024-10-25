import { Router } from "express";
import * as amenityService from '../services/amenities/exports.js';
import auth from "../middleware/auth.js";

const router = Router();

// Routes
// Get all amenities
router.get("/", async (req, res, next) => {
    try {
        const amenities = await amenityService.getAmenities();
        res.status(200).json(amenities);
    } catch (error) {
        next(error);
    }
});

// Get amenity by ID
router.get("/:id", async (req, res, next) => {
    try {
        const amenity = await amenityService.getAmenityById(req.params.id);
        if (amenity === null) {
            return next(null); // This will trigger your 404 in the error handler
        }
        res.status(200).json(amenity);
    } catch (error) {
        next(error);
    }
});

// Create new amenity
router.post("/", auth, async (req, res, next) => {
    try {
        const newAmenity = await amenityService.createAmenity(req.body);
        res.status(201).json({ message: `Amenity with id ${newAmenity} successfully created` });
    } catch (error) {
        next(error);
    }
});

// Update amenity by ID
router.put("/:id", auth, async (req, res, next) => {
    try {
        const updatedAmenity = await amenityService.updateAmenityById(req.params.id, req.body);
        res.status(200).json({ message: `Amenity with id ${updatedAmenity} successfully updated` });
    } catch (error) {
        next(error);
    }
});

// Delete amenity by ID
router.delete("/:id", auth, async (req, res, next) => {
    try {
        const deletedAmenityId = await amenityService.deleteAmenityById(req.params.id);
        res.status(200).json({ message: `Amenity with id ${deletedAmenityId} successfully deleted` });
    } catch (error) {
        next(error);
    }
});

export default router;
