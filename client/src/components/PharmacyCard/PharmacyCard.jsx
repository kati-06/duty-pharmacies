import {useEffect, useState} from 'react';
import './PharmacyCard.style.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faHouseMedical,
  faLocationDot,
  faMapLocationDot,
  faPhone,
  faCarSide,
} from '@fortawesome/free-solid-svg-icons';

function PharmacyCard({
  pharmacyName,
  city,
  county,
  address,
  phone1,
  pharmacyId,
  distance,
  setShowModal,
  handleClickShowOnMap,
}) {
  return (
    <div className="pharmacy-card p-5 w-full">
      <div className="flex items-start gap-2 mb-3 ">
        <FontAwesomeIcon
          className="text-gray-600"
          size="xl"
          style={{width: '30px', height: '30px'}}
          icon={faHouseMedical}
        />
        <h1 className="text-xl font-bold w-fulloverflow-hidden whitespace-nowrap text-ellipsis">
          {pharmacyName}
        </h1>
      </div>
      <ul className="flex flex-col gap-3 h-full">
        <div className="flex items-start gap-2 mt-2">
          <FontAwesomeIcon
            className="text-gray-600 mt-1 mr-1"
            icon={faLocationDot}
            style={{width: '20px', height: '20px'}}
          />
          <li>
            {city} - {county}
          </li>
        </div>
        <div className="flex items-start gap-2 mt-2">
          <FontAwesomeIcon
            className="text-gray-600 mt-1 mr-1 "
            icon={faMapLocationDot}
          />
          <li className="address text-ellipsis overflow-hidden">{address}</li>
        </div>
        <div className="flex items-start  gap-2 mt-2">
          <FontAwesomeIcon
            className="text-gray-600 mt-1 mr-1"
            icon={faPhone}
            style={{width: '20px', height: '20px'}}
          />
          <a href={`tel:${phone1}`} className="text-sky-600 underline">
            {phone1}
          </a>
        </div>

        <div className="flex items-start gap-2 mt-2">
          <FontAwesomeIcon
            className="text-gray-600 mt-1 mr-1"
            icon={faCarSide}
            style={{width: '20px', height: '20px'}}
          />
          <li>{distance && <b>{`${distance.toFixed(2)} KM`}</b>}</li>
        </div>

        <li>
          <button
            onClick={() => handleClickShowOnMap(pharmacyId)}
            className="btn bg-blue w-full p-2"
          >
            Haritada Goster
          </button>
        </li>
      </ul>
    </div>
  );
}

export default PharmacyCard;
