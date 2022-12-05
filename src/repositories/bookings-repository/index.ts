import { prisma } from "@/config";
import { Booking, Room } from "@prisma/client";

async function findBookingByUserId(userId: number): Promise<Booking & {
  Room: Room;
}> {
  return prisma.booking.findFirst({
    where: {
      userId
    },
    include: {
      Room: true
    }
  });
}

async function createBooking(userId: number, roomId: number): Promise<Booking> {
  return prisma.booking.create( {
    data: {
      userId,
      roomId
    }
  });
}

async function updateBookingByRoomId(roomId: number, newRoomId: number) {
  return prisma.booking.update(
    {
      where: {
        id: roomId
      },
      data: {
        roomId: newRoomId
      }
    }
  );
}

const bookingRepository = {
  findBookingByUserId,
  createBooking,
  updateBookingByRoomId
};

export default bookingRepository;
