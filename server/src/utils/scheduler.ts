import schedule from 'node-schedule';
import Pharmacy from '../models/Pharmacy.js';
import axios from 'axios';
//import {Pharmacy} from '../types/commonTypes.js';

export const testo = async () => {
  try {
    const {data} = await axios.get(
      `${process.env.PHARMACY_API}/?city=istanbul&county=avcilar`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PHARMACY_API_TOKEN}`,
        },
      }
    );

    const {data: pharmacies, rowCount} = data;

    const newPharmacies = pharmacies.map((pharmacy: any) => ({
      pharmacyName: pharmacy.EczaneAdi,
      address: pharmacy.Adresi,
      district: pharmacy.Semt,
      directions: pharmacy.YolTarifi,
      phone: pharmacy.Telefon,
      phone2: pharmacy.Telefon2,
      city: pharmacy.Sehir,
      county: pharmacy.ilce,
      latitude: pharmacy.latitude,
      longitude: pharmacy.longitude,
    }));

    await Pharmacy.deleteMany({});

    await Pharmacy.insertMany(newPharmacies);

    console.log(`Pharmacies updated! count: ${rowCount}, time: ${new Date()}`);
  } catch (error) {
    console.log(error);
  }
};

// update pharmacies
export const updatePharmacies = () => {
  //schedule.scheduleJob('5 10,20 * * *', async function () {
  //  try {
  //    const {data} = await axios.get(`${process.env.PHARMACY_API}/getAll`, {
  //      headers: {
  //        Authorization: `Bearer ${process.env.PHARMACY_API_TOKEN}`,
  //      },
  //    });
  //    console.log(data);
  //    const {data: newPharmacies, rowCount} = data;
  //    await Pharmacy.deleteMany({});
  //    console.log(newPharmacies);
  //    await Pharmacy.insertMany(newPharmacies);
  //    console.log(
  //      `Pharmacies updated! count: ${rowCount}, time: ${new Date()}`
  //    );
  //  } catch (error) {
  //    console.log(error);
  //  }
  //});
};

//schedule.scheduleJob('1 10,12,15,17,20 * * *', async
