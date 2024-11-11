/* eslint-disable react/prop-types */
import { ConfigProvider, Form, Spin, Table, theme } from 'antd';
import { CustomButtonn } from 'app/components/containers';
import { useGeneralContext } from 'app/context/GeneralContext';
import CustomSelect from 'app/features/customSelect';
import { rulesForm } from 'app/pages/agregarProducto/utils/rulesForm';
import React from 'react';

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
}) {
  //   Context
  const { themeColors, darkMode } = useGeneralContext();
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
          pagination={false}
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
      <CustomButtonn
        type="primary"
        onClick={openModal}
        disabled={isButtonAgregarProductoDisabled}
      >
        Agregar Producto
      </CustomButtonn>
      <CustomButtonn
        type="primary"
        style={{ marginLeft: '10px' }}
        onClick={id ? updateVentaOnClick : handleConfirmarFactura}
        disabled={isButtonConfrimarFacturaDisabled}
      >
        {id ? 'Actualizar Factura' : 'Confirmar Factura'}
      </CustomButtonn>
    </Form>
  );
}
