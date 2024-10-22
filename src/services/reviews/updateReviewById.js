import prisma from '../../../prisma/prisma.js';

const updateReviewById = async (id, updatedReview) => {
    try {
        const review = await prisma.review.update({
            where: { id },
            data: updatedReview,
            include: {
                user: true,
                property: true,
            },
        });
        return review;
    } catch (error) {
        if (error.code === 'P2025') {
            return null;
        }
        throw error;
    }
};

export default updateReviewById;
