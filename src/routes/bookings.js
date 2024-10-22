import { Router } from "express";
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';
import * as bookingService from '../services/bookings/exports.js';
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const { userId } = req.query;
        const filters = {};

        if (userId) filters.userId = userId;

        const bookings = await bookingService.getBookings(filters);
        res.status(200).json(bookings);
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler);

router.get("/:id", async (req, res, next) => {
    try {
        const booking = await bookingService.getBookingById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: `Booking with id ${req.params.id} not found` });
        }
        res.status(200).json(booking);
    } catch (error) {
        next(error);
    }
});

router.post("/", auth, async (req, res, next) => {
    try {
        const newBooking = await bookingService.createBooking(req.body);
        res.status(201).json(newBooking);
    } catch (error) {
        if (error.message === 'Booking with these details already exists' || error.message === 'Invalid booking data') {
            res.status(400).json({ message: error.message });
        } else {
            next(error);
        }
    }
});

router.put("/:id", auth, async (req, res, next) => {
    try {
        const updatedBooking = await bookingService.updateBookingById(req.params.id, req.body);
        if (!updatedBooking) {
            return res.status(404).json({ message: `Booking with id ${req.params.id} not found` });
        }
        res.status(200).json(updatedBooking);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", auth, async (req, res, next) => {
    try {
        const deletedBookingId = await bookingService.deleteBookingById(req.params.id);
        if (!deletedBookingId) {
            return res.status(404).json({ message: `Booking with id ${req.params.id} not found` });
        }
        res.status(200).json({
            message: `Booking with id ${deletedBookingId} successfully deleted`,
            bookingId: deletedBookingId,
        });
    } catch (error) {
        next(error);
    }
});

export default router;
