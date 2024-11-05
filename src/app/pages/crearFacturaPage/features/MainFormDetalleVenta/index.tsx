/* eslint-disable react/prop-types */
import { Form, Input, Spin } from 'antd';
import { CustomButtonn } from 'app/components/containers';
import { useGeneralContext } from 'app/context/GeneralContext';
import CustomSelect from 'app/features/customSelect';
import { rulesForm } from 'app/pages/agregarProducto/utils/rulesForm';
import React from 'react';

export default function MainFormDetalleVenta({
  detalleVentaForm,
  detalleVentaFormRef,
  detalleVentaFormData,
  handleAgregarProducto,
  loadingSpinProductos,
  productosListStateSelect,
  handleSelectProductoChange,
  handleProductoChange,
  isButtonConfrimarDetalleVentaDisabled,
}) {
  //   Context
  const { themeColors, darkMode } = useGeneralContext();

  return (
    <Form
      form={detalleVentaForm}
      layout="vertical"
      ref={detalleVentaFormRef}
      name={'detalleVentaForm'}
      onFinish={values =>
        handleAgregarProducto(values.productoId, values.cantidad)
      }
    >
      <Form.Item
        required
        label="Pdoducto"
        name="productoId"
        rules={rulesForm.rulesProductoId}
        validateTrigger="onBlur"
      >
        <Spin spinning={loadingSpinProductos}>
          <CustomSelect
            list={productosListStateSelect}
            onChange={handleSelectProductoChange}
            label="Un Producto"
            value={detalleVentaFormData.productoId}
          ></CustomSelect>
        </Spin>
      </Form.Item>
      <Form.Item
        required
        label="Cantidad"
        name="cantidad"
        // rules={[{ required: true, message: 'Ingrese la cantidad' }]}
        rules={rulesForm.rulesPrecio}
        validateTrigger="onBlur"
      >
        <Input
          type="number"
          //   min={1}
          placeholder="Cantidad del Producto"
          onChange={handleProductoChange}
          name="cantidad"
          style={
            darkMode
              ? { border: `2px solid ${themeColors.colorBorderCustom}` }
              : { border: `1px solid ${themeColors.colorBorderCustom}` }
          }
        />
      </Form.Item>
      <Form.Item>
        <CustomButtonn
          type="primary"
          htmlType="submit"
          disabled={isButtonConfrimarDetalleVentaDisabled}
        >
          Agregar
        </CustomButtonn>
      </Form.Item>
    </Form>
  );
}
