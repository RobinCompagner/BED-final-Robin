import prisma from '../../../prisma/prisma.js';

const getReviews = async () => {
    const reviews = await prisma.review.findMany({
        include: {
            user: true,
            property: true,
        },
    });

    return reviews;
};

export default getReviews;
