/* eslint-disable react/prop-types */
import { ConfigProvider, DatePicker, Form, Spin, Table, theme } from 'antd';
import { CustomButtonn } from 'app/components/containers';
import { useGeneralContext } from 'app/context/GeneralContext';
import CustomSelect from 'app/features/customSelect';
import { rulesForm } from 'app/pages/agregarProducto/utils/rulesForm';
import React, { useEffect } from 'react';

export default function MainFormVenta({
  clientForm,
  clientFormRef,
  loadingSpinClientes,
  clienteListState,
  handleSelectChange,
  clientFormData,
  productosSeleccionados,
  columns,
  openModal,
  total,
  isButtonAgregarProductoDisabled,
  isButtonConfrimarFacturaDisabled,
  handleConfirmarFactura,
  ventaCreada,
  id,
  updateVentaOnClick,
  openModalUpdate,
  handleDateChange,
}) {
  //   Context
  const { themeColors, darkMode, isMenuCollapsed } = useGeneralContext();
  const displayStyle = true ? 'block' : 'none';
  console.log('Display style:', displayStyle);

  return (
    <Form form={clientForm} ref={clientFormRef} name="clientFormularioName">
      {/* {!ventaCreada ? (
        <div></div>
      ) : ( */}
      <Form.Item
        required
        label="Cliente"
        name="clienteId"
        rules={rulesForm.rulesVentaId}
        validateTrigger="onBlur"
      >
        <Spin spinning={loadingSpinClientes}>
          <CustomSelect
            list={clienteListState}
            onChange={handleSelectChange}
            label="Un Cliente"
            value={clientFormData.clienteId}
          ></CustomSelect>
        </Spin>
      </Form.Item>
      {/* )} */}

      <Form.Item label="Selecciona la fecha" name="fecha">
        <DatePicker
          style={{ width: '100%' }}
          onChange={handleDateChange} // Captura el cambio de la fecha
          format="YYYY-MM-DD"
        />
      </Form.Item>
      <ConfigProvider
        theme={{
          ...(darkMode
            ? {
                token: {
                  colorPrimary: themeColors.colorPrimary,
                  colorText: themeColors.colorTextBase,
                  colorTextHeading: themeColors.colorTextBase,
                  colorBgContainer: themeColors.background,
                  colorBgElevated: themeColors.background,
                  colorBorder: themeColors.colorPrimary,
                  colorTextBase: themeColors.colorTextBase,
                  colorTextPlaceholder: themeColors.colorTextLightSolid,
                },
                algorithm: theme.darkAlgorithm,
              }
            : {}),
        }}
      >
        <Table
          dataSource={productosSeleccionados}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: isMenuCollapsed ? 1 : 3 }}
        />
      </ConfigProvider>
      <div
        style={{
          marginTop: '20px',
          fontWeight: 'bold',
          color: themeColors.text,
        }}
      >
        Total: {total}
      </div>
      <div
        style={{
          width: '100%',
          // border: 'solid red 3px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CustomButtonn
          style={{
            marginTop: isMenuCollapsed ? '10px' : '0px',
          }}
          type="primary"
          onClick={id ? openModalUpdate : openModal}
          disabled={isButtonAgregarProductoDisabled}
        >
          {id ? 'Agregar Producto Actualizado' : 'Agregar Producto'}
        </CustomButtonn>
        <CustomButtonn
          type="primary"
          // style={{ marginLeft: '10px' }}
          style={{
            marginLeft: isMenuCollapsed ? '0px' : '10px',
            marginTop: isMenuCollapsed ? '10px' : '0px',
          }}
          onClick={id ? updateVentaOnClick : handleConfirmarFactura}
          disabled={isButtonConfrimarFacturaDisabled}
        >
          {id ? 'Actualizar Factura' : 'Confirmar Factura'}
        </CustomButtonn>
      </div>
    </Form>
  );
}
