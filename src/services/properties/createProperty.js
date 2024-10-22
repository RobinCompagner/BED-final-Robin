import pkg from '@prisma/client';
const { PrismaClientKnownRequestError } = pkg;
import prisma from '../../../prisma/prisma.js';

const createProperty = async (propertyData) => {
    try {
        const property = await prisma.property.create({
            data: propertyData,
        });
        return property;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            // Handle known Prisma errors
            if (error.code === 'P2002') {
                // Unique constraint violation
                throw new Error('Property with this unique identifier already exists');
            }
        }
        // For any other error, throw a generic bad request error
        throw new Error('Invalid property data');
    }
};

export default createProperty;
