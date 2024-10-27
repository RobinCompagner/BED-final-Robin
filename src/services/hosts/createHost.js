import prisma from '../../../prisma/prisma.js';

const createHost = async (hostData) => {
  const host = await prisma.host.create({
    data: hostData,
  });
  return host;
};

export default createHost;
