import {
  AreaChartOutlined,
  BarsOutlined,
  HomeOutlined,
  PoweroffOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Menu, Modal } from 'antd';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import style from '../styles/MenuList.module.css';
import React from 'react';
import { useGeneralContext } from 'app/context/GeneralContext';

const MenuList = () => {
  const { darkMode, themeColors } = useGeneralContext();

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

      <Menu.SubMenu key="Productos" icon={<BarsOutlined />} title="Sensores">
        <Menu.Item key="listaProductos">
          <Link to={'/listaProductos'}>Lista de productos</Link>
        </Menu.Item>

        {/* <Menu.Item
          key={isEditProductPage ? '/editarProducto' : '/agregarProductos'}
        >
          <Link
            to={
              isEditProductPage ? `/editarProducto/${id}` : '/agregarProductos'
            }
          >
            {isEditProductPage ? 'Actualizar Producto' : 'Agregar Producto'}
          </Link>
        </Menu.Item> */}
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
        // onOk={/* Lógica para confirmar logout */}
        onCancel={() => setModalVisible(false)}
      >
        <p>¿Estás seguro de que quieres cerrar sesión?</p>
      </Modal>
    </Menu>
  );
};

export default MenuList;
