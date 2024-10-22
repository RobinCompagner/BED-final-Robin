import prisma from '../../../prisma/prisma.js';

const deleteAmenityById = async (id) => {
    try {
        await prisma.amenity.delete({
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

export default deleteAmenityById;
