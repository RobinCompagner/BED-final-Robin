import prisma from '../../../prisma/prisma.js';

const updateHostById = async (id, updatedHost) => {
  try {
    const host = await prisma.host.update({
      where: { id },
      data: updatedHost,
    });
    return host;
  } catch (error) {
    if (error.code === 'P2002') {
      throw new Error('Username already exists');
    }
    if (error.code === 'P2025') {
      return null;
    }
    throw error;
  }
};

export default updateHostById;
