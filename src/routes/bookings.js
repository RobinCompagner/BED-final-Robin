import { Router } from "express";
import * as bookingService from '../services/bookings/exports.js';
import auth from "../middleware/auth.js";
import { ValidationError } from "../middleware/validationHandler.js";

const router = Router();

// Routes
// Get bookings with filter for userID
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
});

// Get booking by ID
router.get("/:id", async (req, res, next) => {
    try {
        const booking = await bookingService.getBookingById(req.params.id);
        if (booking === null) {
            return next(null); // This will trigger 404 in the error handler
        }
        res.status(200).json(booking);
    } catch (error) {
        next(error);
    }
});

// Create new booking 
router.post("/", auth, async (req, res, next) => {
    try {
        // Input validation check
        const requiredFields = [
            'userId',
            'propertyId',
            'checkinDate',
            'checkoutDate',
            'numberOfGuests',
            'totalPrice',
            'bookingStatus'
        ]; // easy to adapt if more fields are added

        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            throw new ValidationError(`Missing required fields: ${missingFields.join(', ')}`);
        }

        const newBooking = await bookingService.createBooking(req.body);

        res.status(201).json({
            message: "Booking successfully created",
            booking: newBooking
        });
    } catch (error) {
        next(error);
    }
});

// Update booking by ID
router.put("/:id", auth, async (req, res, next) => {
    try {
        const updatedBooking = await bookingService.updateBookingById(req.params.id, req.body);
        res.status(200).json({ message: `Booking with id ${updatedBooking} successfully updated` });
    } catch (error) {
        next(error);
    }
});

// Delete booking by ID
router.delete("/:id", auth, async (req, res, next) => {
    try {
        const deletedBookingId = await bookingService.deleteBookingById(req.params.id);
        res.status(200).json({ message: `Booking with id ${deletedBookingId} successfully deleted` });
    } catch (error) {
        next(error);
    }
});

export default router;
