import prisma from '../../../prisma/prisma.js';

const getUsers = async (filters = {}) => {
  const { username, email } = filters;

  const where = {};

  if (username) {
    where.username = {
      equals: username,
    };
  }

  if (email) {
    where.email = {
      equals: email,
    };
  }

  const users = await prisma.user.findMany({
    where,
    select: {
      id: true,
      username: true,
      email: true,

    }
  });

  return users;
};

export default getUsers;
