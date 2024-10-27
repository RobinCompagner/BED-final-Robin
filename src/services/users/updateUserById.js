import prisma from '../../../prisma/prisma.js';

const updateUserById = async (id, updatedUser) => {
  const user = await prisma.user.update({
    where: { id },
    data: updatedUser,
  });
  return user;
};

export default updateUserById;
