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
}

function PharmacyCard({pharmacyName, city, county}: PharmacyCardProps) {
  return (
    <div className="pharmacy-card p-5 w-full">
      <div className="flex items-start  gap-2 mb-3">
        <FontAwesomeIcon
          className="text-gray-600 "
          size="xl"
          icon={faHouseMedical}
        />
        <h1 className="text-xl font-bold w-full overflow-hidden whitespace-nowrap text-ellipsis">
          {pharmacyName}
        </h1>
      </div>
      <ul className="flex flex-col gap-3">
        <div className="flex items-start  gap-2 mt-2">
          <FontAwesomeIcon
            className="text-gray-600 mt-1 "
            icon={faLocationDot}
          />
          <li>
            {' '}
            {city} - {county}
          </li>
        </div>
        <div className="flex items-start  gap-2 mt-2">
          <FontAwesomeIcon
            className="text-gray-600 mt-1 "
            icon={faMapLocationDot}
          />
          <li>
            Aşağı Öveçler Mahallesi, Kabil Caddesi No:28/A Çankaya / Ankara
          </li>
        </div>
        <div className="flex items-start  gap-2 mt-2">
          <FontAwesomeIcon className="text-gray-600 mt-1 " icon={faPhone} />
          <li>0(312)287-32-26</li>
        </div>

        <li>
          <button className="bg-blue-300 w-full p-2">Haritada Goster</button>
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

// <div className="flex">
//        <div className="col-3">
//          <label className="font-bold" htmlFor="">
//            Eczane:
//          </label>
//        </div>
//        <div className="col-9">
//          <p>Ankara Eczanesi</p>
//        </div>
//      </div>
//      <div className="flex gap-3">
//        <label className="font-bold" htmlFor="">
//          Adres:
//        </label>
//        <p>
//          Yıldırım Mahallesi, Dr.Neslihan Özenli Caddesi, No:26/A Akyurt /
//          Ankara » Akyurt Devlet Hastanesi karşısı
//        </p>
//      </div>
//      <div className="flex gap-3">
//        <label className="font-bold" htmlFor="">
//          Telefon:
//        </label>
//        <p>0 (312) 844-00-14</p>
//      </div>
