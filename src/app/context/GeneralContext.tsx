import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import { useSelector } from 'react-redux';
import { useSlice } from 'app/features/slice';
import { GeneralContextType } from './type';
import {
  categoriasSelector,
  categoriasSelectorLoading,
  productoSaveSelectorLoading,
  productosGetByIdLoadingSelector,
  productosGetByIdSelector,
  productosUpdateLoadingSelector,
} from 'app/features/slice/selectors';

export const GeneralContext = createContext<GeneralContextType | undefined>(
  undefined,
);

export const GeneralProvider = ({ children }: { children: ReactNode }) => {
  const { actions } = useSlice();
  // Usamos los selectores de Redux-Saga
  const categorias = useSelector(categoriasSelector);
  const loadingCategorias = useSelector(categoriasSelectorLoading);
  const productosSaveLoading = useSelector(productoSaveSelectorLoading);
  const loadingUpdateProduct = useSelector(productosUpdateLoadingSelector);
  const productoGetById = useSelector(productosGetByIdSelector);
  const loadingProductoGetById = useSelector(productosGetByIdLoadingSelector);
  // Estado y función para el modo oscuro
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const toggleDarkMode = useCallback(() => {
    setDarkMode(prevMode => !prevMode);
  }, []);
  // const lightTheme = {
  //   background: '#ffffff',
  //   text: '#333333', // Buen contraste con el fondo blanco
  //   colorPrimary: '#1A73E8', // Un tono rojo/marrón fuerte, que puede combinar bien con el blanco
  //   colorTextBase: '#353434', // Puede ser usado para texto destacado
  //   colorTextLightSolid: 'white', // Texto claro para botones o fondo oscuro
  // };
  // const darkTheme = {
  //   background: '#090D1F', //'#000B2A', // Fondo oscuro, que funciona bien
  //   text: '#ffffff', // Texto claro para buen contraste en fondo oscuro
  //   colorPrimary: '#000B2A', // Un azul más claro para elementos interactivos como botones
  //   colorTextBase: '#000B2A', // Un gris claro para el texto general en lugar de negro
  //   colorTextLightSolid: 'white', // Texto claro para destacar en botones oscuros
  // };
  const lightTheme = {
    background: '#FFFFFF', // Fondo claro
    text: '#151837', // Letras oscuras 2
    colorPrimary: '#0177FB', // Azul claro para combinar con el fondo
    colorTextBase: '#A5B3CD', // Letras generales
    colorTextLightSolid: '#151837', // Letras oscuras para resaltar
  };

  const darkTheme = {
    background: '#090D1F', // Fondo oscuro
    text: '#FEFEFE', // Letras claras
    colorPrimary: '#0276F9', // Azul para botones y elementos interactivos
    colorTextBase: '#A5B3CD', // Letras generales
    colorTextLightSolid: '#FEFEFE', // Texto claro en elementos oscuros
  };

  // Escogemos el tema según darkMode
  const themeColors = darkMode ? darkTheme : lightTheme;
  // Proveedor del contexto
  return (
    <GeneralContext.Provider
      value={{
        categorias,
        loadingCategorias,
        loadingUpdateProduct,
        productoGetById,
        loadingProductoGetById,
        darkMode,
        toggleDarkMode,
        themeColors,
        productosSaveLoading,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useGeneralContext = () => {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error(
      'useGeneralContext debe ser usado dentro de un GeneralProvider',
    );
  }
  return context;
};
