/* eslint-disable react/prop-types */
import React from 'react';
import { Select, Space } from 'antd';
import PropTypes from 'prop-types';

function CustomSelect({ list, onChange, label, name, value }) {
  return (
    <>
      <Space style={{ width: '100%' }} direction="vertical">
        <Select
          value={value}
          onChange={onChange}
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

// CustomSelect.propTypes = {
//   list: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//       nombre: PropTypes.string.isRequired,
//     }),
//   ).isRequired,
//   onChange: PropTypes.func.isRequired,
//   label: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   value: PropTypes.number.isRequired,
//   // handleSelectChangeUpdate: PropTypes.func.isRequired,
//   // id: PropTypes.string.isRequired,
// };

export default CustomSelect;
