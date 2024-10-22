import prisma from '../../../prisma/prisma.js';

const updatePropertyById = async (id, updatedProperty) => {
    try {
        const property = await prisma.property.update({
            where: { id },
            data: updatedProperty,
            include: {
                host: true,
                amenities: true,
            },
        });
        console.log('Property updated successfully:', property);
        return property;
    } catch (error) {
        console.error('Error updating property:', error);
        if (error.code === 'P2025') {
            console.log('Property not found');
            return null;
        }
        throw error;
    }
};

export default updatePropertyById;
