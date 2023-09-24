import React from 'react';
import PharmacyCard from '../PharmacyCard/PharmacyCard';
import './PharmacyTable.style.css';
import {fetchPharmacies} from '../../services/api';
import LoadingSpinner from '../LoadingSpinner';
import {Pharmacy} from '../../types/commonTypes';

interface PharmacyTableProps {
  pharmacies: Pharmacy[] | null;
  setPharmacies: React.Dispatch<React.SetStateAction<Pharmacy[] | null>>;
}

function PharmacyTable({pharmacies, setPharmacies}: PharmacyTableProps) {
  //useEffect(() => {
  //  const fetchData = async () => {
  //    try {
  //      const response = await fetchPharmacies({
  //        city: 'ankara',
  //        county: '',
  //      });
  //      setPharmacies(response);
  //    } catch (error) {
  //      console.log(error);
  //    }
  //  };

  //  fetchData();
  //}, []);

  //if (!pharmacies) return <LoadingSpinner />;
  if (!pharmacies) return <h1>Lutfen bir il secin</h1>;

  return (
    <div className="pharmacy-table w-full border">
      {pharmacies?.map((pharmacy) => (
        <PharmacyCard
          key={pharmacy._id}
          pharmacyName={pharmacy.pharmacyName}
          city={pharmacy.city}
          county={pharmacy.county}
        />
      ))}
    </div>
  );
}

export default PharmacyTable;
//flex flex-col justify-center items-center
