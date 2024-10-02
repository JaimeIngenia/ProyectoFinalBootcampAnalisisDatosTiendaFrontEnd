import React from 'react';
import { Select, Space } from 'antd';

function CustomSelect({ list, onChange, label }) {
  return (
    <>
      <h1>Soy Select de{label}</h1>
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

export default CustomSelect;
