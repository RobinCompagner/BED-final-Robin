import prisma from '../../../prisma/prisma.js';

const getPropertyById = async (id) => {
    const property = await prisma.property.findUnique({
        where: { id },
        include: {
            host: true,
            amenities: true,
        },
    });
    return property;
};

export default getPropertyById;
