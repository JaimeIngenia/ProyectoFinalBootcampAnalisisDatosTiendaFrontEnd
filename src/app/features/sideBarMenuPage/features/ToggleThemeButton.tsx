import React from 'react';
import styles from '../styles/ToggleThemeButton.module.css';
import sun from '../../../../assets/sun.svg';
import moon from '../../../../assets/moon.svg';
import { Button } from 'antd';
import PropTypes from 'prop-types'; // Importar PropTypes

const ToggleThemeButton = ({ darkTheme, toggleTheme }) => {
  return (
    <div className={styles.toogle__theme__btn}>
      <Button onClick={toggleTheme}>
        {darkTheme ? (
          <img className={styles.toogle__theme__btn__img} src={sun} alt="" />
        ) : (
          <img className={styles.toogle__theme__btn__img} src={moon} alt="" />
        )}
      </Button>
    </div>
  );
};

ToggleThemeButton.propTypes = {
  darkTheme: PropTypes.bool.isRequired, // darkTheme es un booleano y es obligatorio
  toggleTheme: PropTypes.func.isRequired, // toggleTheme es una función y es obligatoria
};

export default ToggleThemeButton;
