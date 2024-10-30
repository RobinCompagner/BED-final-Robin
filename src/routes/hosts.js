import { Router } from "express";
import * as hostService from '../services/hosts/exports.js';
import auth from "../middleware/auth.js";
import { ValidationError } from "../middleware/validationHandler.js";

const router = Router();

// Routes
// Get all hosts with filter for name
router.get("/", async (req, res, next) => {
    try {
        const { name } = req.query;
        const filters = {};

        if (name) filters.name = name;

        const hosts = await hostService.getHosts(filters);
        res.status(200).json(hosts);
    } catch (error) {
        next(error);
    }
});

// Get host by ID
router.get("/:id", async (req, res, next) => {
    try {
        const host = await hostService.getHostById(req.params.id);
        if (host === null) {
            return next(null); // This will trigger 404 in the error handler
        }
        res.status(200).json(host);
    } catch (error) {
        next(error);
    }
});

// Create new host
router.post("/", auth, async (req, res, next) => {
    try {
        const requiredFields = [
            'username',
            'password',
            'name',
            'email',
            'phoneNumber',
            'profilePicture',
            'aboutMe'
        ]; // Easy to adapt if more fields are added

        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            throw new ValidationError(`Missing required fields: ${missingFields.join(', ')}`);
        }

        const newHost = await hostService.createHost(req.body);

        res.status(201).json({
            message: "Host successfully created",
            host: newHost
        });
    } catch (error) {
        next(error);
    }
});

// Update host by ID
router.put("/:id", auth, async (req, res, next) => {
    try {
        const updatedHost = await hostService.updateHostById(req.params.id, req.body);
        res.status(200).json({ message: `Host with id ${updatedHost} successfully updated` });
    } catch (error) {
        next(error);
    }
});

// Delete host by ID
router.delete("/:id", auth, async (req, res, next) => {
    try {
        const deletedHostId = await hostService.deleteHostById(req.params.id);
        res.status(200).json({ message: `Host with id ${deletedHostId} successfully deleted` });
    } catch (error) {
        next(error);
    }
});

export default router;
