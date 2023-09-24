import React, {useEffect} from 'react';

import PharmacyTable from './PharmacyTable';

function Main() {
  return (
    <div>
      <div>
        <form action="">
          <input className="bg-black" type="text" placeholder="Sehir" />
        </form>
      </div>
      <PharmacyTable />
    </div>
  );
}

export default Main;
