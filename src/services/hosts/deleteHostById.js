import prisma from '../../../prisma/prisma.js';

const deleteHostById = async (id) => {
    const deletedHost = await prisma.host.delete({
        where: { id },
    });
    return deletedHost.id;
};

export default deleteHostById;
