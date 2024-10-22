import pkg from '@prisma/client';
const { PrismaClientKnownRequestError } = pkg;
import prisma from '../../../prisma/prisma.js';

const createHost = async (hostData) => {
  try {
    const host = await prisma.host.create({
      data: hostData,
    });
    return host;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      // Handle known Prisma errors
      if (error.code === 'P2002') {
        // Unique constraint violation
        throw new Error('Username or email already exists');
      }
    }
    // For any other error, throw a generic bad request error
    throw new Error('Invalid host data');
  }
};

export default createHost;
