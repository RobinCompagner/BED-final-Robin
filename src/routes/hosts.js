import { Router } from "express";
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';
import * as hostService from '../services/hosts/exports.js';
import auth from "../middleware/auth.js";

const router = Router();

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
}, notFoundErrorHandler);

router.get("/:id", async (req, res, next) => {
    try {
        const host = await hostService.getHostById(req.params.id);
        if (!host) {
            return res.status(404).json({ message: `Host with id ${req.params.id} not found` });
        }
        res.status(200).json(host);
    } catch (error) {
        next(error);
    }
});

router.post("/", auth, async (req, res, next) => {
    try {
        const newHost = await hostService.createHost(req.body);
        res.status(201).json(newHost);
    } catch (error) {
        if (error.message === 'Username or email already exists' || error.message === 'Invalid host data') {
            res.status(400).json({ message: error.message });
        } else {
            next(error);
        }
    }
});

router.delete("/:id", auth, async (req, res, next) => {
    try {
        const deletedHostId = await hostService.deleteHostById(req.params.id);
        if (!deletedHostId) {
            return res.status(404).json({ message: `Host with id ${req.params.id} not found` });
        }
        res.status(200).json({
            message: `Host with id ${deletedHostId} successfully deleted`,
            hostId: deletedHostId,
        });
    } catch (error) {
        next(error);
    }
});

router.put("/:id", auth, async (req, res, next) => {
    try {
        const updatedHost = await hostService.updateHostById(req.params.id, req.body);
        if (!updatedHost) {
            return res.status(404).json({ message: `Host with id ${req.params.id} not found` });
        }
        res.status(200).json(updatedHost);
    } catch (error) {
        if (error.message === 'Username already exists') {
            return res.status(409).json({ message: 'Username already exists' });
        }
        next(error);
    }
});

export default router;
