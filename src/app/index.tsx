import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from 'styles/global-styles';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import SideBarMenuPage from './features/sideBarMenuPage';
import { useState } from 'react';
import { ListaProductos } from './pages/listaProductos';

export function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBarMenuPage backgroundCustom="#000B2A" />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/listaProductos" element={<ListaProductos />} />
        </Routes>
      </div>

      <GlobalStyle />
    </BrowserRouter>
  );
}
