import prisma from '../../../prisma/prisma.js';

const updateAmenityById = async (id, updatedAmenity) => {
    try {
        const amenity = await prisma.amenity.update({
            where: { id },
            data: updatedAmenity,
        });
        return amenity;
    } catch (error) {
        if (error.code === 'P2025') {
            return null;
        }
        throw error;
    }
};

export default updateAmenityById;
