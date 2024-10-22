import prisma from '../../../prisma/prisma.js';

const getProperties = async (filters = {}) => {
    const { location, pricePerNight, amenities } = filters;

    const where = {};

    if (location) {
        where.location = {
            contains: location,
        };
    }

    if (pricePerNight) {
        where.pricePerNight = {
            lte: parseFloat(pricePerNight)
        };
    }

    if (amenities && amenities.length > 0) {
        where.amenities = {
            some: {
                name: {
                    in: amenities
                }
            }
        };
    }

    const properties = await prisma.property.findMany({
        where,
        include: {
            host: true,
            amenities: true,
        },
    });

    return properties;
};

export default getProperties;
