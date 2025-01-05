import { ClienteEntity } from 'app/api/clientes/types';
import {
  DetalleVentaSpecialEntity,
  IDetalleVentaSimple,
  VentaSimplifyEntity,
} from 'app/api/detalleVenta/types';
import {
  ProductEntityGetAll,
  ProductEntityGetById,
} from 'app/api/products/types';
import { GetUsuarioSimpleResponse } from 'app/api/usuarios/types';
import { VentaGetByIdEntity } from 'app/api/venta/types';
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
  login: boolean;
  loadingLogin: LoadingState;
  loadingLogout: LoadingState;
  usuarioSimpleGetById: GetUsuarioSimpleResponse;
  loadingusuarioSimpleGetById: LoadingState;
  loadingRoles: LoadingState;
  roles: any[];
  sucursales: any[];
  loadingSucursales: LoadingState;
  empleados: any[];
  loadinEmpleados: LoadingState;
  usuariosSaveLoading: LoadingState;
  clientes: any[];
  loadinClientes: LoadingState;
  ventasSaveLoading: LoadingState;
  productos: ProductEntityGetAll[];
  loadingProductos: LoadingState;
  detalleVentaSaveLoading: LoadingState;
  clienteSaveLoading: LoadingState;
  movimientoInventarioSaveLoading: LoadingState;
  fidelizacionSaveLoading: LoadingState;
  clienteGetById: ClienteEntity;
  loadingClienteGetById: LoadingState;
  loadingUpdateClient: LoadingState;
  detalleVentaGetById: IDetalleVentaSimple;
  loadingDetalleVentaGetById: LoadingState;
  ventas: VentaSimplifyEntity[];
  loadinVentas: LoadingState;
  ventaGetById: VentaGetByIdEntity;
  loadingVentaGetById: LoadingState;
  detalleVentaGetAllById: DetalleVentaSpecialEntity[];
  loadingDetalleVentaGetAllById: LoadingState;
  loadingDeleteVenta: LoadingState;
  loadingUpdateDetalleVenta: LoadingState;
  loadingDeleteDetalleVenta: LoadingState;
  loadingUpdateVenta: LoadingState;
  isMenuCollapsed: boolean;
  preciosSaveLoading: LoadingState;
};
