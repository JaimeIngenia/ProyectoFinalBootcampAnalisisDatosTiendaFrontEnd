import { LoadingState } from 'app/features/slice/types';

export type GeneralContextType = {
  categorias: any[];
  loadingCategorias: LoadingState;
  darkMode: boolean;
  toggleDarkMode: () => void;
  themeColors: {
    background: string;
    text: string;
    colorPrimary: string;
    colorTextBase: string;
    colorTextLightSolid: string;
  };
};
