const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function deleteRecord() {
  const deletedUser = await prisma.user.delete({
    where: { id: 1 }, // Replace 1 with the ID of the record
  });
  console.log(deletedUser);
  await prisma.$disconnect();
}
deleteRecord();