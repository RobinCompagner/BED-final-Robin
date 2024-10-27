import prisma from '../../../prisma/prisma.js';

const deleteBookingById = async (id) => {
    const deleteBooking = await prisma.booking.delete({
        where: { id },
    });
    return deleteBooking.id;
};

export default deleteBookingById;
