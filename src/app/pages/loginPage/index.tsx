import { ConfigProvider, Form, FormInstance, message, Modal, Spin } from 'antd';
import { useGeneralContext } from 'app/context/GeneralContext';
import { useSlice } from 'app/features/slice';
import {
  LOAD_CATEGORIAS_LIST,
  LOAD_EMPLEADOS_LIST,
  LOAD_ROLES_LIST,
  LOAD_SUCURSALES_LIST,
} from 'app/features/slice/sagaActions';
import { Entity, ResponseState } from 'app/features/slice/types';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { formRegisterValidation } from '../agregarProducto/utils/formValidation';
import {
  GeneralContainer,
  GeneralContainerLogin,
} from './components/containers';
import LoginMainForm from './features/loginMainForm';
import RegistroMainForm from './features/registroMainForm';
const { Item } = Form;

export default function LoginPage() {
  //   Context
  const {
    themeColors,
    darkMode,
    roles,
    loadingRoles,
    categorias,
    loadingCategorias,
    sucursales,
    loadingSucursales,
    empleados,
    loadinEmpleados,
    usuariosSaveLoading,
  } = useGeneralContext();
  // Funciones para el modal
  const openModal = () => setIsModalOpen(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
  const closeModal = () => setIsModalOpen(false);
  // Login

  const [loginFormData, setLoginFormData] = useState({
    correo: '',
    contrasena: '',
  });
  const [loginForm] = Form.useForm(); // Cambiado a loginForm para diferenciar
  const loginFormRef = useRef<FormInstance>(null); // Cambiado a loginFormRef para diferenciar

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

    dispatch(actions.loadLogin(ResponseState.InProgress)); // Cambiamos el estado a Started
    dispatch({
      type: 'LOGIN_USER',
      payload: loginData,
    });
  };

  // --------
  //Registro
  // --------

  const [registerFormData, setRegisterFormData] = useState({
    nombre: '',
    contrasena: '',
    // empleadoId: '',
    // rolId: '',
    // sucursalId: '',
    // empleadoId: null, // Cambiado a nullable
    // rolId: null, // Cambiado a nullable
    // sucursalId: null, // Cambiado a nullable
    correo: '',
    validationLogin: false,
    tiempoSesionActivo: undefined,
    imagen: '',
  });
  const [registerForm] = Form.useForm(); // Formulario del modal
  const registerFormRef = useRef<FormInstance>(null);
  const [isButtonRegistrerDisabled, setIsButtonRegistrerDisabled] =
    useState(true);

  const handleChangeRegistro = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Actualiza el valor en el formulario de Ant Design
    registerFormRef.current?.setFieldsValue({ [name]: value });

    // Actualiza el estado local para la validación en useEffect
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

  // const handleSelectChange = (value: string) => {
  //   // Actualizar el Form y el estado local
  //   registerFormRef.current?.setFieldsValue({
  //     rolId: value,
  //   });

  //   setRegisterFormData(prev => ({
  //     ...prev,
  //     rolId: value,
  //   }));

  //   // Validar solo el campo 'categoriaId'
  //   registerFormRef.current
  //     ?.validateFields(['rolId']) // Valida solo el campo de categoría
  //     .then(() => {
  //       // setIsButtonDisabled(false); // Habilitar el botón si no hay errores
  //     })
  //     .catch(() => {
  //       // setIsButtonDisabled(true); // Deshabilitar el botón si hay errores
  //     });
  // };
  // const handleSelectChangeSucursal = (value: string) => {
  //   // Actualizar el Form y el estado local
  //   registerFormRef.current?.setFieldsValue({
  //     sucursalId: value,
  //   });

  //   setRegisterFormData(prev => ({
  //     ...prev,
  //     sucursalId: value,
  //   }));

  //   // Validar solo el campo 'categoriaId'
  //   registerFormRef.current
  //     ?.validateFields(['sucursalId']) // Valida solo el campo de categoría
  //     .then(() => {
  //       // setIsButtonDisabled(false); // Habilitar el botón si no hay errores
  //     })
  //     .catch(() => {
  //       // setIsButtonDisabled(true); // Deshabilitar el botón si hay errores
  //     });
  // };
  // const handleSelectChangeEmpleado = (value: string) => {
  //   // Actualizar el Form y el estado local
  //   registerFormRef.current?.setFieldsValue({
  //     empleadoId: value,
  //   });

  //   setRegisterFormData(prev => ({
  //     ...prev,
  //     empleadoId: value,
  //   }));

  //   // Validar solo el campo 'categoriaId'
  //   registerFormRef.current
  //     ?.validateFields(['empleadoId']) // Valida solo el campo de categoría
  //     .then(() => {
  //       // setIsButtonDisabled(false); // Habilitar el botón si no hay errores
  //     })
  //     .catch(() => {
  //       // setIsButtonDisabled(true); // Deshabilitar el botón si hay errores
  //     });
  // };

  useEffect(() => {
    const errors = formRegisterValidation(registerFormData); // Ejecuta la validación completa

    setIsButtonRegistrerDisabled(Object.keys(errors).length > 0); // Habilita/deshabilita el botón en base a los errores
    console.log('isButtonRegisterDisabled:', Object.keys(errors).length > 0);
  }, [registerFormData]);

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
    closeModal();
  };
  // Manejo estado de carga

  const [firstCharge, setFirstCharge] = useState<boolean>(true);

  const [loadingSpinRoles, setLoadingSpinRoles] = useState<boolean>(false);
  const [loadingSpinCategorias, setLoadingSpinCategorias] =
    useState<boolean>(false);
  const [loadingSpinSucursales, setLoadingSpinSucursales] =
    useState<boolean>(false);
  const [loadingSpinEmpleados, setLoadingSpinEmpleados] =
    useState<boolean>(false);

  const [roleListState, setRoleListState] = useState<Entity[]>([]);
  const [surcursalListState, setSurcursalListState] = useState<Entity[]>([]);
  const [empleadoListState, setEmpleadoListState] = useState<Entity[]>([]);
  const [categoriaListState, setCategoriaListState] = useState<Entity[]>([]);

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
            // empleadoId: '',
            // rolId: '',
            // sucursalId: '',
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
    <GeneralContainerLogin>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: themeColors.colorPrimary,
            colorTextBase: themeColors.colorTextBase,
            colorTextLightSolid: themeColors.colorTextLightSolid,
            colorBgBase: themeColors.background,
            colorBorder: themeColors.colorBorderCustom,
          },
        }}
      >
        <Spin spinning={false}>
          <LoginMainForm
            loginForm={loginForm}
            loginFormRef={loginFormRef}
            loginUser={loginUser}
            loginFormData={loginFormData}
            handleChange={handleChange}
            openModal={openModal}
          />
        </Spin>
        <Modal
          title="Registro"
          visible={isModalOpen}
          onCancel={closeModal}
          footer={null}
        >
          <Spin spinning={false}>
            <RegistroMainForm
              registerForm={registerForm}
              registerFormRef={registerFormRef}
              handleRegisterSubmit={handleRegisterSubmit}
              registerFormData={registerFormData}
              handleChange={handleChangeRegistro}
              isButtonRegistrerDisabled={isButtonRegistrerDisabled}
              loadingSpinRoles={loadingSpinRoles}
              loadingSpinCategorias={loadingSpinCategorias}
              categoriaListState={categoriaListState}
              roleListState={roleListState}
              surcursalListState={surcursalListState}
              loadingSpinSucursales={loadingSpinSucursales}
              empleadoListState={empleadoListState}
              loadingSpinEmpleados={loadingSpinEmpleados}
              // handleSelectChange={handleSelectChange}
              // handleSelectChangeSucursal={handleSelectChangeSucursal}
              // handleSelectChangeEmpleado={handleSelectChangeEmpleado}
            />
          </Spin>
        </Modal>
      </ConfigProvider>
    </GeneralContainerLogin>
  );
}
