import React from 'react';
import { Navigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import Header from './components/header/Header.js';
import Footer from './components/footer/Footer.js';
import Catalog from './features/contacts/catalog/Catalog.js';
import ErrorBoundary from './app/ErrorBoundary.js';

import './App.scss';

function App() {
  return (
    <div className="container">
      <Header />
      <ErrorBoundary>
        <Routes>
          <Route path='/' element={<Navigate to={'/contacts'} />} />
          <Route path='/contacts/*' element={<Catalog />} />
        </Routes>
      </ErrorBoundary>
      <Footer />
    </div>
  );
}

export default App;
