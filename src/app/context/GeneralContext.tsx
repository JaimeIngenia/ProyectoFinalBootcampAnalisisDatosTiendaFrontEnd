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
  // Estado y función para el modo oscuro
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const toggleDarkMode = useCallback(() => {
    setDarkMode(prevMode => !prevMode);
  }, []);
  const lightTheme = {
    background: '#ffffff',
    text: '#333333', // Buen contraste con el fondo blanco
    colorPrimary: '#1A73E8', // Un tono rojo/marrón fuerte, que puede combinar bien con el blanco
    colorTextBase: '#353434', // Puede ser usado para texto destacado
    colorTextLightSolid: 'white', // Texto claro para botones o fondo oscuro
  };
  const darkTheme = {
    background: '#000B2A', // Fondo oscuro, que funciona bien
    text: '#ffffff', // Texto claro para buen contraste en fondo oscuro
    colorPrimary: '#000B2A', // Un azul más claro para elementos interactivos como botones
    colorTextBase: '#000B2A', // Un gris claro para el texto general en lugar de negro
    colorTextLightSolid: 'white', // Texto claro para destacar en botones oscuros
  };
  // Escogemos el tema según darkMode
  const themeColors = darkMode ? darkTheme : lightTheme;
  // Proveedor del contexto
  return (
    <GeneralContext.Provider
      value={{
        categorias,
        loadingCategorias,
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
