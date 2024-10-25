import { Button, Select } from 'antd';
import styled from 'styled-components';

export const GeneralContainer = styled.div<{
  theme: { background: string; text: string };
}>`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: solid red 3px;
  margin-right: 32px;
`;
export const GeneralContainer2 = styled.div<{
  theme: { background: string; text: string };
}>`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;
export const CustomButtonn = styled(Button)`
  background-color: ${({ theme }) => theme.colorPrimary} !important;
  color: ${({ theme }) => theme.colorTextLightSolid} !important;
  height: 50px;
  width: 300px;

  &:hover {
    background-color: ${({ theme }) => theme.background} !important;
    color: ${({ theme }) => theme.text} !important;
  }
`;

export const CustomSelect = styled(Select)`
  .ant-select-selector {
    background-color: ${({ theme }) => theme.background} !important;
    color: ${({ theme }) => theme.text} !important;
    border: 2px solid ${({ theme }) => theme.borderColor} !important; /* Agregamos el borde */
  }

  .ant-select-selector:hover,
  .ant-select-selector:focus {
    background-color: ${({ theme }) => theme.colorPrimary} !important;
    color: ${({ theme }) => theme.colorTextBase} !important;
  }

  .ant-select-dropdown {
    background-color: ${({ theme }) => theme.background} !important;
    color: ${({ theme }) => theme.text} !important;
  }
`;

// export const CustomSelect = styled(Select)`
//   .ant-select-selector {
//     background-color: ${({ theme }) => theme.background} !important;
//     color: ${({ theme }) => theme.text} !important;
//     border: none !important;
//   }

//   .ant-select-selector:hover,
//   .ant-select-selector:focus {
//     background-color: ${({ theme }) => theme.colorPrimary} !important;
//     color: ${({ theme }) => theme.colorTextBase} !important;
//   }

//   .ant-select-dropdown {
//     background-color: ${({ theme }) => theme.background} !important;
//     color: ${({ theme }) => theme.text} !important;
//   }
// `;

// const CustomButtonn = styled(Button)`
//   // background-color: #050E12 !important;
//   background-color: #3a0f12 !important;

//   color: white;
//   height: 50px;
//   width: 300px;
//   margin-left: 8.5%;

//   &:hover {
//     // background-color: #3A0F12 !important;
//     background-color: #050e12 !important;
//     color: white;
//   }
// `;
// const CustomSelect = styled(Select)`
//   .ant-select-selector {
//     background-color: #050e12 !important;
//     color: white !important;
//     border: none !important;
//   }

//   .ant-select-selector:hover {
//     background-color: #3a0f12 !important;
//   }

//   .ant-select-selector:hover,
//   .ant-select-selector:focus-within {
//     //border: 1px solid red !important;
//     color: white !important;
//   }
// `;
// export const GeneralContainer = styled.div`
//   width: 100%;
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   border: solid red 3px;
//   margin-right: 32px;
// `;
