import {
  AreaChartOutlined,
  BarsOutlined,
  HomeOutlined,
  PoweroffOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Menu, Modal } from 'antd';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import style from '../styles/MenuList.module.css';
import React from 'react';
import { useGeneralContext } from 'app/context/GeneralContext';
import { useSlice } from 'app/features/slice';
import { useDispatch } from 'react-redux';
import { ResponseState } from 'app/features/slice/types';
import { LOGOUT_USER } from 'app/features/slice/sagaActions';
import { GetUsuarioSimpleResponse } from 'app/api/usuarios/types';
import { usuarioById_Empty } from 'app/features/slice/emptyTypes';

const MenuList = () => {
  //Genral flow redux
  const { actions } = useSlice();
  const dispatch = useDispatch();

  const {
    darkMode,
    themeColors,
    loadingusuarioSimpleGetById,
    usuarioSimpleGetById,
  } = useGeneralContext();

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
  // Modal de Losout
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogoutClick = () => {
    setModalVisible(true);
  };
  const location = useLocation(); // Hook para obtener la ruta actual
  const { id } = useParams();

  // Detectar si la ruta actual es para editar un producto
  const isEditProductPage = location.pathname.includes('/editarProducto');
  // Establecer la clave seleccionada dinámicamente
  const selectedKey = isEditProductPage
    ? `/editarProducto/${id}`
    : location.pathname;

  const logoutSession = () => {
    // const userId = '5459ba78-d3dc-42ca-95de-33b971f2f3cd'; // Cambia esto por el ID del usuario actual
    setModalVisible(false);
    // Despachar acción para indicar que el proceso de cierre de sesión ha comenzado

    // Despachar la acción de cierre de sesión
    if (productByIdListState.id !== '') {
      dispatch(actions.loadLogout(ResponseState.InProgress));
      dispatch({
        type: LOGOUT_USER,
        payload: {
          id: productByIdListState.id,
        },
      });
    } else {
    }
  };

  return (
    <Menu
      theme={darkMode ? 'dark' : 'light'}
      mode="inline"
      className={style.menu__bar}
      style={{
        background: themeColors.background,
        color: themeColors.text,
      }}
      selectedKeys={[selectedKey]}
    >
      <Menu.Item key="/" icon={<HomeOutlined />}>
        <Link to={'/'}>Home</Link>
      </Menu.Item>

      <Menu.Item key="/estadisticas" icon={<AreaChartOutlined />}>
        <Link to={'/estadisticas'}>Estadisticas</Link>
      </Menu.Item>

      <Menu.SubMenu key="Productos" icon={<BarsOutlined />} title="Productos">
        <Menu.Item key="/listaProductos">
          <Link to={'/listaProductos'}>Lista de productos</Link>
        </Menu.Item>

        <Menu.Item
          key={
            isEditProductPage ? `/editarProducto/${id}` : '/agregarProductos'
          }
        >
          <Link
            to={
              isEditProductPage ? `/editarProducto/${id}` : '/agregarProductos'
            }
          >
            {isEditProductPage ? 'Actualizar Producto' : 'Agregar Producto'}
          </Link>
        </Menu.Item>

        {/* <Menu.Item key="agregarProductos">
          <Link to={'/agregarProductos'}>Agregar Producto</Link>
          </Menu.Item> */}

        {/* <Menu.Item key="riego">
          <Link to={'/riego'}>Riegos</Link>
          </Menu.Item> */}
      </Menu.SubMenu>

      <Menu.SubMenu key="Ventas" icon={<BarsOutlined />} title="Ventas">
        <Menu.Item key="/crearFactura">
          <Link to={'/crearFactura'}>Crear Factura</Link>
        </Menu.Item>
        <Menu.Item key="/listarVentas">
          <Link to={'/listarVentas'}>Listar Ventas</Link>
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.SubMenu key="Clientes" icon={<BarsOutlined />} title="Clientes">
        <Menu.Item key="/listarClientes">
          <Link to={'/listarClientes'}>Listar Clientes</Link>
        </Menu.Item>
        <Menu.Item key="/crearClientPage">
          <Link to={'/crearClientPage'}>Crear Cliente</Link>
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.Item key="/usuario" icon={<UserOutlined />}>
        <Link to={'/user'}>Usuario</Link>
      </Menu.Item>

      <Menu.Item
        key="/logout"
        icon={<PoweroffOutlined />}
        onClick={handleLogoutClick}
      >
        Logout
      </Menu.Item>

      <Modal
        title="Confirmación de Logout"
        visible={modalVisible}
        onOk={logoutSession}
        onCancel={() => setModalVisible(false)}
      >
        <p>¿Estás seguro de que quieres cerrar sesión?</p>
      </Modal>
    </Menu>
  );
};

export default MenuList;
