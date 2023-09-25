import Select from 'react-select';
import './PharmacyForm.style.css';

interface County {
  countyName: string;
  countySlug: string;
}

interface PharmacyFormProps {
  cityOptions: object[];
  countyOptions: object[];
  handleChangeCity(selectedOption: any): void;
  handleChangeCounty(selectedOption: any): void;
  //setSelectedCity: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit(): void;
  disabled: boolean;
}

function PharmacyForm({
  cityOptions,
  countyOptions,
  handleSubmit,
  handleChangeCity,
  handleChangeCounty,
  //setSelectedCity,
  disabled,
}: PharmacyFormProps) {
  return (
    <div className="border-x">
      <div className="grid grid-cols-3 gap-10 px-3 py-5">
        <Select
          options={cityOptions}
          placeholder={'İl seç'}
          onChange={handleChangeCity}
        />
        <Select
          options={countyOptions}
          placeholder={'Tüm ilçeler'}
          noOptionsMessage={() => 'Lütfen il seçiniz'}
          onChange={handleChangeCounty}
          isClearable={true}
        />
        <button
          onClick={handleSubmit}
          className="bg-green-500"
          disabled={disabled}
        >
          Ara
        </button>
      </div>
    </div>
  );
}

export default PharmacyForm;
