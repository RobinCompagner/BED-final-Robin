import prisma from '../../../prisma/prisma.js';

const getHostById = async (id) => {
  const host = await prisma.host.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
      aboutMe: true
    },
  });

  return host;
};

export default getHostById;
