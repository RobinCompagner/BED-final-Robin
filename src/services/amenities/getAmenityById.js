import prisma from '../../../prisma/prisma.js';

const getAmenityById = async (id) => {
    const amenity = await prisma.amenity.findUnique({
        where: { id },
    });

    return amenity;
};

export default getAmenityById;
