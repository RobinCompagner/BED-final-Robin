import { Router } from "express";
import * as amenityService from '../services/amenities/exports.js';
import auth from "../middleware/auth.js";
import { ValidationError } from '../middleware/validationHandler.js';

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
        if (amenity !== null) {
            res.status(200).json(amenity);
        } else {
            res.status(404).json({ message: `Amenity with ID ${req.params.id} not found.` });
        }
    } catch (error) {
        next(error);
    }
});

// Create new amenity
router.post("/", auth, async (req, res, next) => {
    try {
        // Input validation check
        const requiredFields = ['name']; // Easy to adapt if more fields are added

        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            throw new ValidationError(`Missing required fields: ${missingFields.join(', ')}`);
        }

        const newAmenity = await amenityService.createAmenity(req.body);
        res.status(201).json({
            message: "Amenity successfully created",
            amenity: newAmenity
        });
    } catch (error) {
        next(error);
    }
});

// Update amenity by ID
router.put("/:id", auth, async (req, res, next) => {
    try {
        const updatedAmenity = await amenityService.updateAmenityById(req.params.id, req.body);
        if (updatedAmenity !== null) {
            res.status(200).json({ message: `Amenity with id ${updatedAmenity.id} successfully updated` });
        } else {
            res.status(404).json({ message: `Amenity with ID ${req.params.id} not found.` });
        }
    } catch (error) {
        next(error);
    }
});

// Delete amenity by ID
router.delete("/:id", auth, async (req, res, next) => {
    try {
        const deletedAmenityId = await amenityService.deleteAmenityById(req.params.id);
        if (deletedAmenityId !== null) {
            res.status(200).json({ message: `Amenity with id ${req.params.id} successfully deleted` });
        } else {
            res.status(404).json({ message: `Amenity with ID ${req.params.id} not found.` });
        }
    } catch (error) {
        next(error);
    }
});

export default router;
