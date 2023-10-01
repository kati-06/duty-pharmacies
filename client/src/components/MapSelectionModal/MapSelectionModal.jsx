import './MapSelectionModal.style.css';

function MapSelectionModal({handleSelectMap, setShowModal}) {
  return (
    <div
      className="modal-container  flex flex-col p-5  bg-blue w-80  shadow-2xl shadow-black "
      style={{transform: 'translate(-50%,-0%)'}}
    >
      <div onClick={() => setShowModal(false)} className="mb-5 cursor-pointer">
        <div className="absolute right-[10px] top-[10px]">X</div>
      </div>
      <p className="mb-5 font-semibold text-black">
        Lutfen bir harita uygulamasi secin
      </p>
      <button onClick={() => handleSelectMap('google')} className="button">
        Google Maps
      </button>
      <button onClick={() => handleSelectMap('apple')} className="button">
        Apple Maps
      </button>
      <button onClick={() => handleSelectMap('yandex')} className="button">
        Yandex Maps
      </button>
    </div>
  );
}

export default MapSelectionModal;
