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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log('Geolocation not supported');
    }

    function success(position: any) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      // const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}&query_place_id=${place_id}`;
      // window.open(url, '_blank');
    }

    function error() {
      console.log('Unable to retrieve your location');
    }
  }, []);

  const cityOptions = cities.map((city) => {
    return {value: city.citySlug, label: city.cityName};
  });

  const handleChangeCity = (selectedOption: any) => {
    setSelectedCity(selectedOption?.label || '');
    setSelectedCounty('');

    const countiesData: any = data;

    if (selectedOption?.value) {
      const counties = countiesData[selectedOption?.value].counties;

      setCountyOptions(
        counties.map((county: County) => {
          return {
            value: county.countyName,
            label: county.countyName,
          };
        })
      );
    }
  };

  const handleChangeCounty = (selectedOption: any) => {
    setSelectedCounty(selectedOption?.value || '');
  };

  const handleSubmitSearch = async () => {
    try {
      setIsFetcing(true);
      const fetchedPharmacies = await fetchPharmacies({
        city: selectedCity,
        county: selectedCounty,
      });
      setPharmacies(fetchedPharmacies);
    } catch (error) {
      console.log(error);
      window.alert(error);
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
        selectedCounty={selectedCounty}
        handleSubmit={handleSubmitSearch}
        disabled={isFetcing}
      />
      <PharmacyTable pharmacies={pharmacies} setPharmacies={setPharmacies} />
    </div>
  );
}

export default Main;
