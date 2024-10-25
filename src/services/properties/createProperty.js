import prisma from '../../../prisma/prisma.js';

const createProperty = async (propertyData) => {
    const property = await prisma.property.create({
        data: propertyData,
    });
    return property;
};

export default createProperty;
