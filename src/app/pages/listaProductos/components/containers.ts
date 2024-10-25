import { Table } from 'antd';
import styled from 'styled-components';

export const StyledTable = styled(Table)`
  background-color: #ccc !important; // Cambia esto al color gris que desees
  .ant-table-thead .ant-table-cell {
    background-color: #555555 !important; // Cambia esto al color gris que desees
  }
  tbody {
    background-color: #353535 !important; // Cambia esto al color gris que desees
    tr:hover {
      color: black !important;
      background-color: #202020 !important; // Cambia esto al color que deseas en el hover
      // Agrega otros estilos de hover según tus preferencias
    }
  }
`;
