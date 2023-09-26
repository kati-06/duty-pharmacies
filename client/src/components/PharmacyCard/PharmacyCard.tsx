import './PharmacyCard.style.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faHouseMedical,
  faLocationDot,
  faMapLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';

interface PharmacyCardProps {
  pharmacyName: string;
  city: string;
  county: string;
  address: string;
  phone1: string;
}

function PharmacyCard({
  pharmacyName,
  city,
  county,
  address,
  phone1,
}: PharmacyCardProps) {
  const handleClickShowOnMap = () => {};

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
