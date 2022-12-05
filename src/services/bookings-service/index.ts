import { notFoundError, requestError } from "@/errors";
import bookingRepository from "@/repositories/bookings-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function getBooking(userId: number) {
  const checkEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!checkEnrollment) {
    throw notFoundError();
  }

  const checkTicket = await ticketRepository.findTicketByEnrollmentId(checkEnrollment.id);

  if (!checkTicket || checkTicket.status !== "PAID" || checkTicket.TicketType.isRemote || !checkTicket.TicketType.includesHotel) {
    throw notFoundError();
  }

  const result = await bookingRepository.findBookingByUserId(userId);

  if (!result) {
    throw notFoundError();
  }

  const finalResult = {
    id: result.id,
    Room: result.Room
  };

  return finalResult;
}

async function postBooking(userId: number, roomId: number) {
  const checkEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!checkEnrollment) {
    throw requestError(403, "FORBIDDEN");
  }

  const checkTicket = await ticketRepository.findTicketByEnrollmentId(checkEnrollment.id);

  if (!checkTicket || checkTicket.status !== "PAID" || checkTicket.TicketType.isRemote || !checkTicket.TicketType.includesHotel) {
    throw requestError(403, "FORBIDDEN");
  }

  const checkRoom = await bookingRepository.findRoomById(roomId);

  if (!checkRoom) {
    throw notFoundError();
  }

  const allRoomBookings = await bookingRepository.listAllChosenBookings(roomId);

  if (checkRoom.capacity <= allRoomBookings.length) {
    throw requestError(403, "FORBIDDEN");
  }

  const result = await bookingRepository.createBooking(userId, roomId);

  return result.id;
}

async function updateBooking(bookingId: number, roomId: number) {
  const checkRoom = await bookingRepository.findRoomById(roomId);

  if (!checkRoom) {
    throw notFoundError();
  }

  const allRoomBookings = await bookingRepository.listAllChosenBookings(roomId);

  if (checkRoom.capacity <= allRoomBookings.length) {
    throw requestError(403, "FORBIDDEN");
  }

  const result = await bookingRepository.updateBookingByRoomId(bookingId, roomId);

  return result.id;
}

const bookingService = {
  getBooking,
  postBooking,
  updateBooking
};

export default bookingService;
