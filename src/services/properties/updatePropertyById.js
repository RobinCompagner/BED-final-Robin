import prisma from '../../../prisma/prisma.js';

const updatePropertyById = async (id, updatedProperty) => {
    const property = await prisma.property.update({
        where: { id },
        data: updatedProperty,
        include: {
            host: true,
            amenities: true,
        },
    });
    return property;
};

export default updatePropertyById;
