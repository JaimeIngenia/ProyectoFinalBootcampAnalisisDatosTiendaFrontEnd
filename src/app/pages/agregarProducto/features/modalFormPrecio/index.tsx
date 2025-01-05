/* eslint-disable react/prop-types */

import { Form, Input, Spin } from 'antd';

import { CustomButtonn, CustomSelect } from 'app/components/containers';

import { useGeneralContext } from 'app/context/GeneralContext';

import React from 'react';

import { rulesForm } from '../../utils/rulesForm';

export default function ModalFormPrecio({
  registerModalPrecioForm,
  modalPrecioFormRef,
  handleModalPrecioSubmit,
  modalPrecioFormData,
  handleChangeModalPrecio,
  isButtonModalPrecioDisabled,
  //   loadingSpinProductos,
  //   productosListState,
  //   handleSelectProductoChange,
}) {
  const { darkMode, themeColors, isMenuCollapsed } = useGeneralContext();

  return (
    <Form
      form={registerModalPrecioForm}
      layout="vertical"
      ref={modalPrecioFormRef}
      name="ModalPrecioFormRef"
      onFinish={handleModalPrecioSubmit}
      initialValues={modalPrecioFormData}
    >
      <Form.Item
        required
        label="Precio Venta"
        name="precioVenta"
        rules={rulesForm.rulesPrecio}
        validateTrigger="onBlur"
      >
        <Input
          type="number"
          placeholder="Precio de venta del Producto"
          onChange={handleChangeModalPrecio}
          name="precio" // style={{ border: `2px solid ${themeColors.colorBorderCustom}` }}
          style={
            darkMode
              ? { border: `2px solid ${themeColors.colorBorderCustom}` }
              : { border: `1px solid ${themeColors.colorBorderCustom}` }
          }
        />
      </Form.Item>

      <CustomButtonn
        type="primary"
        htmlType="submit"
        disabled={isButtonModalPrecioDisabled}
        block
      >
        Agregar Precio
      </CustomButtonn>
    </Form>
  );
}
