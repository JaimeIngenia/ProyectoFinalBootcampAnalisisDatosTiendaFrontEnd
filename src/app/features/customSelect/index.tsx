// /* eslint-disable react/prop-types */

/* eslint-disable react/prop-types */
import React from 'react';
import { AutoComplete, Select, Space } from 'antd';
import styled from 'styled-components';
import { useGeneralContext } from 'app/context/GeneralContext';

const StyledSelect = styled(Select)`
  .ant-select-selector {
    background-color: ${({ theme }) => theme.background} !important;
    color: ${({ theme }) => theme.text} !important;
    border: none !important;
  }

  .ant-select-item {
    color: ${({ theme }) => theme.text} !important;
  }

  .ant-select-dropdown {
    background-color: ${({ theme }) => theme.background} !important;
  }

  .ant-select-selector:hover,
  .ant-select-selector:focus {
    background-color: ${({ theme }) => theme.colorPrimary} !important;
    color: ${({ theme }) => theme.colorTextBase} !important;
  }
`;

const StyledAutoComplete = styled(AutoComplete)`
  .ant-select-selector {
    background-color: ${({ theme }) => theme.background} !important;
    color: ${({ theme }) => theme.text} !important;
    border: none !important;
  }

  .ant-select-item {
    color: ${({ theme }) => theme.text} !important;
  }

  .ant-select-dropdown {
    background-color: ${({ theme }) => theme.background} !important;
  }

  .ant-select-selector:hover,
  .ant-select-selector:focus {
    background-color: ${({ theme }) => theme.colorPrimary} !important;
    color: ${({ theme }) => theme.colorTextBase} !important;
  }
`;

function CustomSelect({ list, onChange, label, value, disableCustom = false }) {
  const { themeColors, darkMode } = useGeneralContext(); // Obtenemos los colores del contexto
  // Transformar la lista para AutoComplete
  const options = list.map(item => ({
    value: item.id, // El valor enviado al backend
    label: item.nombre, // Texto mostrado en el dropdown
  }));
  return (
    <Space style={{ width: '100%' }} direction="vertical">
      {/* <StyledSelect
        value={value}
        onChange={onChange}
        allowClear
        placeholder={`Seleccione ${label}`}
        // style={{ width: '100%' }}
        // disabled={!disableCustom}
        dropdownStyle={{
          background: themeColors.background, // Aplicar el fondo del tema al dropdown
          color: themeColors.text, // Aplicar color de texto del tema
        }}
        style={
          darkMode
            ? {
                border: `2px solid ${themeColors.colorBorderCustom}`,
                borderRadius: '5px',
                width: '100%',
              }
            : {
                border: `1px solid ${themeColors.colorBorderCustom}`,
                borderRadius: '5px',
                width: '100%',
              }
        }
      >
        {list.map(role => (
          <Select.Option key={role.id} value={role.id}>
            {role.nombre}
          </Select.Option>
        ))}
      </StyledSelect> */}

      <StyledAutoComplete
        value={value}
        onChange={onChange}
        allowClear
        placeholder={`Seleccione ${label}`}
        options={options} // Pasa las opciones transformadas
        filterOption={(inputValue, option) =>
          option?.label.toLowerCase().includes(inputValue.toLowerCase())
        }
        style={
          darkMode
            ? {
                border: `2px solid ${themeColors.colorBorderCustom}`,
                borderRadius: '5px',
                width: '100%',
              }
            : {
                border: `1px solid ${themeColors.colorBorderCustom}`,
                borderRadius: '5px',
                width: '100%',
              }
        }
      />
    </Space>
  );
}

export default CustomSelect;
