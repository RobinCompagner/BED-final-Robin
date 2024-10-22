import pkg from '@prisma/client';
const { PrismaClientKnownRequestError } = pkg;
import prisma from '../../../prisma/prisma.js';

const createBooking = async (bookingData) => {
    try {
        const booking = await prisma.booking.create({
            data: bookingData,
        });
        return booking;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            // Handle known Prisma errors
            if (error.code === 'P2002') {
                // Unique constraint violation
                throw new Error('Booking with these details already exists');
            }
        }
        // For any other error, throw a generic bad request error
        throw new Error('Invalid booking data');
    }
};

export default createBooking;
