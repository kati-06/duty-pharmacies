import axios, {AxiosHeaders} from 'axios';
import {Pharmacy} from '../types/commonTypes';

interface dataOptions {
  data: Pharmacy[];
  status: number;
  statusText: string;
  headers: AxiosHeaders;
  config: object;
}

export const fetchPharmacies = async ({
  city = '',
  county = '',
}: {
  city: string;
  county: string;
}) => {
  const {data}: dataOptions = await axios.get(
    `${process.env.REACT_APP_PHARMACY_API}/pharmacies?city=${city}&county=${county}`
  );

  return data;
};
