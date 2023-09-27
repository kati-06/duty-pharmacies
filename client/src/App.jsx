import React from 'react';

// components
import Navbar from './components/Navbar';
import Main from './components/Main/Main';

function App() {
  return (
    <div className="app h-[100vh] ">
      <Navbar />
      <div className="max-w-[1200px]" style={{margin: '0 auto'}}>
        <Main />
      </div>
    </div>
  );
}

export default App;
