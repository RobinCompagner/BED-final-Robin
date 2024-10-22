import prisma from '../../../prisma/prisma.js';

const getReviewById = async (id) => {
    const review = await prisma.review.findUnique({
        where: { id },
        include: {
            user: true,
            property: true,
        },
    });

    return review;
};

export default getReviewById;
