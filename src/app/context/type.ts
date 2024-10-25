import {
  ProductEntityGetAll,
  ProductEntityGetById,
} from 'app/api/products/types';
import { LoadingState } from 'app/features/slice/types';

export type GeneralContextType = {
  categorias: any[];
  loadingCategorias: LoadingState;
  loadingUpdateProduct: LoadingState;
  productoGetById: ProductEntityGetById;
  loadingProductoGetById: LoadingState;
  darkMode: boolean;
  toggleDarkMode: () => void;
  themeColors: {
    background: string;
    text: string;
    colorPrimary: string;
    colorTextBase: string;
    colorTextLightSolid: string;
    colorBorderCustom: string;
  };
  productosSaveLoading: LoadingState;
};
