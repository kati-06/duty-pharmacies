import axios from 'axios';

export const fetchPharmacies = async ({city = '', county = ''}) => {
  const {data} = await axios.get(
    `/api/v1/pharmacies?city=${city}&county=${county}`
  );
  return data;
};

export const fetchPharmacy = async (pharmacyId) => {
  return await axios.get(`/api/v1/pharmacies/${pharmacyId}`);
};
