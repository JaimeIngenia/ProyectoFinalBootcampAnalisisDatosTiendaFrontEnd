/* eslint-disable react/prop-types */
import React from 'react';
import { Select, Space } from 'antd';

function CustomSelect({ list, onChange, label, value }) {
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

export default CustomSelect;
