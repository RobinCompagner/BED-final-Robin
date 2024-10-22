import prisma from '../../../prisma/prisma.js';

const deleteReviewById = async (id) => {
    try {
        await prisma.review.delete({
            where: { id },
        });
        return id;
    } catch (error) {
        if (error.code === 'P2025') {
            return null;
        }
        throw error;
    }
};

export default deleteReviewById;
