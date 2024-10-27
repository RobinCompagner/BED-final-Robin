import prisma from '../../../prisma/prisma.js';

const deleteAmenityById = async (id) => {
    const deleteAmenity = await prisma.amenity.delete({
        where: { id },
    });
    return deleteAmenity.id;
};

export default deleteAmenityById;
