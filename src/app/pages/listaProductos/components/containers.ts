import { Table } from 'antd';
import { ProductEntityGetAll } from 'app/api/products/types';
import styled from 'styled-components';

export const StyledTable = styled(Table<ProductEntityGetAll>)`
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

export const StyledTableCustom = styled(Table<ProductEntityGetAll>)`
  .ant-table-thead .ant-table-cell {
    white-space: nowrap; // Evitar saltos de línea en encabezados
  }
  .ant-table-cell {
    white-space: nowrap; // Evitar saltos de línea en celdas
    overflow: hidden; // Esconder contenido desbordante
    text-overflow: ellipsis; // Mostrar puntos suspensivos
  }

  // Ajustar ancho automático para columnas
  .ant-table {
    table-layout: auto; // Permitir que las columnas ajusten su tamaño automáticamente
  }

  // Agregar estilos para columnas específicas si es necesario
  .ant-table-cell {
    max-width: 80px; // Limitar ancho máximo para truncar
  }
`;
