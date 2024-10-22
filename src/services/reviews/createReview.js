import pkg from '@prisma/client';
const { PrismaClientKnownRequestError } = pkg;
import prisma from '../../../prisma/prisma.js';

const createReview = async (reviewData) => {
    try {
        const review = await prisma.review.create({
            data: reviewData,
        });
        return review;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            // Handle known Prisma errors
            if (error.code === 'P2002') {
                // Unique constraint violation
                throw new Error('Review with these details already exists');
            }
        }
        // For any other error, throw a generic bad request error
        throw new Error('Invalid review data');
    }
};

export default createReview;
