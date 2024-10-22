import pkg from '@prisma/client';
const { PrismaClientKnownRequestError } = pkg;
import prisma from '../../../prisma/prisma.js';

const createUser = async (userData) => {
  try {
    const user = await prisma.user.create({
      data: userData,
    });
    return user;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      // Handle known Prisma errors
      if (error.code === 'P2002') {
        // Unique constraint violation
        throw new Error('Username or email already exists');
      }
    }
    // For any other error, throw a generic bad request error
    throw new Error('Invalid user data');
  }
};

export default createUser;
