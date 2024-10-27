import prisma from '../../../prisma/prisma.js';

const updateBookingById = async (id, updatedBooking) => {
    const booking = await prisma.booking.update({
        where: { id },
        data: updatedBooking,
        include: {
            user: true,
            property: true,
        },
    });
    return booking;
};

export default updateBookingById;
