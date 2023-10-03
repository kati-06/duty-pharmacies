import {useState, useEffect} from 'react';
import PharmacyCard from '../PharmacyCard/PharmacyCard';
import './PharmacyTable.style.css';
import {fetchPharmacies} from '../../services/api';
import LoadingSpinner from '../LoadingSpinner';
import MapSelectionModal from '../MapSelectionModal/MapSelectionModal';
import {fetchPharmacy} from '../../services/api';

function PharmacyTable({pharmacies, setPharmacies}) {
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState('');
  const [pharmacyData, setPharmacyData] = useState({});

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

  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
        navigator.userAgent
      )
    ) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  useEffect(() => {
    if (pharmacyData.data) {
        if (isMobile) {
            setShowModal(true);
        } else {
            const pharmacy = pharmacyData.data;
            let url = '';

            if (pharmacyData.isFound) {
                const { location } = pharmacy.geometry;
                url = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}&query_place_id=${pharmacy.place_id}`;
            } else {
                url = `https://www.google.com/maps/search/?api=1&query=${pharmacy.latitude},${pharmacy.longitude}`;
            }

            // Open Google Maps in a new browser tab on desktop
            window.open(url, '_blank');
        }
    }
}, [pharmacyData, isMobile]);


  const handleClickShowOnMap = async (pharmacyId) => {

    const {data} = await fetchPharmacy(pharmacyId.toString());

    setPharmacyData(data);
  };

  const handleSelectMap = (type = 'google') => {
    let uri = '';
    if (type === 'google') {
      if (pharmacyData.isFound) {
        const encodedAddress = encodeURI(pharmacyData.data.address);
        uri = `comgooglemaps://?q=${encodedAddress}`;
      } else {
        uri = `comgooglemaps://?q=${pharmacyData.data.lat},${pharmacyData.data.lng}`;
      }
    } else if (type === 'apple') {
      if (pharmacyData.isFound) {
        const encodedAddress = encodeURI(pharmacyData.data.address);
        uri = `maps://maps.apple.com/?address=${encodedAddress}`;
      } else {
        uri = `maps://maps.apple.com/?q=${pharmacyData.data.lat},${pharmacyData.data.lng}`;
      }
    } else if (type === 'yandex') {
    }

    window.location.href = uri;
  };

  if (!pharmacies)
    return <h1 className="m-2 font-semibold">Lütfen il seçiniz.</h1>;

  return (
    <div className="pharmacy-table  border p-5">
      {showModal && (
        // Black Overlay
        <div className="bg-black bg-opacity-75 w-screen h-screen fixed top-0 left-0"></div>
      )}
      {showModal && (
        <MapSelectionModal
          handleSelectMap={handleSelectMap}
          setShowModal={setShowModal}
        />
      )}
      {pharmacies?.map((pharmacy) => (
        <PharmacyCard
          key={pharmacy._id}
          pharmacyName={pharmacy.pharmacyName}
          city={pharmacy.city}
          county={pharmacy.county}
          address={pharmacy.address}
          phone1={pharmacy.phone}
          pharmacyId={pharmacy._id}
          setShowModal={setShowModal}
          handleClickShowOnMap={handleClickShowOnMap}
        />
      ))}
    </div>
  );
}

export default PharmacyTable;
//flex flex-col justify-center items-center
