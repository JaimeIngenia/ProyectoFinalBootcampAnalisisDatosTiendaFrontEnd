import { GeneralContainer } from 'app/components/containers';
import React from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table } from 'antd';

export function ListaProductos() {
  const colums = [
    {
      key: '1',
      title: 'IdJardin',
      dataIndex: 'idJardin',
    },
    {
      key: '2',
      title: 'Created_at',
      dataIndex: 'createdAt',
    },
    {
      key: '3',
      title: 'ValorSensor',
      dataIndex: 'valorSensor',
    },
    {
      key: '3',
      title: 'SensorId',
      dataIndex: 'sensorId',
    },
    {
      key: '4',
      title: 'Actions',
      render: redord => {
        return (
          <>
            <EditOutlined />
            <DeleteOutlined style={{ color: 'red', marginLeft: 12 }} />
          </>
        );
      },
    },
  ];

  return (
    <>
      <GeneralContainer>
        <h1>ListaProductos</h1>

        <div style={{ display: 'flex', border: 'solid red 3px' }}>
          <Table
            columns={colums}
            // dataSource={jardines}
          ></Table>
        </div>
      </GeneralContainer>
    </>
  );
}
