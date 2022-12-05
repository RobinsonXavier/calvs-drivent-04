import { notFoundError } from "@/errors";
import bookingRepository from "@/repositories/bookings-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function getBooking(userId: number) {
  const checkEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!checkEnrollment) {
    throw notFoundError();
  }

  const checkTicket = await ticketRepository.findTicketByEnrollmentId(checkEnrollment.id);

  if (!checkTicket || checkTicket.status !== "PAID") {
    throw notFoundError();
  }

  const result = await bookingRepository.findBookingByUserId(userId);

  const finalResult = {
    id: result.id,
    Room: result.Room
  };

  return finalResult;
}

const bookingService = {
  getBooking
};

export default bookingService;
