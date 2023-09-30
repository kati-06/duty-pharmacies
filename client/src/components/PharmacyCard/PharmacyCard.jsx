import {useEffect, useState} from 'react';
import './PharmacyCard.style.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faHouseMedical,
  faLocationDot,
  faMapLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import {fetchPharmacy} from '../../services/api';

function PharmacyCard({
  pharmacyName,
  city,
  county,
  address,
  phone1,
  pharmacyId,
  setShowModal,
}) {
  const [isMobile, setIsMobile] = useState('');

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

  const handleClickShowOnMap = async () => {
    const {data} = await fetchPharmacy(pharmacyId.toString());

    if (data.isFound) {
      const pharmacy = data.data;
      const {location} = pharmacy.geometry;
      const encodedAddress = encodeURI(data.address);
      setShowModal(true);
      if (isMobile) {
        const googleUri = `comgooglemaps://?q=${encodedAddress}`;
        window.location.href = googleUri;
      } else {
        // Open Google Maps in a new browser tab on desktop
        window.open(
          `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}&query_place_id=${pharmacy.place_id}`,
          '_blank'
        );
      }
    } else {
      const pharmacy = data.data;
      if (isMobile) {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

        if (isIOS) {
          // Open Apple Maps on iOS
          const mapUri = `maps://maps.apple.com/?q=${pharmacy.latitude},${pharmacy.longitude}`;
          window.location.href = mapUri;
        } else {
          // Open Google Maps on Android
          const mapUri = `geo:${pharmacy.latitude},${pharmacy.longitude}`;
          window.location.href = mapUri;
        }
      } else {
        // Open Google Maps in a new browser tab on desktop
        window.open(
          `https://www.google.com/maps/search/?api=1&query=${pharmacy.latitude},${pharmacy.longitude}`,
          '_blank'
        );
      }
    }
  };

  return (
    <div className="pharmacy-card p-5 w-full ">
      <div className="flex items-start gap-2 mb-3">
        <FontAwesomeIcon
          className="text-gray-600 "
          size="xl"
          icon={faHouseMedical}
        />
        <h1 className="text-xl font-bold w-fulloverflow-hidden whitespace-nowrap text-ellipsis">
          {pharmacyName}
        </h1>
      </div>
      <ul className="flex flex-col gap-3 h-full">
        <div className="flex items-start gap-2 mt-2">
          <FontAwesomeIcon
            className="text-gray-600 mt-1 "
            icon={faLocationDot}
          />
          <li>
            {city} - {county}
          </li>
        </div>
        <div className="flex items-start gap-2 mt-2">
          <FontAwesomeIcon
            className="text-gray-600 mt-1 "
            icon={faMapLocationDot}
          />
          <li className="address text-ellipsis overflow-hidden">{address}</li>
        </div>
        <div className="flex items-start  gap-2 mt-2">
          <FontAwesomeIcon className="text-gray-600 mt-1 " icon={faPhone} />
          <a href={`tel:${phone1}`} className="text-sky-600 underline">
            {phone1}
          </a>
        </div>

        <li>
          <button
            onClick={handleClickShowOnMap}
            className="btn bg-blue w-full p-2 "
          >
            Haritada Goster
          </button>
        </li>
      </ul>
    </div>
  );
}

export default PharmacyCard;
