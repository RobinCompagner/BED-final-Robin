import { Router } from "express";
import * as propertyService from '../services/properties/exports.js';
import auth from "../middleware/auth.js";
import { ValidationError } from "../middleware/validationHandler.js";

const router = Router();

// Routes
// Get all properties with filter for location, pricePerNight, and amenities
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
});

// Get property by ID
router.get("/:id", async (req, res, next) => {
    try {
        const property = await propertyService.getPropertyById(req.params.id);
        if (property === null) {
            return next(null); // This will trigger 404 in the error handler
        }
        res.status(200).json(property);
    } catch (error) {
        next(error);
    }
});

// Create new property
router.post("/", auth, async (req, res, next) => {
    try {
        const requiredFields = [
            'title',
            'description',
            'location',
            'pricePerNight',
            'bedroomCount',
            'bathRoomCount',
            'maxGuestCount',
            'hostId',
            'rating'  // Easy to adapt if more fields are added
        ];

        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            throw new ValidationError(`Missing required fields: ${missingFields.join(', ')}`);
        }

        const newProperty = await propertyService.createProperty(req.body);

        res.status(201).json({
            message: "Property successfully created",
            property: newProperty
        });
    } catch (error) {
        next(error);
    }
});

// Update property by ID
router.put("/:id", auth, async (req, res, next) => {
    try {
        const updatedProperty = await propertyService.updatePropertyById(req.params.id, req.body);
        res.status(200).json({ message: `Property with id ${updatedProperty} successfully updated` });
    } catch (error) {
        next(error);
    }
});

// Delete property by ID
router.delete("/:id", auth, async (req, res, next) => {
    try {
        const deletedPropertyId = await propertyService.deletePropertyById(req.params.id);
        res.status(200).json({ message: `Property with id ${deletedPropertyId} successfully deleted` });
    } catch (error) {
        next(error);
    }
});

export default router;
