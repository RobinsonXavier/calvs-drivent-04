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

async function listAllChosenBookings(roomId: number): Promise<Booking[]> {
  return prisma.booking.findMany({
    where: {
      roomId
    }
  });
}

async function findRoomById(roomId: number): Promise<Room> {
  return prisma.room.findFirst({
    where: {
      id: roomId
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

async function updateBookingByRoomId(bookingId: number, roomId: number): Promise<Booking> {
  return prisma.booking.update(
    {
      where: {
        id: bookingId
      },
      data: {
        roomId
      }
    }
  );
}

const bookingRepository = {
  findBookingByUserId,
  createBooking,
  updateBookingByRoomId,
  findRoomById,
  listAllChosenBookings
};

export default bookingRepository;
