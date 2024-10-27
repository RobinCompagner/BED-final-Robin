import prisma from '../../../prisma/prisma.js';

const createAmenity = async (amenityData) => {
    const amenity = await prisma.amenity.create({
        data: amenityData,
    });
    return amenity;
};

export default createAmenity;
