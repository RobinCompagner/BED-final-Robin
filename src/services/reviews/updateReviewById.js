import prisma from '../../../prisma/prisma.js';

const updateReviewById = async (id, updatedReview) => {
    const review = await prisma.review.update({
        where: { id },
        data: updatedReview,
        include: {
            user: true,
            property: true,
        },
    });
    return review;
};

export default updateReviewById;
