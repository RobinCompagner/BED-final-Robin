import prisma from '../../../prisma/prisma.js';

const updateUserById = async (id, updatedUser) => {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: updatedUser,
    });
    return user;
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

export default updateUserById;
