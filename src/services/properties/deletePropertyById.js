import prisma from '../../../prisma/prisma.js';

const deletePropertyById = async (id) => {
    try {
        const deletedProperty = await prisma.property.delete({
            where: { id },
        });
        return deletedProperty.id;
    } catch (error) {
        if (error.code === 'P2025') {
            return null; // Property not found
        }
        throw error;
    }
};

export default deletePropertyById;
