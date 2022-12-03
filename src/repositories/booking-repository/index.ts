import { prisma } from "@/config";

async function findBooking(roomId: number) {
  return prisma.booking.findMany({
    where: {
      roomId
    }
  });
}

export {
  findBooking
};
