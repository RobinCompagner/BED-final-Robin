import { PrismaClient } from "@prisma/client";
/*
const updateUserById = async (id, updatedUser) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.updateMany({
    where: { id },
    data: updatedUser,
  });

  return user.count > 0 ? id : null;
};
*/

const prisma = new PrismaClient();  // Initialize Prisma client

const updateUserById = async (id, updatedUser) => {
  try {
    // Ensure ID is a number if necessary
    const user = await prisma.user.update({
      where: { id },  
      data: updatedUser,  // Pass the updated user data
    });
    
    return user;  // Return the updated user object
  } catch (error) {
    // If user not found, return null (Prisma throws an error if the user doesn't exist)
    return null;
  }
};


export default updateUserById;