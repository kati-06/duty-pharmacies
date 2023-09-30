import './MapSelectionModal.style.css';

function MapSelectionModal() {
  return (
    <div
      className="absolute  flex flex-col p-5 bg-blue w-80  shadow-2xl shadow-black "
      style={{transform: 'translate(-50%,-0%)'}}
    >
      <p className="mb-3 text-white font-semibold">
        Lutfen bir harita uygulamasi secin
      </p>
      <button className="button">Google Maps</button>
      <button className="button">Apple Maps</button>
      <button className="button">Yandex Maps</button>
    </div>
  );
}

export default MapSelectionModal;
