import { PrismaClient } from "@prisma/client";

const getUsers = async () => {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true
      // select ensures password is not returned
    },
  });

  return users;
};

export default getUsers;