import {Request, Response, NextFunction} from 'express';
import httpStatus from 'http-status';

export const getAllPharmacies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(httpStatus.OK).json('OK');
};
