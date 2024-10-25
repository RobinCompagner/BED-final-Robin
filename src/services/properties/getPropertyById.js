import prisma from '../../../prisma/prisma.js';

const getPropertyById = async (id) => {
    const property = await prisma.property.findUnique({
        where: { id },
        include: {
            host: true,
            amenities: true,
        },
    });

    console.log('Retrieved property:', JSON.stringify(property, null, 2));

    return property;
};

export default getPropertyById;
