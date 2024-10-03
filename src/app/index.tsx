import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import SideBarMenuPage from './features/sideBarMenuPage';
import { useState } from 'react';

export function App() {
  const { i18n } = useTranslation();
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);

  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBarMenuPage />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      {/* <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <GlobalStyle /> */}
    </BrowserRouter>
  );
}
