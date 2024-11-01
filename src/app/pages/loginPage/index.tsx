import {
  Spin,
  Form,
  Row,
  Col,
  Input,
  ConfigProvider,
  FormInstance,
  Button,
  Modal,
} from 'antd';
import { useGeneralContext } from 'app/context/GeneralContext';
import React, { useRef, useState } from 'react';
import { rulesForm } from '../agregarProducto/utils/rulesForm';
import { useSlice } from 'app/features/slice';
import { useDispatch } from 'react-redux';
import { ResponseState } from 'app/features/slice/types';
import { GeneralContainer } from './components/containers';
const { Item } = Form;

export default function LoginPage() {
  const [loginFormData, setLoginFormData] = useState({
    correo: '',
    contrasena: '',
  });
  const [loginForm] = Form.useForm(); // Cambiado a loginForm para diferenciar
  const loginFormRef = useRef<FormInstance>(null); // Cambiado a loginFormRef para diferenciar

  //   Context
  const { themeColors, darkMode } = useGeneralContext();
  //redux
  const { actions } = useSlice();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Actualizar el Form y el estado local
    loginFormRef.current?.setFieldsValue({ [name]: value });
    setLoginFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Validar solo el campo que ha cambiado
    loginFormRef.current
      ?.validateFields([name]) // Valida solo el campo actual
      .then(() => {
        // debugger;
        // setIsButtonDisabled(false); // Habilitar el botón si no hay errores
      })
      .catch(() => {
        // setIsButtonDisabled(true); // Deshabilitar el botón si hay errores
      });
  };

  const loginUser = () => {
    if (!loginFormRef.current) {
      return;
    }
    const formValues = loginFormRef.current.getFieldsValue();
    const loginData = {
      ...formValues,
    };
    debugger;

    dispatch(actions.loadLogin(ResponseState.InProgress)); // Cambiamos el estado a Started
    dispatch({
      type: 'LOGIN_USER',
      payload: loginData,
    });
  };

  //Registro
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
  const [registerForm] = Form.useForm(); // Formulario del modal
  const registerFormRef = useRef<FormInstance>(null);
  // Funciones para el modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleRegisterSubmit = () => {
    if (!registerFormRef.current) return;
    const registerData = registerFormRef.current.getFieldsValue();
    console.log('Datos de registro:', registerData);
    closeModal();
  };

  return (
    <GeneralContainer>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: themeColors.colorPrimary,
            colorTextBase: themeColors.colorTextBase,
            colorTextLightSolid: themeColors.colorTextLightSolid,
            // Otros tokens personalizados
            colorBgBase: themeColors.background, // Fondo general
            colorBorder: themeColors.colorBorderCustom,
          },
        }}
      >
        <Spin spinning={false}>
          <Form
            form={loginForm}
            layout="vertical"
            ref={loginFormRef}
            name="LoginForm"
            onFinish={loginUser}
            initialValues={loginFormData}
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
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: '100%' }}
                >
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
          <Modal
            title="Registro"
            visible={isModalOpen}
            onCancel={closeModal}
            footer={null}
          >
            <Form
              form={registerForm}
              layout="vertical"
              ref={registerFormRef}
              name="RegisterForm"
              onFinish={handleRegisterSubmit}
            >
              <Item label="Correo" name="correo" rules={rulesForm.rulesCorreo}>
                <Input placeholder="Correo electrónico" />
              </Item>
              <Item
                label="Contraseña"
                name="contrasena"
                rules={rulesForm.rulesContrasena}
              >
                <Input.Password placeholder="Contraseña" />
              </Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
              >
                Registrarse
              </Button>
            </Form>
          </Modal>
        </Spin>
      </ConfigProvider>
    </GeneralContainer>
  );
}
