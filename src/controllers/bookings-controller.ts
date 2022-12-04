import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import bookingService from "@/services/bookings-service";

export async function getBooking(req: AuthenticatedRequest, res: Response ) {
  const userId = req.userId;

  try {
    const response = await bookingService.getBooking(userId);
    return res.status(200).send(response);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);        
  }
}
