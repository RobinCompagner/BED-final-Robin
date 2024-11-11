import prisma from '../../../prisma/prisma.js';

const getUsers = async (filters = {}) => {
  const { username, email, id } = filters;

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

  if (id) {
    where.id = {
      equals: id,
    };
  }

  const users = await prisma.user.findMany({
    where,
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true
      // Don't return password

    }
  });

  return users;
};

export default getUsers;
