import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import {
  categoriasSelector,
  categoriasSelectorLoading,
} from 'app/features/slice/selectors'; // Ajusta la ruta según tu proyecto
import { useSelector } from 'react-redux';
import { LoadingState } from 'app/features/slice/types';
import { useSlice } from 'app/features/slice';

export type GeneralContextType = {
  categorias: any[];
  loadingCategorias: LoadingState;
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export const GeneralContext = createContext<GeneralContextType | undefined>(
  undefined,
);

export const GeneralProvider = ({ children }: { children: ReactNode }) => {
  const { actions } = useSlice();
  // Usamos los selectores de Redux-Saga
  const categorias = useSelector(categoriasSelector);
  const loadingCategorias = useSelector(categoriasSelectorLoading);

  // Estado y función para el modo oscuro
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prevMode => !prevMode);
  }, []);

  // Proveedor del contexto
  return (
    <GeneralContext.Provider
      value={{
        categorias,
        loadingCategorias,
        darkMode,
        toggleDarkMode,
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
