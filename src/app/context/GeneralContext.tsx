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
  loginLoadingSelector,
  LoginSelector,
  logoutLoadingSelector,
  productoSaveSelectorLoading,
  productosGetByIdLoadingSelector,
  productosGetByIdSelector,
  productosUpdateLoadingSelector,
  ususarioSimpleGetByIdLoadingSelector,
  ususarioSimpleGetByIdSelector,
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
  const usuarioSimpleGetById = useSelector(ususarioSimpleGetByIdSelector);
  const loadingusuarioSimpleGetById = useSelector(
    ususarioSimpleGetByIdLoadingSelector,
  );
  const login = useSelector(LoginSelector);
  const loadingLogin = useSelector(loginLoadingSelector);
  const loadingLogout = useSelector(logoutLoadingSelector);

  // Estado y función para el modo oscuro
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const toggleDarkMode = useCallback(() => {
    setDarkMode(prevMode => !prevMode);
  }, []);

  const lightTheme = {
    background: '#FFFFFF', // Fondo claro
    text: '#151837', // Letras oscuras 2
    colorPrimary: '#0177FB', // Azul claro para combinar con el fondo
    colorTextBase: '#A5B3CD', // Letras generales
    colorTextLightSolid: '#151837', // Letras oscuras para resaltar
    colorBorderCustom: '#A5B3CD',
  };

  const darkTheme = {
    background: '#090D1F', // Fondo oscuro
    text: '#FEFEFE', // Letras claras
    colorPrimary: '#0276F9', // Azul para botones y elementos interactivos
    colorTextBase: '#A5B3CD', // Letras generales
    colorTextLightSolid: '#FEFEFE', // Texto claro en elementos oscuros
    colorBorderCustom: '#101527',
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
        login,
        loadingLogin,
        loadingLogout,
        usuarioSimpleGetById,
        loadingusuarioSimpleGetById,
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
// function logoutLoading(state: DefaultRootState): unknown {
//   throw new Error('Function not implemented.');
// }
