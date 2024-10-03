import React from 'react';
import styles from '../styles/ToggleThemeButton.module.css';
import sun from '../../../../assets/sun.svg';
import moon from '../../../../assets/moon.svg';
import { Button } from 'antd';
import PropTypes from 'prop-types';

const ToggleThemeButton = ({ darkTheme, toggleTheme }) => {
  return (
    <div className={styles.toogle__theme__btn}>
      <Button onClick={toggleTheme}>
        {darkTheme ? (
          <img
            className={styles.toogle__theme__btn__img}
            src={sun}
            alt="Sun Icon"
          />
        ) : (
          <img
            className={styles.toogle__theme__btn__img}
            src={moon}
            alt="Moon Icon"
          />
        )}
      </Button>
    </div>
  );
};

ToggleThemeButton.propTypes = {
  darkTheme: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default ToggleThemeButton;
