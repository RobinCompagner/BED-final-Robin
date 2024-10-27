import prisma from '../../../prisma/prisma.js';

const updateHostById = async (id, updatedHost) => {
  const host = await prisma.host.update({
    where: { id },
    data: updatedHost,
  });
  return host;
};

export default updateHostById;
