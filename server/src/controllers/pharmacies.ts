import {Request, Response, NextFunction} from 'express';
import httpStatus from 'http-status';
import Pharmacy from '../models/Pharmacy.js';
import {PharmacyENG} from '../types/commonTypes.js';
import axios from 'axios';

export const getAllPharmacies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let {city, county} = req.query;

  city = city || '';
  county = county || '';

  const pharmacies: PharmacyENG[] = await Pharmacy.find({
    city: {$regex: city, $options: 'i'},
    county: {$regex: county, $options: 'i'},
  });
  res.status(httpStatus.OK).json(pharmacies);
};

export const getPharmacy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {id: pharmacyId} = req.params;

  const pharmacy: PharmacyENG = await Pharmacy.findById(pharmacyId);

  const encodedName = encodeURIComponent(pharmacy.pharmacyName);
  //const encodedAddress = encodeURIComponent(closestPharmacy.address);

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodedName}&radius=2000&type=pharmacy&key=${process.env.GOOGLE_PLACES_API}`;

  // const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodedName}&location=${pharmacy.latitude},${pharmacy.longitude}&radius=2000&type=pharmacy&key=${process.env.GOOGLE_PLACES_API}`;

  const places: any = await axios.get(url);

  const closestPlace = places.data.results[0];
  if (closestPlace) {
    res.status(httpStatus.OK).json({data: closestPlace, isFound: true});
  } else {
    res.status(httpStatus.OK).json({data: pharmacy, isFound: false});
  }
};
