import { prisma } from "../index";

export async function ProfileUpdate(firstName: string, lastName: string, about: string, email: string) {
  const Response = await prisma.employee.update({
    where: {
      email: email,
    },
    data: {
      firstName: firstName,
      lastName: lastName,
      about: about,
      updatedAt: new Date(), 
    },
    select:{
        firstName:true,
        lastName:true,
        email:true,
        updatedAt:true,
        createdAt:true,
        about:true,
    }
  });

  return Response;
}