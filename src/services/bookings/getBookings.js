import prisma from '../../../prisma/prisma.js';

const getBookings = async (filters = {}) => {
    const { userId } = filters;

    const where = {};

    if (userId) {
        where.userId = userId;
    }

    const bookings = await prisma.booking.findMany({
        where,
        include: {
            user: true,
            property: true,
        },
    });

    return bookings;
};

export default getBookings;
