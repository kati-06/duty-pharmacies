import PharmacyCard from './PharmacyCard';
import './PharmacyTable.style.css';
import {fetchPharmacies} from '../services/api';
import {useEffect, useState} from 'react';
import {Pharmacy} from './types/commonTypes';
import {AxiosResponse} from 'axios';

function PharmacyTable() {
  const [pharmacies, setPharmacies] = useState<Pharmacy[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPharmacies({
          city: '',
          county: '',
        });
        setPharmacies(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (!pharmacies) return <></>;
  console.log(pharmacies);
  return (
    <div className="pharmacy-table w-full">
      {pharmacies?.map((pharmacy) => (
        <PharmacyCard key={pharmacy._id} pharmacyName={pharmacy.pharmacyName} />
      ))}
    </div>
  );
}

export default PharmacyTable;
//flex flex-col justify-center items-center
