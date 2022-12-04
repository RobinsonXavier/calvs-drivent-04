import bookingRepository from "@/repositories/bookings-repository";

async function getBooking(userId: number) {
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
