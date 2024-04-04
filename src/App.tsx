import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import React from 'react';
import { AppRoutes } from './routes';

function App() {
  return (
    <Router>
      <NavBar />
      <div style={{ marginTop: '90px' }}>
        <Routes>
          {AppRoutes.map(([path, Component], index) => (
            <Route key={index + path} path={path} element={<Component />} />
          ))}
        </Routes>
      </div>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
