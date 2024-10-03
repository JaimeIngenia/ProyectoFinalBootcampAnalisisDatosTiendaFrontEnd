import React from 'react';
import { useState } from 'react';
import styles from './styles/SideBarMenuPage.module.css';
import { Button, Layout } from 'antd';
import { Logo } from './features/Logo';
import MenuList from './features/MenuList';
import ToggleThemeButton from './features/ToggleThemeButton';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
//redux
// import { counterSlice } from '../../store/slices/counter/counterSlice';

const { Header, Sider } = Layout;

const SideBarMenuPage = ({ backgroundCustom }) => {
  const darkThemeColors = {
    background: backgroundCustom, // color oscuro para dark
    text: '#ffffff', // color para el texto en dark
  };

  const lightThemeColors = {
    background: '#ffffff', // color para light
    text: '#333333', // color de texto para light
  };

  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const themeColors = darkTheme ? darkThemeColors : lightThemeColors;

  return (
    <Layout>
      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        className={styles.sidebar}
        theme={darkTheme ? 'dark' : 'light'}
        style={{
          background: themeColors.background,
          color: themeColors.text,
        }}
      >
        <Logo />
        <MenuList darkTheme={darkTheme} backgroundCustom={backgroundCustom} />
        <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
      </Sider>

      <Header
        style={{
          padding: 0,
          background: 'white',
          color: themeColors.text,
        }}
        className={styles.header}
      >
        <Button
          type="text"
          className={`${styles.toggleButton} ${
            collapsed ? styles.collapsedButton : ''
          }`}
          onClick={() => setCollapsed(!collapsed)}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        />
      </Header>
    </Layout>
  );
};

SideBarMenuPage.propTypes = {
  backgroundCustom: PropTypes.string.isRequired,
};

export default SideBarMenuPage;
