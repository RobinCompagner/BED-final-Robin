import prisma from '../../../prisma/prisma.js';

const deleteHostById = async (id) => {
    try {
        const deletedHost = await prisma.host.delete({
            where: { id },
        });
        return deletedHost.id;
    } catch (error) {
        if (error.code === 'P2025') {
            return null; // Host not found
        }
        throw error;
    }
};

export default deleteHostById;
