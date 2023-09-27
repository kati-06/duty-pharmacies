import React from 'react';

// components
import Navbar from './components/Navbar';
import Main from './components/Main/Main';

function App() {
  return (
    <div className="app h-[100vh] ">
      <Navbar />
      <main className="max-w-[1200px]" style={{margin: '0 auto'}}>
        <Main />
      </main>

      {/*footer will be added*/}
    </div>
  );
}

export default App;
