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
  handleAgregarDetalleVenta,
  loadingSpinProductos,
  productosListStateSelect,
  handleSelectProductoChange,
  handleProductoChange,
  isButtonConfrimarDetalleVentaDisabled,
  id,
  updateDetalleVenta,
  addProductUpdate,
  setAddProductUpdate,
}) {
  //   Context
  const { themeColors, darkMode } = useGeneralContext();

  const saveDetalleVenta = (productoId: string, cantidad: number) => {
    // Lógica de guardado (manteniendo la lógica existente)
    handleAgregarDetalleVenta(productoId, cantidad);
    setAddProductUpdate(false);
  };

  return (
    <Form
      form={detalleVentaForm}
      layout="vertical"
      ref={detalleVentaFormRef}
      name={'detalleVentaForm'}
      // onFinish={values =>
      //   id
      //     ? updateDetalleVenta()
      //     : saveDetalleVenta(values.productoId, values.cantidad)
      // }
      onFinish={values => {
        if (id && addProductUpdate) {
          // Si existe id y addProductUpdate es true
          saveDetalleVenta(values.productoId, values.cantidad);
        } else if (id && !addProductUpdate) {
          // Si existe id y addProductUpdate es false
          updateDetalleVenta();
        } else {
          // Si no existe id
          saveDetalleVenta(values.productoId, values.cantidad);
        }
      }}
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
          {id ? 'Actualizar' : 'Agregar'}
          {/* Agregar */}
        </CustomButtonn>
      </Form.Item>
    </Form>
  );
}
