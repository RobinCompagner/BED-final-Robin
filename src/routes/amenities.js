import { Router } from "express";
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';
import * as amenityService from '../services/amenities/exports.js';
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const amenities = await amenityService.getAmenities();
        res.status(200).json(amenities);
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler);

router.get("/:id", async (req, res, next) => {
    try {
        const amenity = await amenityService.getAmenityById(req.params.id);
        if (!amenity) {
            return res.status(404).json({ message: `Amenity with id ${req.params.id} not found` });
        }
        res.status(200).json(amenity);
    } catch (error) {
        next(error);
    }
});

router.post("/", auth, async (req, res, next) => {
    try {
        const newAmenity = await amenityService.createAmenity(req.body);
        res.status(201).json(newAmenity);
    } catch (error) {
        if (error.message === 'Amenity with this name already exists' || error.message === 'Invalid amenity data') {
            res.status(400).json({ message: error.message });
        } else {
            next(error);
        }
    }
});

router.put("/:id", auth, async (req, res, next) => {
    try {
        const updatedAmenity = await amenityService.updateAmenityById(req.params.id, req.body);
        if (!updatedAmenity) {
            return res.status(404).json({ message: `Amenity with id ${req.params.id} not found` });
        }
        res.status(200).json(updatedAmenity);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", auth, async (req, res, next) => {
    try {
        const deletedAmenityId = await amenityService.deleteAmenityById(req.params.id);
        if (!deletedAmenityId) {
            return res.status(404).json({ message: `Amenity with id ${req.params.id} not found` });
        }
        res.status(200).json({
            message: `Amenity with id ${deletedAmenityId} successfully deleted`,
            amenityId: deletedAmenityId,
        });
    } catch (error) {
        next(error);
    }
});

export default router;
