// /* eslint-disable react/prop-types */
// import React from 'react';
// import { Select, Space } from 'antd';

// function CustomSelect({ list, onChange, label, value }) {
//   return (
//     <>
//       <Space style={{ width: '100%' }} direction="vertical">
//         <Select
//           value={value}
//           onChange={onChange}
//           allowClear
//           style={{ width: '100%' }}
//           placeholder={`Seleccione ${label}`}
//         >
//           {list.map(role => (
//             <Select.Option key={role.id} value={role.id}>
//               {role.nombre}
//             </Select.Option>
//           ))}
//         </Select>
//       </Space>
//     </>
//   );
// }

// export default CustomSelect;
/* eslint-disable react/prop-types */
import React from 'react';
import { Select, Space } from 'antd';
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

function CustomSelect({ list, onChange, label, value }) {
  const { themeColors } = useGeneralContext(); // Obtenemos los colores del contexto

  return (
    <Space style={{ width: '100%' }} direction="vertical">
      <StyledSelect
        value={value}
        onChange={onChange}
        allowClear
        placeholder={`Seleccione ${label}`}
        style={{ width: '100%' }}
        dropdownStyle={{
          background: themeColors.background, // Aplicar el fondo del tema al dropdown
          color: themeColors.text, // Aplicar color de texto del tema
        }}
      >
        {list.map(role => (
          <Select.Option key={role.id} value={role.id}>
            {role.nombre}
          </Select.Option>
        ))}
      </StyledSelect>
    </Space>
  );
}

export default CustomSelect;
