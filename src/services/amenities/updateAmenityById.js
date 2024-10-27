import prisma from '../../../prisma/prisma.js';

const updateAmenityById = async (id, updatedAmenity) => {
    const amenity = await prisma.amenity.update({
        where: { id },
        data: updatedAmenity,
    });
    return amenity;
};

export default updateAmenityById;
