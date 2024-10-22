import prisma from '../../../prisma/prisma.js';

const getBookingById = async (id) => {
    const booking = await prisma.booking.findUnique({
        where: { id },
        include: {
            user: true,
            property: true,
        },
    });

    return booking;
};

export default getBookingById;
