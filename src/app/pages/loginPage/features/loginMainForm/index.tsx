/* eslint-disable react/prop-types */
import { Button, Col, Form, Input, Row } from 'antd';
import { useGeneralContext } from 'app/context/GeneralContext';
import { rulesForm } from 'app/pages/agregarProducto/utils/rulesForm';
import React from 'react';
import '../../styles/styles.css';

const { Item } = Form;
export default function LoginMainForm({
  loginForm,
  loginFormRef,
  loginUser,
  loginFormData,
  handleChange,
  openModal,
}) {
  //   Context
  const { themeColors, darkMode } = useGeneralContext();
  return (
    <Form
      form={loginForm}
      layout="vertical"
      ref={loginFormRef}
      name="LoginForm"
      onFinish={loginUser}
      initialValues={loginFormData}
      // style={{ border: 'solid red 3px' }}
      className="GeneralFormStyle"
    >
      <Row gutter={[16, 16]}>
        {/* Campo Correo */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Item
            required
            label="Correo"
            name="correo"
            rules={rulesForm.rulesCorreo} // Cambia esto para que use una regla de validación de correo si la tienes
            validateTrigger="onBlur"
          >
            <Input
              placeholder="Correo electrónico"
              onChange={handleChange}
              name="correo"
              style={{
                border: `1px solid ${themeColors.colorBorderCustom}`,
                ...(darkMode && { borderWidth: 2 }),
              }}
            />
          </Item>
        </Col>

        {/* Campo Contraseña */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Item
            required
            label="Contraseña"
            name="contrasena"
            rules={rulesForm.rulesContrasena} // Cambia esto para que use una regla de validación de contraseña si la tienes
            validateTrigger="onBlur"
          >
            <Input.Password
              placeholder="Contraseña"
              onChange={handleChange}
              name="contrasena"
              style={{
                border: `1px solid ${themeColors.colorBorderCustom}`,
                ...(darkMode && { borderWidth: 2 }),
              }}
            />
          </Item>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Iniciar Sesión
          </Button>
          <p style={{ marginTop: '1em' }}>
            ¿Quieres registrarte?{' '}
            <Button type="link" onClick={openModal}>
              Regístrate aquí
            </Button>
          </p>
        </Col>
      </Row>
    </Form>
  );
}
