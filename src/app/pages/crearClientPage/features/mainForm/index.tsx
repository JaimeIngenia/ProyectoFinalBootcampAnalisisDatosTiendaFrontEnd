/* eslint-disable react/prop-types */
import { Col, Form, Input, Row } from 'antd';
import { CustomButtonn } from 'app/components/containers';
import { useGeneralContext } from 'app/context/GeneralContext';
import { rulesForm } from 'app/pages/agregarProducto/utils/rulesForm';
import React from 'react';
const { Item } = Form;

export default function MainForm({
  clienteSaveformRef,
  clientSaveform,
  isButtonDisabled,
  saveCliente,
  handleChange,
  onUpdateCliente,
  id,
}) {
  const { darkMode, themeColors, isMenuCollapsed } = useGeneralContext();

  return (
    <Form
      form={clientSaveform}
      layout="vertical"
      ref={clienteSaveformRef}
      name="formularioCrearClientes"
      onFinish={id ? onUpdateCliente : saveCliente}
      style={{
        maxHeight: '60vh', // Limitar altura al viewport
        overflowY: isMenuCollapsed ? 'auto' : 'unset', // Habilitar scroll cuando isMenuCollapsed es true
        padding: isMenuCollapsed ? '1rem' : '0', // Opcional, ajustar padding si hay menos espacio
      }}
      // onFinish={saveProduct}
      //   initialValues={id ? formData : undefined}
    >
      <Row gutter={[16, 16]}>
        {/* Campo Nombre */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Item
            required
            label="Nombre"
            name="nombre"
            rules={rulesForm.rulesNombre}
            validateTrigger="onBlur"
          >
            <Input
              placeholder="Nombre del Cliente"
              onChange={handleChange}
              name="nombre"
              style={
                darkMode
                  ? { border: `2px solid ${themeColors.colorBorderCustom}` }
                  : { border: `1px solid ${themeColors.colorBorderCustom}` }
              }
            />
          </Item>
        </Col>

        {/* Campo Descripción */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Item
            required
            label="Apellido"
            name="apellido"
            rules={rulesForm.rulesDescripcion}
            validateTrigger="onBlur"
          >
            <Input
              placeholder="apellido del Cliente"
              onChange={handleChange}
              name="apellido"
              // style={{ border: `2px solid ${themeColors.colorBorderCustom}` }}
              style={
                darkMode
                  ? { border: `2px solid ${themeColors.colorBorderCustom}` }
                  : { border: `1px solid ${themeColors.colorBorderCustom}` }
              }
            />
          </Item>
        </Col>
        {/* Campo correo */}

        <Col xs={24} sm={12} md={12} lg={12}>
          <Item
            required
            label="Email"
            name="email"
            rules={rulesForm.rulesCorreo}
            validateTrigger="onBlur"
          >
            <Input
              placeholder="email del Cliente"
              onChange={handleChange}
              name="email"
              // style={{ border: `2px solid ${themeColors.colorBorderCustom}` }}
              style={
                darkMode
                  ? { border: `2px solid ${themeColors.colorBorderCustom}` }
                  : { border: `1px solid ${themeColors.colorBorderCustom}` }
              }
            />
          </Item>
        </Col>
        {/* Campo telefono */}

        <Col xs={24} sm={12} md={12} lg={12}>
          <Item
            required
            label="Teléfono"
            name="telefono"
            rules={rulesForm.rulesNombre}
            validateTrigger="onBlur"
          >
            <Input
              placeholder="telefono del Cliente"
              onChange={handleChange}
              name="telefono"
              // style={{ border: `2px solid ${themeColors.colorBorderCustom}` }}
              style={
                darkMode
                  ? { border: `2px solid ${themeColors.colorBorderCustom}` }
                  : { border: `1px solid ${themeColors.colorBorderCustom}` }
              }
            />
          </Item>
        </Col>
      </Row>

      <Row>
        <Col xs={24}>
          <CustomButtonn
            type="primary"
            htmlType="submit"
            disabled={isButtonDisabled}
            block
          >
            {/* Agregar Cliente */}
            {id ? 'Actualizar Cliente' : 'Agregar Cliente'}
          </CustomButtonn>
        </Col>
      </Row>
    </Form>
  );
}
