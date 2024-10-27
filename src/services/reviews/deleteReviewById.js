import prisma from '../../../prisma/prisma.js';

const deleteReviewById = async (id) => {
    const deleteReview = await prisma.review.delete({
        where: { id },
    });
    return deleteReview.id;
};

export default deleteReviewById;
