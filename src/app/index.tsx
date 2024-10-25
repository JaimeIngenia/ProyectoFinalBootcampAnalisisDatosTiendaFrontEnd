import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from 'styles/global-styles';
import { HomePage } from './pages/HomePage';
// import { NotFoundPage } from './components/NotFoundPage/Loadable';
import SideBarMenuPage from './features/sideBarMenuPage';
import { useState } from 'react';
import { ListaProductos } from './pages/listaProductos';
import AgregarProducto from './pages/agregarProducto';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';
import { GeneralContainer, GeneralContainer2 } from './components/containers';
import { useGeneralContext } from './context/GeneralContext';

export function App() {
  const {
    darkMode,
    categorias,
    loadingCategorias,
    themeColors,
    productosSaveLoading,
  } = useGeneralContext();
  return (
    <BrowserRouter>
      <GeneralContainer2 theme={themeColors}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <SideBarMenuPage />
          {/* <SideBarMenuPage backgroundCustom="#000B2A" /> */}

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/listaProductos" element={<ListaProductos />} />
            <Route path="/agregarProductos" element={<AgregarProducto />} />
            <Route path="/editarProducto/:id" element={<AgregarProducto />} />
          </Routes>
        </div>
      </GeneralContainer2>

      <GlobalStyle />
    </BrowserRouter>
  );
}
