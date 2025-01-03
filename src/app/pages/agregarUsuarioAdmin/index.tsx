/* eslint-disable react/prop-types */
import { Form, FormInstance, Input, message, Select, Spin } from 'antd';
import { CustomButtonn } from 'app/components/containers';
import { useGeneralContext } from 'app/context/GeneralContext';
import CustomSelect from 'app/features/customSelect';
import { useSlice } from 'app/features/slice';
import {
  LOAD_CATEGORIAS_LIST,
  LOAD_EMPLEADOS_LIST,
  LOAD_ROLES_LIST,
  LOAD_SUCURSALES_LIST,
} from 'app/features/slice/sagaActions';
import { Entity, ResponseState } from 'app/features/slice/types';
import { rulesForm } from 'app/pages/agregarProducto/utils/rulesForm';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  formRegisterValidation,
  formRegisterValidationAdmin,
} from '../agregarProducto/utils/formValidation';

const { Item } = Form;
const { Option } = Select;

export default function AgregarUsuarioAdmin() {
  // Redux
  const dispatch = useDispatch();
  const { actions } = useSlice();
  // Context
  const {
    roles,
    loadingRoles,
    categorias,
    loadingCategorias,
    sucursales,
    loadingSucursales,
    empleados,
    loadinEmpleados,
    usuariosSaveLoading,
    darkMode,
    themeColors,
  } = useGeneralContext();
  //Form
  const [registerForm] = Form.useForm(); // Formulario del modal
  const registerFormRef = useRef<FormInstance>(null);

  const [registerFormData, setRegisterFormData] = useState({
    nombre: '',
    contrasena: '',
    empleadoId: '',
    rolId: '',
    sucursalId: '',
    correo: '',
    validationLogin: false,
    tiempoSesionActivo: undefined,
    imagen: '',
  });

  // Utils

  const [isButtonRegistrerDisabled, setIsButtonRegistrerDisabled] =
    useState(true);
  // Manejo estados de carga
  const [firstCharge, setFirstCharge] = useState<boolean>(true);
  const [roleListState, setRoleListState] = useState<Entity[]>([]);
  const [surcursalListState, setSurcursalListState] = useState<Entity[]>([]);
  const [empleadoListState, setEmpleadoListState] = useState<Entity[]>([]);
  const [loadingSpinRoles, setLoadingSpinRoles] = useState<boolean>(false);
  const [loadingSpinSucursales, setLoadingSpinSucursales] =
    useState<boolean>(false);
  const [loadingSpinCategorias, setLoadingSpinCategorias] =
    useState<boolean>(false);
  const [loadingSpinEmpleados, setLoadingSpinEmpleados] =
    useState<boolean>(false);
  const [categoriaListState, setCategoriaListState] = useState<Entity[]>([]);

  // Funciones

  const handleRegisterSubmit = () => {
    if (!registerFormRef.current) return;
    const registerData = registerFormRef.current.getFieldsValue();
    setRegisterFormData(registerData);
    console.log('Datos de registro:', registerData);
    dispatch(actions.loadSaveUsuario(ResponseState.InProgress)); // Cambiamos el estado a Started
    dispatch({
      type: 'SAVE_USUARIO',
      payload: registerData,
    });
    // closeModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Actualizar el Form y el estado local
    registerFormRef.current?.setFieldsValue({ [name]: value });
    setRegisterFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Validar solo el campo que ha cambiado
    registerFormRef.current
      ?.validateFields([name]) // Valida solo el campo actual
      .then(() => {
        // setIsButtonDisabled(false); // Habilitar el botón si no hay errores
      })
      .catch(() => {
        // setIsButtonDisabled(true); // Deshabilitar el botón si hay errores
      });
  };

  const handleSelectChange = (value: string) => {
    // Actualizar el Form y el estado local
    registerFormRef.current?.setFieldsValue({
      rolId: value,
    });

    setRegisterFormData(prev => ({
      ...prev,
      rolId: value,
    }));

    // Validar solo el campo 'categoriaId'
    registerFormRef.current
      ?.validateFields(['rolId']) // Valida solo el campo de categoría
      .then(() => {
        // setIsButtonDisabled(false); // Habilitar el botón si no hay errores
      })
      .catch(() => {
        // setIsButtonDisabled(true); // Deshabilitar el botón si hay errores
      });
  };

  const handleSelectChangeSucursal = (value: string) => {
    // Actualizar el Form y el estado local
    registerFormRef.current?.setFieldsValue({
      sucursalId: value,
    });

    setRegisterFormData(prev => ({
      ...prev,
      sucursalId: value,
    }));

    // Validar solo el campo 'categoriaId'
    registerFormRef.current
      ?.validateFields(['sucursalId']) // Valida solo el campo de categoría
      .then(() => {
        // setIsButtonDisabled(false); // Habilitar el botón si no hay errores
      })
      .catch(() => {
        // setIsButtonDisabled(true); // Deshabilitar el botón si hay errores
      });
  };

  const handleSelectChangeEmpleado = (value: string) => {
    // Actualizar el Form y el estado local
    registerFormRef.current?.setFieldsValue({
      empleadoId: value,
    });

    setRegisterFormData(prev => ({
      ...prev,
      empleadoId: value,
    }));

    // Validar solo el campo 'categoriaId'
    registerFormRef.current
      ?.validateFields(['empleadoId']) // Valida solo el campo de categoría
      .then(() => {
        // setIsButtonDisabled(false); // Habilitar el botón si no hay errores
      })
      .catch(() => {
        // setIsButtonDisabled(true); // Deshabilitar el botón si hay errores
      });
  };

  // UseEffects

  useEffect(() => {
    if (firstCharge) {
      if (
        loadingRoles?.state === ResponseState.Waiting &&
        loadingCategorias?.state === ResponseState.Waiting &&
        loadingSucursales?.state === ResponseState.Waiting &&
        loadinEmpleados?.state === ResponseState.Waiting
      ) {
        dispatch(actions.loadRoles(ResponseState.Started));
        dispatch(actions.loadCategorias(ResponseState.Started));
        dispatch(actions.loadSucursales(ResponseState.Started));
        dispatch(actions.loadEmpleados(ResponseState.Started));
      } else if (
        loadingRoles?.state === ResponseState.Started &&
        loadingCategorias?.state === ResponseState.Started &&
        loadingSucursales?.state === ResponseState.Started &&
        loadinEmpleados?.state === ResponseState.Started
      ) {
        setFirstCharge(false);
        dispatch(actions.loadRoles(ResponseState.InProgress));
        dispatch(actions.loadCategorias(ResponseState.InProgress));
        dispatch(actions.loadSucursales(ResponseState.InProgress));
        dispatch(actions.loadEmpleados(ResponseState.InProgress));
        dispatch({
          type: LOAD_ROLES_LIST,
        });
        dispatch({
          type: LOAD_CATEGORIAS_LIST,
        });
        dispatch({
          type: LOAD_SUCURSALES_LIST,
        });
        dispatch({
          type: LOAD_EMPLEADOS_LIST,
        });
      }
    }
    if (
      loadingRoles?.state === ResponseState.InProgress &&
      loadingCategorias?.state === ResponseState.InProgress &&
      loadingSucursales?.state === ResponseState.InProgress &&
      loadinEmpleados?.state === ResponseState.InProgress
    ) {
      setLoadingSpinRoles(true);
      setLoadingSpinCategorias(true);
      setLoadingSpinSucursales(true);
      setLoadingSpinEmpleados(true);
    } else if (
      loadingRoles?.state === ResponseState.Finished &&
      loadingCategorias?.state === ResponseState.Finished &&
      loadingSucursales?.state === ResponseState.Finished &&
      loadinEmpleados?.state === ResponseState.Finished
    ) {
      if (loadingRoles?.status) {
        if (roles && roles.length > 0) {
          let dataList: Array<Entity> = [];

          roles?.forEach(r => {
            dataList.push({
              id: r.id,
              nombre: r.nombre,
            });
          });
          setRoleListState(dataList);
          if (loadingSpinRoles) setLoadingSpinRoles(false);
        }
      }
      if (loadingSucursales?.status) {
        if (sucursales && sucursales.length > 0) {
          let dataList: Array<Entity> = [];

          sucursales?.forEach(r => {
            dataList.push({
              id: r.id,
              nombre: r.nombre,
            });
          });
          setSurcursalListState(dataList);
          if (loadingSpinSucursales) setLoadingSpinSucursales(false);
        }
      }
      if (loadinEmpleados?.status) {
        if (empleados && empleados.length > 0) {
          let dataList: Array<Entity> = [];

          empleados?.forEach(r => {
            dataList.push({
              id: r.id,
              nombre: r.nombre,
            });
          });
          setEmpleadoListState(dataList);
          if (loadingSpinEmpleados) setLoadingSpinEmpleados(false);
        }
      }
      if (loadingCategorias?.status) {
        if (categorias && categorias.length > 0) {
          let dataList: Array<Entity> = [];

          categorias?.forEach(r => {
            dataList.push({
              id: r.id,
              nombre: r.nombre,
            });
          });
          setCategoriaListState(dataList);
          if (loadingSpinCategorias) setLoadingSpinCategorias(false);
        }
      } else {
        alert(loadingRoles?.message);
        alert(loadingCategorias?.message);
      }
      dispatch(actions.loadRoles(ResponseState.Waiting));
      dispatch(actions.loadCategorias(ResponseState.Waiting));
    }
  }, [
    roles,
    loadingRoles,
    categorias,
    loadingCategorias,
    sucursales,
    loadingSucursales,
    empleados,
    loadinEmpleados,
  ]);

  useEffect(() => {
    const errors = formRegisterValidationAdmin(registerFormData); // Ejecuta la validación completa

    setIsButtonRegistrerDisabled(Object.keys(errors).length > 0); // Habilita/deshabilita el botón en base a los errores
    console.log('isButtonRegisterDisabled:', Object.keys(errors).length > 0);
  }, [registerFormData]);

  // UseEffect para save usuarios
  useEffect(() => {
    if (usuariosSaveLoading.state === ResponseState.InProgress) {
      message.loading('Guardando usuario...');
    } else if (usuariosSaveLoading.state === ResponseState.Finished) {
      if (usuariosSaveLoading.status) {
        message.success('Usuario guardado con éxito.');

        if (registerFormRef.current) {
          registerFormRef.current.resetFields();
          setRegisterFormData({
            nombre: '',
            contrasena: '',
            empleadoId: '',
            rolId: '',
            sucursalId: '',
            correo: '',
            validationLogin: false,
            tiempoSesionActivo: undefined,
            imagen: '',
          });
        }
        // navigate(`/listaProductos`);
      } else {
        message.error(
          `Error al guardar el usuario: ${usuariosSaveLoading.message}`,
        );
      }
      dispatch(actions.loadSaveUsuario(ResponseState.Waiting));
    }
  }, [usuariosSaveLoading, dispatch]);

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
      <Item
        required
        label="Empleado"
        name="empleadoId"
        rules={rulesForm.rulesEmpleadoId}
        validateTrigger="onBlur"
      >
        <Spin spinning={loadingSpinSucursales}>
          <CustomSelect
            list={empleadoListState}
            onChange={handleSelectChangeEmpleado}
            label="Sucursal"
            value={registerFormData.empleadoId}
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
