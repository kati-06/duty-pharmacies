import React from 'react';
import {BrowserRouter, Routes, Route, Redirect} from 'react-router-dom';

// components
import Navbar from './components/Navbar';
import Main from './components/Main/Main';

function App() {
  return (
    <div className="app h-[100vh] ">
      <Navbar />
      <main className="max-w-[1200px]" style={{margin: '0 auto'}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />

            <Route path="/:city" element={<Main />} />

            <Route path="/:city/:county" element={<Main />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </BrowserRouter>
      </main>

      {/*footer will be added*/}
    </div>
  );
}

export default App;
