import {useEffect, useState} from 'react';
import PharmacyTable from '../PharmacyTable/PharmacyTable';
import {Pharmacy} from '../../types/commonTypes';
import cities from '../../data/cities';
import data from '../../data/data.json';
import {fetchPharmacies} from '../../services/api';
import './Main.style.css';
import PharmacyForm from '../PharmacyForm/PharmacyForm';

interface County {
  countyName: string;
  countySlug: string;
}

function Main() {
  const [pharmacies, setPharmacies] = useState<Pharmacy[] | null>(null);
  const [countyOptions, setCountyOptions] = useState([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedCounty, setSelectedCounty] = useState<string>('');
  const [isFetcing, setIsFetcing] = useState(false);

  const cityOptions = cities.map((city) => {
    return {value: city.citySlug, label: city.cityName};
  });

  const handleChangeCity = (selectedOption: any) => {
    setSelectedCity(selectedOption?.value || '');

    const countiesData: any = data;

    if (selectedOption?.value) {
      const counties = countiesData[selectedOption?.value].counties;

      setCountyOptions(
        counties.map((county: County) => {
          return {
            value: county.countyName,
            label: county.countySlug,
          };
        })
      );
    }
  };

  const handleChangeCounty = (selectedOption: any) => {
    setSelectedCounty(selectedOption?.value || '');
  };

  //useEffect(() => {
  //  const countiesData: any = data;

  //  if (selectedCity) {
  //    setCounties(countiesData[selectedCity].counties);
  //  }
  //}, [selectedCity]);

  const handleSubmitSearch = async () => {
    try {
      setIsFetcing(true);
      fetchPharmacies({city: selectedCity, county: selectedCounty});
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetcing(false);
    }
  };

  return (
    <div>
      <PharmacyForm
        cityOptions={cityOptions}
        countyOptions={countyOptions}
        handleChangeCity={handleChangeCity}
        handleChangeCounty={handleChangeCounty}
        handleSubmit={handleSubmitSearch}
        disabled={isFetcing}
      />
      <PharmacyTable pharmacies={pharmacies} setPharmacies={setPharmacies} />
    </div>
  );
}

export default Main;
