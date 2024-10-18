import React from 'react';
import { useState } from 'react';
import styles from './styles/SideBarMenuPage.module.css';
import { Button, Layout } from 'antd';
import { Logo } from './features/Logo';
import MenuList from './features/MenuList';
import ToggleThemeButton from './features/ToggleThemeButton';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useGeneralContext } from 'app/context/GeneralContext';
//redux
// import { counterSlice } from '../../store/slices/counter/counterSlice';

const { Header, Sider } = Layout;

const SideBarMenuPage = () => {
  const { darkMode, toggleDarkMode, themeColors } = useGeneralContext();

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        className={styles.sidebar}
        // theme={darkTheme ? 'dark' : 'light'}
        theme={darkMode ? 'dark' : 'light'}
        style={{
          background: themeColors.background,
          color: themeColors.text,
        }}
      >
        <Logo />
        {/* <MenuList darkTheme={darkMode} backgroundCustom={backgroundCustom} /> */}
        <MenuList />
        <ToggleThemeButton darkTheme={darkMode} toggleTheme={toggleDarkMode} />
        {/* <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} /> */}
      </Sider>

      <Header
        style={{
          padding: 0,
          background: 'white',
          color: themeColors.text,
          height: '100vh',
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

export default SideBarMenuPage;
