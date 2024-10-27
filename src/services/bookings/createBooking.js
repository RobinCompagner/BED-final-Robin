import prisma from '../../../prisma/prisma.js';

const createBooking = async (bookingData) => {
    const booking = await prisma.booking.create({
        data: bookingData,
    });
    return booking;
};

export default createBooking;
