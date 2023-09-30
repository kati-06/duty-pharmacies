import {useEffect, useState} from 'react';
import PharmacyTable from '../PharmacyTable/PharmacyTable';
import cities from '../../data/cities';
import data from '../../data/data.json';
import {fetchPharmacies} from '../../services/api';
import './Main.style.css';
import PharmacyForm from '../PharmacyForm/PharmacyForm';

function Main() {
  const [pharmacies, setPharmacies] = useState(null);
  const [countyOptions, setCountyOptions] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('');
  const [isFetcing, setIsFetcing] = useState(false);

  // get user location - IGNORE IT FOR NOW
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log('Geolocation not supported');
    }

    function success(position) {
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

  // get cities from json and map for react-select component
  const cityOptions = cities.map((city) => {
    return {value: city.citySlug, label: city.cityName};
  });

  const handleChangeCity = (selectedOption) => {
    setSelectedCity(selectedOption?.label || '');
    setSelectedCounty('');

    const countiesData = data;

    if (selectedOption?.value) {
      const counties = countiesData[selectedOption?.value].counties;

      setCountyOptions(
        counties.map((county) => {
          return {
            value: county.countyName,
            label: county.countyName,
          };
        })
      );
    }
  };

  const handleChangeCounty = (selectedOption) => {
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
        selectedCity={selectedCity}
        selectedCounty={selectedCounty}
        handleSubmit={handleSubmitSearch}
        disabled={isFetcing}
      />
      <PharmacyTable pharmacies={pharmacies} setPharmacies={setPharmacies} />
    </div>
  );
}

export default Main;
