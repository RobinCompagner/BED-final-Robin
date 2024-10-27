import prisma from '../../../prisma/prisma.js';

const createUser = async (userData) => {
  const user = await prisma.user.create({
    data: userData,
  });
  return user;
};

export default createUser;
