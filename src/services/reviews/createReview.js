import prisma from '../../../prisma/prisma.js';

const createReview = async (reviewData) => {
    const review = await prisma.review.create({
        data: reviewData,
    });
    return review;
};

export default createReview;
