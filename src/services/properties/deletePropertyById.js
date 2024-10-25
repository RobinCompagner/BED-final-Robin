import prisma from '../../../prisma/prisma.js';

const deletePropertyById = async (id) => {
    const deletedProperty = await prisma.property.delete({
        where: { id },
    });
    return deletedProperty.id;
};

export default deletePropertyById;
