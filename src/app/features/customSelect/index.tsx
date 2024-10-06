import React from 'react';
import { Select, Space } from 'antd';
import PropTypes from 'prop-types';

function CustomSelect({ list, onChange, label }) {
  return (
    <>
      {/* <h1>Soy Select de{label}</h1> */}
      <Space style={{ width: '100%' }} direction="vertical">
        <Select
          onChange={onChange}
          allowClear
          style={{ width: '100%' }}
          placeholder="Please select"
        >
          {list.map(role => (
            <option key={role.id} value={role.id}>
              {role.nombre}
            </option>
          ))}
        </Select>
      </Space>
    </>
  );
}

// Definir las PropTypes
CustomSelect.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      nombre: PropTypes.string.isRequired,
    }),
  ).isRequired, // list es un array de objetos con id y nombre
  onChange: PropTypes.func.isRequired, // onChange debe ser una función
  label: PropTypes.string.isRequired, // label es una cadena obligatoria
};

export default CustomSelect;
