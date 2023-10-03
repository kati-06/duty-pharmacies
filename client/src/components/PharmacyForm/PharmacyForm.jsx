import Select from 'react-select';
import './PharmacyForm.style.css';

function PharmacyForm({
  cityOptions,
  countyOptions,
  handleSubmit,
  handleChangeCity,
  handleChangeCounty,
  selectedCity,
  selectedCounty,
  disabled,
}) {
  return (
    <div className="border-x">
      <div className="grid grid-cols-5 gap-5 px-3 py-5">
        <div className="col-span-2">
          <Select
            options={cityOptions}
            placeholder={'İl seç'}
            onChange={handleChangeCity}
            styles={{
              menu: (provided) => ({
                ...provided,
                width: 'auto',
              }),
              option: (provided) => ({
                ...provided,
                whiteSpace: 'nowrap',
              }),
            }}
          />
        </div>
        <div className="col-span-2">
          <Select
            options={countyOptions}
            placeholder={'Tüm ilçeler'}
            noOptionsMessage={() => 'Lütfen il seçiniz'}
            onChange={handleChangeCounty}
            isClearable={true}
            value={
              selectedCounty
                ? {value: selectedCounty, label: selectedCounty}
                : null
            }
            styles={{
              menu: (provided) => ({
                ...provided,
                width: 'auto',
              }),
              option: (provided) => ({
                ...provided,
                whiteSpace: 'nowrap',
              }),
              placeholder: (provided) => ({
                ...provided,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }),
            }}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="btn bg-green col-span-1"
          disabled={disabled || !selectedCity ? true : false}
        >
          Ara
        </button>
      </div>
    </div>
  );
}

export default PharmacyForm;
