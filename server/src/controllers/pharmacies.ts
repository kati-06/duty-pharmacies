import {Request, Response, NextFunction} from 'express';
import httpStatus from 'http-status';
import Pharmacy from '../models/Pharmacy.js';
import {Pharmacy as PharmacyType} from '../types/commonTypes.js';

export const getAllPharmacies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let {city, county} = req.query;

  city = city || '';
  county = county || '';

  const pharmacies: PharmacyType[] = await Pharmacy.find({
    city: {$regex: city, $options: 'i'},
    county: {$regex: county, $options: 'i'},
  });
  res.status(httpStatus.OK).json(pharmacies);
};
