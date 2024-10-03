import {
  AreaChartOutlined,
  BarsOutlined,
  HomeOutlined,
  PoweroffOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Menu, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import style from '../styles/MenuList.module.css';
import PropTypes from 'prop-types';
import React from 'react';

const MenuList = ({ darkTheme, backgroundCustom }) => {
  const themeColors = {
    background: darkTheme ? backgroundCustom : '#ffffff',
    text: darkTheme ? '#ffffff' : '#333333',
  };

  const [modalVisible, setModalVisible] = useState(false);

  const handleLogoutClick = () => {
    setModalVisible(true);
  };

  return (
    <Menu
      theme={darkTheme ? 'dark' : 'light'}
      mode="inline"
      className={style.menu__bar}
      style={{
        background: themeColors.background,
        color: themeColors.text,
      }}
    >
      <Menu.Item key="/" icon={<HomeOutlined />}>
        <Link to={'/'}>Home</Link>
      </Menu.Item>

      <Menu.Item key="/estadisticas" icon={<AreaChartOutlined />}>
        <Link to={'/estadisticas'}>Estadisticas</Link>
      </Menu.Item>

      <Menu.SubMenu key="Sensores" icon={<BarsOutlined />} title="Sensores">
        <Menu.Item key="temperatura&humedad">
          <Link to={'/temperaturaHumedad'}>Temp y Humedad</Link>
        </Menu.Item>

        <Menu.Item key="humedad">
          <Link to={'/humedad'}>Humedad</Link>
        </Menu.Item>

        <Menu.Item key="riego">
          <Link to={'/riego'}>Riegos</Link>
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
        // onOk={/* Lógica para confirmar logout */}
        onCancel={() => setModalVisible(false)}
      >
        <p>¿Estás seguro de que quieres cerrar sesión?</p>
      </Modal>
    </Menu>
  );
};

MenuList.propTypes = {
  darkTheme: PropTypes.bool.isRequired,
  backgroundCustom: PropTypes.string.isRequired,
};

export default MenuList;
