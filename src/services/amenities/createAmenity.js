import pkg from '@prisma/client';
const { PrismaClientKnownRequestError } = pkg;
import prisma from '../../../prisma/prisma.js';

const createAmenity = async (amenityData) => {
    try {
        const amenity = await prisma.amenity.create({
            data: amenityData,
        });
        return amenity;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            // Handle known Prisma errors
            if (error.code === 'P2002') {
                // Unique constraint violation
                throw new Error('Amenity with this name already exists');
            }
        }
        // For any other error, throw a generic bad request error
        throw new Error('Invalid amenity data');
    }
};

export default createAmenity;
