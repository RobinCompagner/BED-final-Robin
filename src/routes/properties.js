import { Router } from "express";
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';
import * as propertyService from '../services/properties/exports.js';
import auth from "../middleware/auth.js";

const router = Router();


router.get("/", async (req, res, next) => {
    try {
        const { location, pricePerNight, amenities } = req.query;
        const filters = {};

        if (location) filters.location = location;
        if (pricePerNight) filters.pricePerNight = parseFloat(pricePerNight);
        if (amenities) filters.amenities = amenities.split(',').map(item => item.trim());

        const properties = await propertyService.getProperties(filters);
        res.status(200).json(properties);
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler);

router.get("/:id", async (req, res, next) => {
    try {
        const property = await propertyService.getPropertyById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: `Property with id ${req.params.id} not found` });
        }
        res.status(200).json(property);
    } catch (error) {
        next(error);
    }
});

router.post("/", auth, async (req, res, next) => {
    try {
        const newProperty = await propertyService.createProperty(req.body);
        res.status(201).json(newProperty);
    } catch (error) {
        if (error.message === 'Property with this unique identifier already exists' || error.message === 'Invalid property data') {
            res.status(400).json({ message: error.message });
        } else {
            next(error);
        }
    }
});

router.put("/:id", auth, async (req, res, next) => {
    try {
        const updatedProperty = await propertyService.updatePropertyById(req.params.id, req.body);
        if (!updatedProperty) {
            console.log(`Property with id ${req.params.id} not found`);
            return res.status(404).json({ message: `Property with id ${req.params.id} not found` });
        }
        console.log('Sending successful response');
        res.status(200).json(updatedProperty);
    } catch (error) {
        console.error('Error in PUT route:', error);
        next(error);
    }
});

router.delete("/:id", auth, async (req, res, next) => {
    try {
        const deletedPropertyId = await propertyService.deletePropertyById(req.params.id);
        if (!deletedPropertyId) {
            return res.status(404).json({ message: `Property with id ${req.params.id} not found` });
        }
        res.status(200).json({
            message: `Property with id ${deletedPropertyId} successfully deleted`,
            propertyId: deletedPropertyId,
        });
    } catch (error) {
        next(error);
    }
});

export default router;
