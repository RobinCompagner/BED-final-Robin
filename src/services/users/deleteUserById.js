import prisma from '../../../prisma/prisma.js';

const deleteUserById = async (id) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id },
    });
    return deletedUser.id;
  } catch (error) {
    if (error.code === 'P2025') {
      return null; // User not found
    }
    throw error;
  }
};

export default deleteUserById;
