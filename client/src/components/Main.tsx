import {useState} from 'react';
import PharmacyTable from './PharmacyTable';
import Select from 'react-select';
import {Pharmacy} from '../types/commonTypes';
import cities from '../data/cities';

function Main() {
  const [pharmacies, setPharmacies] = useState<Pharmacy[] | null>(null);

  const cityOptions = cities.map((city) => {
    return {value: city.citySlug, label: city.cityName};
  });

  return (
    <div>
      <div className="border-x">
        <div className="grid grid-cols-3 gap-10 px-3 py-5">
          <Select options={cityOptions} placeholder={'İl Seç'} />
          <Select options={cityOptions} placeholder={'Tüm ilçeler'} />
          <button className=" bg-green-500">Ara</button>
        </div>
      </div>
      <PharmacyTable pharmacies={pharmacies} setPharmacies={setPharmacies} />
    </div>
  );
}

export default Main;
