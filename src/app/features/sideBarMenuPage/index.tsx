import React, { useEffect } from 'react';
import { useState } from 'react';
import styles from './styles/SideBarMenuPage.module.css';
import { Button, Layout } from 'antd';
import { Logo } from './features/Logo';
import MenuList from './features/MenuList';
import ToggleThemeButton from './features/ToggleThemeButton';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useGeneralContext } from 'app/context/GeneralContext';

const { Header, Sider } = Layout;

const SideBarMenuPage = () => {
  const { darkMode, toggleDarkMode, themeColors } = useGeneralContext();

  const [collapsed, setCollapsed] = useState(false);

  // Función para manejar el cambio de tamaño de la ventana
  const handleResize = () => {
    if (window.innerWidth < 700) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  };

  // useEffect para agregar y limpiar el listener del evento resize
  useEffect(() => {
    handleResize(); // Comprobar el tamaño al cargar el componente
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Layout>
      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        className={styles.sidebar}
        theme={darkMode ? 'dark' : 'light'}
        style={{
          background: themeColors.background,
          color: themeColors.text,
        }}
      >
        <Logo />
        <MenuList />
        <ToggleThemeButton darkTheme={darkMode} toggleTheme={toggleDarkMode} />
      </Sider>

      <Header
        style={{
          padding: 0,
          color: themeColors.text,
          height: '100vh',
          background: darkMode ? themeColors.background : 'white',
        }}
        className={styles.header}
      >
        <Button
          type="text"
          className={`${styles.toggleButton} ${
            collapsed ? styles.collapsedButton : ''
          }`}
          onClick={() => setCollapsed(!collapsed)}
          icon={
            collapsed ? (
              <MenuUnfoldOutlined style={{ color: themeColors.text }} />
            ) : (
              <MenuFoldOutlined style={{ color: themeColors.text }} />
            )
          }
        />
      </Header>
    </Layout>
  );
};

export default SideBarMenuPage;
