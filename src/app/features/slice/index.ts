import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { Saga } from './saga';
import { GeneralStatesReduxSaga, ResponseState, Entity } from './types';
import { GeneralStatesReduxSaga_empty } from './emptyTypes';
import {
  ProductEntityGetAll,
  ProductEntityGetById,
} from 'app/api/products/types';
import { ProductEntitySave } from 'app/pages/agregarProducto/utils/types';
import {
  GetUsuarioSimpleResponse,
  UsuarioEntity,
} from 'app/api/usuarios/types';
import { ClienteEntity, ClienteEntitySave } from 'app/api/clientes/types';
import { MovimientoInventarioEntitySave } from 'app/api/movimientoInventario/types';
import {
  DetalleVentaSpecialEntity,
  IDetalleVentaSimple,
  VentaSimplifyEntity,
} from 'app/api/detalleVenta/types';
import { VentaGetByIdEntity } from 'app/api/venta/types';

export const initialState: GeneralStatesReduxSaga =
  GeneralStatesReduxSaga_empty;

const slice = createSlice({
  name: 'generalStates',
  initialState,
  reducers: {
    //Roles
    fetchRolesSuccess(state, action: PayloadAction<Entity[]>) {
      state.roles = action.payload;
      state.loadingStates.rolesLoading = {
        state: ResponseState.Finished,
        status: true,
      };
    },

    getAllSkillsByRoleIdFailed(state, action: PayloadAction<any>) {
      state.loadingStates.rolesLoading = {
        state: ResponseState.Finished,
        status: false,
        message: action.payload,
      };
    },

    loadRoles(state, actions: PayloadAction<ResponseState>) {
      state.loadingStates.rolesLoading = {
        state: actions.payload,
      };
    },

    //Categorias
    fetchCategoriaSuccess(state, action: PayloadAction<Entity[]>) {
      state.categorias = action.payload;
      state.loadingStates.categoriasLoading = {
        state: ResponseState.Finished,
        status: true,
      };
    },

    getAllcategoriasFailed(state, action: PayloadAction<any>) {
      state.loadingStates.categoriasLoading = {
        state: ResponseState.Finished,
        status: false,
        message: action.payload,
      };
    },

    loadCategorias(state, actions: PayloadAction<ResponseState>) {
      state.loadingStates.categoriasLoading = {
        state: actions.payload,
      };
    },

    // Products
    reducerProductsSuccess(
      state,
      action: PayloadAction<ProductEntityGetAll[]>,
    ) {
      state.productos = action.payload;
      state.loadingStates.productosLoading = {
        state: ResponseState.Finished,
        status: true,
      };
    },

    reducerProductsFailed(state, action: PayloadAction<any>) {
      state.loadingStates.productosLoading = {
        state: ResponseState.Finished,
        status: false,
        message: action.payload,
      };
    },

    loadProducts(state, actions: PayloadAction<ResponseState>) {
      state.loadingStates.productosLoading = {
        state: actions.payload,
      };
    },
    // Save Products
    reducerSaveProductSuccess(state, action: PayloadAction<ProductEntitySave>) {
      state.productosGuardados = action.payload;
      state.loadingStates.productosSaveLoading = {
        state: ResponseState.Finished,
        status: true,
      };
    },

    reducerSaveProductFailure(state, action: PayloadAction<any>) {
      state.loadingStates.productosSaveLoading = {
        state: ResponseState.Finished,
        status: false,
        message: action.payload,
      };
    },

    loadSaveProducts(state, actions: PayloadAction<ResponseState>) {
      state.loadingStates.productosSaveLoading = {
        state: actions.payload,
      };
    },
    // Delete Products
    reducerDeleteProductSuccess(state, action: PayloadAction<string>) {
      state.productos = state.productos.filter(
        producto => producto.id !== action.payload,
      );
      state.loadingStates.productosDeleteLoading = {
        state: ResponseState.Finished,
        status: true,
      };
    },

    reducerDeleteProductFailure(state, action: PayloadAction<any>) {
      state.loadingStates.productosDeleteLoading = {
        state: ResponseState.Finished,
        status: false,
        message: action.payload,
      };
    },

    loadDeleteProducts(state, action: PayloadAction<ResponseState>) {
      state.loadingStates.productosDeleteLoading = {
        state: action.payload,
      };
    },
    // Update Products
    reducerUpdateProductSuccess(
      state,
      action: PayloadAction<ProductEntityGetAll>,
    ) {
      const updatedProduct = action.payload;
      state.productos = state.productos.map(producto =>
        producto.id === updatedProduct.id ? updatedProduct : producto,
      );

      state.loadingStates.productosUpdateLoading = {
        state: ResponseState.Finished,
        status: true,
      };
    },

    reducerUpdateProductFailure(state, action: PayloadAction<string>) {
      state.loadingStates.productosUpdateLoading = {
        state: ResponseState.Finished,
        status: false,
        message: action.payload,
      };
    },

    loadUpdateProducts(state, action: PayloadAction<ResponseState>) {
      state.loadingStates.productosUpdateLoading = {
        state: action.payload,
      };
    },

    // Get Product By ID

    reducerGetProductByIdSuccess(
      state,
      action: PayloadAction<ProductEntityGetById>,
    ) {
      state.productoById = action.payload;

      state.loadingStates.productosGetByIdLoading = {
        state: ResponseState.Finished,
        status: true,
      };
    },

    reducerGetProductByIdFailure(state, action: PayloadAction<string>) {
      state.loadingStates.productosGetByIdLoading = {
        state: ResponseState.Finished,
        status: false,
        message: action.payload,
      };
    },

    loadGetProductById(state, action: PayloadAction<ResponseState>) {
      state.loadingStates.productosGetByIdLoading = {
        state: action.payload,
      };
    },

    //Users

    reducerLoginSuccess(state, action: PayloadAction<UsuarioEntity>) {
      state.loginSuccess = true; // Marcar el login como exitoso
      state.loadingStates.loginLoading = {
        state: ResponseState.Finished,
        status: true,
        message: 'Inicio de sesión exitoso',
      };
    },

    reducerLoginFailure(state, action: PayloadAction<any>) {
      state.loginSuccess = false; // Marcar el login como fallido
      state.loadingStates.loginLoading = {
        state: ResponseState.Finished,
        status: false,
        message: 'Error en el inicio de sesión',
      };
    },

    loadLogin(state, action: PayloadAction<ResponseState>) {
      state.loadingStates.loginLoading = {
        state: action.payload,
      };
    },
    //Users LogOut

    reducerLogoutSuccess(state, action: PayloadAction<string>) {
      state.loginSuccess = false; // Marcar el login como exitoso
      state.loadingStates.logoutLoading = {
        state: ResponseState.Finished,
        status: true,
        message: action.payload,
      };
    },

    reducerLogoutFailure(state, action: PayloadAction<any>) {
      //state.loginSuccess = false; // Marcar el login como fallido
      state.loadingStates.logoutLoading = {
        state: ResponseState.Finished,
        status: false,
        message: 'Error en el cierre de sesión',
      };
    },

    loadLogout(state, action: PayloadAction<ResponseState>) {
      state.loadingStates.logoutLoading = {
        state: action.payload,
      };
    },
    //Users getById

    reducerGetUserByIdSuccess(
      state,
      action: PayloadAction<GetUsuarioSimpleResponse>,
    ) {
      state.userSimpleById = action.payload;
      state.loadingStates.userSimpleByIdLoading = {
        state: ResponseState.Finished,
        status: true,
        message: 'Usuario traido existosamente',
      };
    },

    reducerGetUserByIdFailure(state, action: PayloadAction<any>) {
      state.loadingStates.userSimpleByIdLoading = {
        state: ResponseState.Finished,
        status: false,
        message: 'Error en la traida del usuario',
      };
    },

    loadUserById(state, action: PayloadAction<ResponseState>) {
      state.loadingStates.userSimpleByIdLoading = {
        state: action.payload,
      };
    },

    //SaveUsuario

    saveUsuarioSuccess(state) {
      state.loadingStates.usuariosSaveLoading = {
        state: ResponseState.Finished,
        status: true,
      };
    },

    saveUsuarioFailed(state, action: PayloadAction<any>) {
      state.loadingStates.usuariosSaveLoading = {
        state: ResponseState.Finished,
        status: false,
        message: action.payload,
      };
    },

    loadSaveUsuario(state, action: PayloadAction<ResponseState>) {
      state.loadingStates.usuariosSaveLoading = {
        state: action.payload,
      };
    },

    //Sucrusales

    fetchSucursalesSuccess(state, action: PayloadAction<Entity[]>) {
      state.sucursales = action.payload;
      state.loadingStates.sucursalesLoading = {
        state: ResponseState.Finished,
        status: true,
      };
    },

    getAllSucursalesFailed(state, action: PayloadAction<any>) {
      state.loadingStates.sucursalesLoading = {
        state: ResponseState.Finished,
        status: false,
        message: action.payload,
      };
    },

    loadSucursales(state, action: PayloadAction<ResponseState>) {
      state.loadingStates.sucursalesLoading = {
        state: action.payload,
      };
    },
    // Empleados

    fetchEmpleadosSuccess(state, action: PayloadAction<Entity[]>) {
      state.empleados = action.payload; // Asume que hay un campo empleados en el estado
      state.loadingStates.empleadosLoading = {
        state: ResponseState.Finished,
        status: true,
      };
    },

    // Acción para manejar errores al cargar empleados
    getAllEmpleadosFailed(state, action: PayloadAction<string>) {
      state.loadingStates.empleadosLoading = {
        state: ResponseState.Finished,
        status: false,
        message: action.payload,
      };
    },

    // Iniciar la carga de empleados
    loadEmpleados(state, action: PayloadAction<ResponseState>) {
      state.loadingStates.empleadosLoading = {
        state: action.payload,
      };
    },

    //Clientes

    // -> GetAll

    fetchClientesSuccess(state, action: PayloadAction<ClienteEntity[]>) {
      state.clientes = action.payload; // Actualiza el estado con los clientes obtenidos
      state.loadingStates.clientesLoading = {
        state: ResponseState.Finished,
        status: true,
      };
    },

    getAllClientesFailed(state, action: PayloadAction<any>) {
      state.loadingStates.clientesLoading = {
        state: ResponseState.Finished,
        status: false,
        message: action.payload,
      };
    },

    loadClientes(state, action: PayloadAction<ResponseState>) {
      state.loadingStates.clientesLoading = {
        state: action.payload, // Cambia el estado de carga
      };
    },

    //Ventas

    saveVentaSuccess(state) {
      state.loadingStates.ventasSaveLoading = {
        state: ResponseState.Finished,
        status: true,
      };
    },

    saveVentaFailed(state, action: PayloadAction<any>) {
      state.loadingStates.ventasSaveLoading = {
        state: ResponseState.Finished,
        status: false,
        message: action.payload,
      };
    },

    loadSaveVenta(state, action: PayloadAction<ResponseState>) {
      state.loadingStates.ventasSaveLoading = {
        state: action.payload,
      };
    },

    //Detalle Ventas
    loadSaveDetalleVenta(state, action: PayloadAction<ResponseState>) {
      state.loadingStates.detalleVentaSaveLoading = {
        state: action.payload,
        status: false,
      };
    },
    saveDetalleVentaSuccess(state, action: PayloadAction<any>) {
      state.loadingStates.detalleVentaSaveLoading = {
        state: ResponseState.Finished,
        status: true,
      };
    },
    saveDetalleVentaFailed(state, action: PayloadAction<string>) {
      state.loadingStates.detalleVentaSaveLoading = {
        state: ResponseState.Finished,
        status: false,
        message: action.payload,
      };
    },

    //Clientes
    // -> Save
    reducerSaveClienteSuccess(state, action: PayloadAction<ClienteEntitySave>) {
      // state.clientesGuardados = action.payload;
      state.loadingStates.clienteSaveLoading = {
        state: ResponseState.Finished,
        status: true,
      };
    },
    reducerSaveClienteFailure(state, action: PayloadAction<any>) {
      state.loadingStates.clienteSaveLoading = {
        state: ResponseState.Finished,
        status: false,
        message: action.payload,
      };
    },
    loadSaveCliente(state, action: PayloadAction<ResponseState>) {
      state.loadingStates.clienteSaveLoading = {
        state: action.payload,
      };
    },

    //Movimiento Inventario - Save

    reducerSaveMovimientoInventarioSuccess(
      state,
      action: PayloadAction<MovimientoInventarioEntitySave>,
    ) {
      // state.savedMovimientoInventario = action.payload;
      state.loadingStates.movimientoInventarioSaveLoading = {
        state: ResponseState.Finished,
        status: true,
      };
    },
    reducerSaveMovimientoInventarioFailure(state, action: PayloadAction<any>) {
      state.loadingStates.movimientoInventarioSaveLoading = {
        state: ResponseState.Finished,
        status: false,
        message: action.payload.message,
      };
    },

    loadSaveMovimientoInventario(state, action: PayloadAction<ResponseState>) {
      state.loadingStates.movimientoInventarioSaveLoading = {
        state: action.payload,
      };
    },

    // Fidelización save

    saveFidelizacionSuccess(state, action) {
      state.loadingStates.fidelizacionSaveLoading = {
        state: ResponseState.Finished,
        status: true,
        message: 'Fidelización guardada exitosamente',
      };
    },
    saveFidelizacionFailure(state, action) {
      state.loadingStates.fidelizacionSaveLoading = {
        state: ResponseState.Finished,
        status: false,
        message: action.payload,
      };
    },
    loadSaveFidelizacion(state, action) {
      state.loadingStates.fidelizacionSaveLoading = {
        state: action.payload,
      };
    },

    // ClientById

    reducerGetClientByIdSuccess(state, action: PayloadAction<ClienteEntity>) {
      state.clienteById = action.payload;
      state.loadingStates.clienteGetByIdLoading = {
        state: ResponseState.Finished,
        status: true,
      };
    },

    reducerGetClientByIdFailure(state, action: PayloadAction<string>) {
      state.loadingStates.clienteGetByIdLoading = {
        state: ResponseState.Finished,
        status: false,
        message: action.payload,
      };
    },

    loadGetClientById(state, action) {
      state.loadingStates.clienteGetByIdLoading = {
        state: action.payload,
      };
    },

    // Update Client

    reducerUpdateClientSuccess(state, action: PayloadAction<ClienteEntity>) {
      const updatedClient = action.payload;
      state.clientes = state.clientes.map(cliente =>
        cliente.id === updatedClient.id ? updatedClient : cliente,
      );
      state.loadingStates.clienteUpdateLoading = {
        state: ResponseState.Finished,
        status: true,
      };
    },

    reducerUpdateClientFailure(state, action: PayloadAction<string>) {
      state.loadingStates.clienteUpdateLoading = {
        state: ResponseState.Finished,
        status: false,
        message: action.payload,
      };
    },

    loadUpdateClient(state, action: PayloadAction<ResponseState>) {
      state.loadingStates.clienteUpdateLoading = {
        state: action.payload,
      };
    },

    // Get Detalle Venta By Id

    reducerGetDetalleVentaByIdSuccess(
      state,
      action: PayloadAction<IDetalleVentaSimple>,
    ) {
      state.detalleVentaById = action.payload;
      state.loadingStates.detalleVentaGetByIdLoading = {
        state: ResponseState.Finished,
        status: true,
      };
    },

    reducerGetDetalleVentaByIdFailure(state, action: PayloadAction<string>) {
      state.loadingStates.detalleVentaGetByIdLoading = {
        state: ResponseState.Finished,
        status: false,
        message: action.payload,
      };
    },

    loadGetDetalleVentaById(state, action) {
      state.loadingStates.detalleVentaGetByIdLoading = {
        state: action.payload,
      };
    },

    // Get All Ventas Simplify

    fetchVentasSuccess(state, action: PayloadAction<VentaSimplifyEntity[]>) {
      state.ventas = action.payload;
      state.loadingStates.ventasLoading = {
        state: ResponseState.Finished,
        status: true,
      };
    },

    getAllVentasFailed(state, action: PayloadAction<string>) {
      state.loadingStates.ventasLoading = {
        state: ResponseState.Finished,
        status: false,
        message: action.payload,
      };
    },

    loadVentas(state, action: PayloadAction<ResponseState>) {
      state.loadingStates.ventasLoading = {
        state: action.payload,
        status: false,
      };
    },

    // Venta Get By Id

    reducerGetVentaByIdSuccess(
      state,
      action: PayloadAction<VentaGetByIdEntity>,
    ) {
      state.ventaById = action.payload;
      state.loadingStates.ventaGetByIdLoading = {
        state: ResponseState.Finished,
        status: true,
      };
    },
    reducerGetVentaByIdFailure(state, action: PayloadAction<string>) {
      state.loadingStates.ventaGetByIdLoading = {
        state: ResponseState.Finished,
        status: false,
        message: action.payload,
      };
    },
    loadGetVentaById(state, action: PayloadAction<ResponseState>) {
      state.loadingStates.ventaGetByIdLoading = {
        state: action.payload,
      };
    },

    // Detalle Venta Special Get By Id

    fetchDetalleVentaSpecialSuccess(
      state,
      action: PayloadAction<DetalleVentaSpecialEntity[]>,
    ) {
      state.detallesVenta = action.payload;
      state.loadingStates.detalleVentaSpecialLoading = {
        state: ResponseState.Finished,
        status: true,
      };
    },
    fetchDetalleVentaSpecialFailed(state, action: PayloadAction<string>) {
      state.loadingStates.detalleVentaSpecialLoading = {
        state: ResponseState.Finished,
        status: false,
        message: action.payload,
      };
    },
    loadDetalleVentaSpecialById(state, action) {
      state.loadingStates.detalleVentaSpecialLoading = {
        state: action.payload,
        status: false,
      };
    },
  },
});

// export const { actions: Actions } = slice;
export const { actions } = slice;

export const useSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: Saga });
  return { actions: slice.actions };
};
