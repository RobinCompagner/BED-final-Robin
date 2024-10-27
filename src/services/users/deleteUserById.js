import prisma from '../../../prisma/prisma.js';

const deleteUserById = async (id) => {
  const deletedUser = await prisma.user.delete({
    where: { id },
  });
  return deletedUser.id;
};

export default deleteUserById;
