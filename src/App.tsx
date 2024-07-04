import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import { AppRoutes } from './routes';

function App() {
  return (
    <Router>
      <NavBar />
      <div style={{ marginTop: '90px' }}>
        <Routes>
          {AppRoutes.map(([path, Component]) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
