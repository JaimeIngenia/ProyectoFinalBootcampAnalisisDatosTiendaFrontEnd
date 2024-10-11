import React from 'react';
import { Select, Space } from 'antd';
import PropTypes from 'prop-types';

function CustomSelect({ list, onChange, label, name }) {
  // const handleSelectChange = selectedValue => {
  //   onChange(selectedValue);
  // };

  const handleSelectChange = selectedValue => {
    onChange({ target: { name, value: selectedValue } });
  };

  return (
    <>
      <Space style={{ width: '100%' }} direction="vertical">
        <Select
          onChange={handleSelectChange}
          allowClear
          style={{ width: '100%' }}
          placeholder={`Seleccione ${label}`}
        >
          {list.map(role => (
            <Select.Option key={role.id} value={role.id}>
              {role.nombre}
            </Select.Option>
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
  name: PropTypes.string.isRequired, // label es una cadena obligatoria
};

export default CustomSelect;
