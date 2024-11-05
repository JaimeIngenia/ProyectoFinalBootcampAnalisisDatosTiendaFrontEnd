import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from 'styles/global-styles';
import { HomePage } from './pages/HomePage';
// import { NotFoundPage } from './components/NotFoundPage/Loadable';
import SideBarMenuPage from './features/sideBarMenuPage';
import { useEffect, useState } from 'react';
import { ListaProductos } from './pages/listaProductos';
import AgregarProducto from './pages/agregarProducto';

import NotFoundPage from './pages/notFoundPage/NotFoundPage';
import { GeneralContainer, GeneralContainer2 } from './components/containers';
import { useGeneralContext } from './context/GeneralContext';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import LoginPage from './pages/loginPage';
import { ResponseState } from './features/slice/types';
import { message } from 'antd';
import { useSlice } from './features/slice';
import { useDispatch } from 'react-redux';
import { GetUsuarioSimpleResponse } from './api/usuarios/types';
import { usuarioById_Empty } from './features/slice/emptyTypes';
import CrearFacturaPage from './pages/crearFacturaPage';
import CrearClientPage from './pages/crearClientPage';
import ListarClientes from './pages/listarClientes';

export function App() {
  //Genral flow redux
  const { actions } = useSlice();
  const dispatch = useDispatch();

  const [stateReduxAut, setStateReduxAut] = useState<boolean>(false);

  const {
    darkMode,
    categorias,
    loadingCategorias,
    themeColors,
    productosSaveLoading,
    login,
    loadingLogin,
    loadingLogout,
    loadingusuarioSimpleGetById,
    usuarioSimpleGetById,
  } = useGeneralContext();

  // let stateReduxAut = false;
  // UseEffect para slogin
  useEffect(() => {
    if (loadingLogin.state === ResponseState.InProgress) {
      message.loading('Login User...');
    } else if (loadingLogin.state === ResponseState.Finished) {
      if (loadingLogin.status) {
        message.success('Login exitoso! Iniciando sesion...');
        if (login) {
          setStateReduxAut(true);
        }
        // navigate(`/listaProductos`);
      } else {
        message.error(`Error al Iniciar Sesión: ${loadingLogin.message}`);
      }
      dispatch(actions.loadLogin(ResponseState.Waiting));
    }
  }, [loadingLogin, dispatch]);

  //loadingLogout

  useEffect(() => {
    if (loadingLogout.state === ResponseState.InProgress) {
      message.loading('Cerrando sesión...');
    } else if (loadingLogout.state === ResponseState.Finished) {
      if (loadingLogout.status) {
        if (login === false) {
          setStateReduxAut(false);
          message.success('Cierre de sesión exitoso!');
        }
      } else {
        message.error(`Error al Cerrar Sesión: ${loadingLogout.message}`);
      }
      dispatch(actions.loadLogin(ResponseState.Waiting));
    }
  }, [loadingLogout, dispatch]);

  //Arquitectura para traer un estado

  const [firstChargeProductById, setFirstChargeProductById] =
    useState<boolean>(true);
  const [loadingSpinProductById, setLoadingSpinProductById] =
    useState<boolean>(false);
  const [productByIdListState, setProductByIdListState] =
    useState<GetUsuarioSimpleResponse>(usuarioById_Empty);

  useEffect(() => {
    // Efecto para cargar el usuario por ID
    if (loadingusuarioSimpleGetById.state === ResponseState.Started) {
      setLoadingSpinProductById(true);
    } else if (loadingusuarioSimpleGetById.state === ResponseState.Finished) {
      setLoadingSpinProductById(false);

      if (loadingusuarioSimpleGetById.status && usuarioSimpleGetById) {
        setProductByIdListState(usuarioSimpleGetById);
      } else {
        alert(
          loadingusuarioSimpleGetById.message || 'Error al cargar el usuario',
        );
      }
    }
  }, [loadingusuarioSimpleGetById, usuarioSimpleGetById]);
  return (
    <BrowserRouter>
      <GeneralContainer2 theme={themeColors}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          {/* <SideBarMenuPage />*/}
          {stateReduxAut && <SideBarMenuPage />}

          <Routes>
            {!stateReduxAut && <Route path="/" element={<LoginPage />} />}
            <Route element={<ProtectedRoute canActivate={stateReduxAut} />}>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/listaProductos" element={<ListaProductos />} />
              <Route path="/agregarProductos" element={<AgregarProducto />} />
              <Route path="/editarProducto/:id" element={<AgregarProducto />} />
              <Route path="/crearFactura" element={<CrearFacturaPage />} />
              <Route path="/crearClientPage" element={<CrearClientPage />} />
              <Route path="/listarClientes" element={<ListarClientes />} />
              {/* <Route path="/crearClientes" element={<CrearClientPage />} /> */}
              {/* <Route path="/crearFactura/:id" element={<CrearFacturaPage />} /> */}
            </Route>
          </Routes>
        </div>
      </GeneralContainer2>

      <GlobalStyle />
    </BrowserRouter>
  );
}
