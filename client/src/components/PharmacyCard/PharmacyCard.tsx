import './PharmacyCard.style.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faHouseMedical,
  faLocationDot,
  faMapLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import {fetchPharmacy} from '../../services/api';

interface PharmacyCardProps {
  pharmacyName: string;
  city: string;
  county: string;
  address: string;
  phone1: string;
  pharmacyId: number;
}

function PharmacyCard({
  pharmacyName,
  city,
  county,
  address,
  phone1,
  pharmacyId,
}: PharmacyCardProps) {
  const handleClickShowOnMap = async () => {
    const {data}: any = await fetchPharmacy(pharmacyId.toString());

    // found in google

    if (data.isFound) {
      const pharmacy = data.data;

      const {location} = pharmacy.geometry;
      //window.open(
      //  `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}&query_place_id=${pharmacy.place_id}`,
      //  '_blank'
      //);

      window.open(`comgooglemaps://?q=${pharmacy.formatted_address}`);
      //console.log(data);
      //console.log(data.pharmayName);
      //console.log(
      //  data?.name,
      //  data?.formatted_address,
      //  data?.geometry?.location
      //);
    } else {
      const pharmacy = data.data;
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${pharmacy.latitude},${pharmacy.longitude}`,
        '_blank'
      );
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
      <ul className="flex flex-col gap-3  h-full">
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
          <li>{phone1}</li>
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

interface RowProps {
  label: string;
  content: string;
}

const Row = ({label, content}: RowProps) => {
  return (
    <div className="flex mb-3">
      <div className="label-container w-3/12">
        <p>
          <strong>{label}:</strong>
        </p>
      </div>
      <div className="content-container w-9/12">
        <p>{content}</p>
      </div>
    </div>
  );
};
