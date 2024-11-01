/* eslint-disable react/prop-types */
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Spin,
  TimePicker,
  Upload,
} from 'antd';
import { rulesForm } from 'app/pages/agregarProducto/utils/rulesForm';
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { useGeneralContext } from 'app/context/GeneralContext';
import { CustomButtonn } from 'app/components/containers';
import CustomSelect from 'app/features/customSelect';

const { Item } = Form;
const { Option } = Select;

export default function RegistroMainForm({
  registerForm,
  registerFormRef,
  handleRegisterSubmit,
  handleChange,
  registerFormData,
  isButtonRegistrerDisabled,
  handleSelectChange,
  loadingSpinRoles,
  loadingSpinCategorias,
  categoriaListState,
  roleListState,
  surcursalListState,
  loadingSpinSucursales,
  handleSelectChangeSucursal,
}) {
  const { darkMode, themeColors } = useGeneralContext();
  return (
    <Form
      form={registerForm}
      layout="vertical"
      ref={registerFormRef}
      name="RegisterForm"
      onFinish={handleRegisterSubmit}
      initialValues={registerFormData}
    >
      <Item
        required
        label="Nombre"
        name="nombre"
        rules={rulesForm.rulesNombre}
        validateTrigger="onBlur"
      >
        <Input
          placeholder="Nombre del usuario"
          onChange={handleChange}
          name="nombre"
          style={
            darkMode
              ? { border: `2px solid ${themeColors.colorBorderCustom}` }
              : { border: `1px solid ${themeColors.colorBorderCustom}` }
          }
        />
      </Item>

      <Item
        // required
        label="Correo"
        name="correo"
        rules={rulesForm.rulesCorreo}
        validateTrigger="onBlur"
      >
        <Input
          placeholder="Correo electrónico"
          onChange={handleChange}
          name="correo"
          style={
            darkMode
              ? { border: `2px solid ${themeColors.colorBorderCustom}` }
              : { border: `1px solid ${themeColors.colorBorderCustom}` }
          }
        />
      </Item>

      <Item
        // required
        label="Contraseña"
        name="contrasena"
        rules={rulesForm.rulesContrasena}
        validateTrigger="onBlur"
      >
        <Input.Password
          placeholder="Contraseña"
          onChange={handleChange}
          name="contrasena"
          style={
            darkMode
              ? { border: `2px solid ${themeColors.colorBorderCustom}` }
              : { border: `1px solid ${themeColors.colorBorderCustom}` }
          }
        />
      </Item>

      <Item
        required
        label="Rol"
        name="rolId"
        rules={rulesForm.rulesRolesId}
        validateTrigger="onBlur"
      >
        <Spin spinning={loadingSpinRoles}>
          <CustomSelect
            list={roleListState}
            onChange={handleSelectChange}
            label="Rol"
            value={registerFormData.rolId}
          />
        </Spin>
      </Item>
      <Item
        required
        label="Sucursal"
        name="sucursalId"
        rules={rulesForm.rulesSucursalId}
        validateTrigger="onBlur"
      >
        <Spin spinning={loadingSpinSucursales}>
          <CustomSelect
            list={surcursalListState}
            onChange={handleSelectChangeSucursal}
            label="Sucursal"
            value={registerFormData.sucursalId}
          />
        </Spin>
      </Item>

      <CustomButtonn
        type="primary"
        htmlType="submit"
        disabled={isButtonRegistrerDisabled}
        block
      >
        Registrarse
      </CustomButtonn>
    </Form>
  );
}
