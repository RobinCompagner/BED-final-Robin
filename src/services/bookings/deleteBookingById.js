import prisma from '../../../prisma/prisma.js';

const deleteBookingById = async (id) => {
    try {
        await prisma.booking.delete({
            where: { id },
        });
        return id;
    } catch (error) {
        if (error.code === 'P2025') {
            return null;
        }
        throw error;
    }
};

export default deleteBookingById;
