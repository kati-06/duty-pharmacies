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
      <div className="grid grid-cols-3 gap-5 px-3 py-5">
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
          value={
            selectedCounty
              ? {value: selectedCounty, label: selectedCounty}
              : null
          }
          styles={{
            control: (provided) => ({
              ...provided,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }),
            placeholder: (provided) => ({
              ...provided,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }),
          }}
        />

        <button
          onClick={handleSubmit}
          className="btn bg-green"
          disabled={disabled || !selectedCity ? true : false}
        >
          Ara
        </button>
      </div>
    </div>
  );
}

export default PharmacyForm;
