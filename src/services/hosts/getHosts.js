import prisma from '../../../prisma/prisma.js';

const getHosts = async (filters = {}) => {
  const { name } = filters;

  const where = {};

  if (name) {
    where.name = {
      contains: name,
    };
  }

  const hosts = await prisma.host.findMany({
    where,
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
      aboutMe: true
      // Don't return password
    },
  });

  return hosts;
};

export default getHosts;
