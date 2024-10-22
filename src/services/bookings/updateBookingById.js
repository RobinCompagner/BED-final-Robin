import prisma from '../../../prisma/prisma.js';

const updateBookingById = async (id, updatedBooking) => {
    try {
        const booking = await prisma.booking.update({
            where: { id },
            data: updatedBooking,
            include: {
                user: true,
                property: true,
            },
        });
        return booking;
    } catch (error) {
        if (error.code === 'P2025') {
            return null;
        }
        throw error;
    }
};

export default updateBookingById;
