import { Table } from 'antd';
import { ClienteEntity } from 'app/api/clientes/types';
import { ProductEntityGetAll } from 'app/api/products/types';
import styled from 'styled-components';

export const StyledTableCustom = styled(Table<ClienteEntity>)`
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
