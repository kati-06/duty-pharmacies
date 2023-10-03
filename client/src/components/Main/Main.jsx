import {useEffect, useState} from 'react';
import PharmacyTable from '../PharmacyTable/PharmacyTable';
import data from '../../data/data.json';
import {fetchPharmacies} from '../../services/api';
import './Main.style.css';
import PharmacyForm from '../PharmacyForm/PharmacyForm';
import {useNavigate, useParams} from 'react-router-dom';

function Main() {
  const navigate = useNavigate();
  const {city: cityParam, county: countyParam} = useParams();
  const [pharmacies, setPharmacies] = useState(null);
  const [countyOptions, setCountyOptions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(cityParam || '');
  const [selectedCounty, setSelectedCounty] = useState(countyParam || '');
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPharmacies({
          city: cityParam,
          county: countyParam,
        });
        setPharmacies(response);
      } catch (error) {
        console.log(error);
      }
    };

    if (cityParam) {
      setSelectedCity(cityParam);
      setSelectedCounty(countyParam);
      const counties = data.find((d) => d.citySlug === cityParam).counties;
      setCountyOptions(
        counties.map((county) => {
          return {
            value: county.countySlug,
            label: county.countyName,
          };
        })
      );
      fetchData();
    }
  }, [cityParam, countyParam]);

  // get cities from json and map for react-select component
  const cityOptions = data.map((city) => {
    return {value: city.citySlug, label: city.cityName};
  });

  const handleChangeCity = (selectedOption) => {
    setSelectedCity(selectedOption?.value || '');
    setSelectedCounty('');

    if (selectedOption?.value) {
      const counties = data.find(
        (d) => d.citySlug === selectedOption?.value
      ).counties;

      setCountyOptions(
        counties.map((county) => {
          return {
            value: county.countySlug,
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
      console.log(selectedCity, selectedCounty);
      const fetchedPharmacies = await fetchPharmacies({
        city: selectedCity.toLowerCase(),
        county: selectedCounty.toLowerCase(),
      });
      setPharmacies(fetchedPharmacies);

      if (selectedCity && selectedCounty) {
        navigate(
          `/${selectedCity.toLowerCase()}/${selectedCounty.toLowerCase()}`
        );
      } else if (selectedCity) {
        navigate(`/${selectedCity.toLowerCase()}`);
      }
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
