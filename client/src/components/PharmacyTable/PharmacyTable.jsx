import React from 'react';
import PharmacyCard from '../PharmacyCard/PharmacyCard';
import './PharmacyTable.style.css';
import {fetchPharmacies} from '../../services/api';
import LoadingSpinner from '../LoadingSpinner';

function PharmacyTable({pharmacies, setPharmacies}) {
  // IGNORE IT FOR NOW
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
  if (!pharmacies) return <h1 style={{marginLeft: 5}}>Lütfen il seçiniz.</h1>;

  return (
    <div className="pharmacy-table w-full border p-5">
      {pharmacies?.map((pharmacy) => (
        <PharmacyCard
          key={pharmacy._id}
          pharmacyName={pharmacy.pharmacyName}
          city={pharmacy.city}
          county={pharmacy.county}
          address={pharmacy.address}
          phone1={pharmacy.phone}
          pharmacyId={pharmacy._id}
        />
      ))}
    </div>
  );
}

export default PharmacyTable;
//flex flex-col justify-center items-center
