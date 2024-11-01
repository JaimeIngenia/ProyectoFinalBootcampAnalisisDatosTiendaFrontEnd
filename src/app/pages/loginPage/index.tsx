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
import React, { useEffect, useRef, useState } from 'react';
import { rulesForm } from '../agregarProducto/utils/rulesForm';
import { useSlice } from 'app/features/slice';
import { useDispatch } from 'react-redux';
import { Entity, ResponseState } from 'app/features/slice/types';
import { GeneralContainer } from './components/containers';
import LoginMainForm from './features/loginMainForm';
import RegistroMainForm from './features/registroMainForm';
import {
  formRegisterValidation,
  formValidation,
} from '../agregarProducto/utils/formValidation';
import {
  LOAD_CATEGORIAS_LIST,
  LOAD_ROLES_LIST,
} from 'app/features/slice/sagaActions';
const { Item } = Form;

export default function LoginPage() {
  const [loginFormData, setLoginFormData] = useState({
    correo: '',
    contrasena: '',
  });
  const [loginForm] = Form.useForm(); // Cambiado a loginForm para diferenciar
  const loginFormRef = useRef<FormInstance>(null); // Cambiado a loginFormRef para diferenciar

  //   Context
  const {
    themeColors,
    darkMode,
    roles,
    loadingRoles,
    categorias,
    loadingCategorias,
  } = useGeneralContext();
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
    empleadoId: '',
    rolId: '',
    sucursalId: '',
    correo: '',
    validationLogin: false,
    tiempoSesionActivo: undefined,
    imagen: '',
  });
  const [registerForm] = Form.useForm(); // Formulario del modal
  const registerFormRef = useRef<FormInstance>(null);
  const [isButtonRegistrerDisabled, setIsButtonRegistrerDisabled] =
    useState(true);

  // const handleChangeRegistro = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;

  //   // Actualizar el Form y el estado local
  //   registerFormRef.current?.setFieldsValue({ [name]: value });
  //   setLoginFormData(prev => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  //   // Validar solo el campo que ha cambiado
  //   registerFormRef.current
  //     ?.validateFields([name]) // Valida solo el campo actual
  //     .then(() => {
  //       // debugger;
  //       // setIsButtonDisabled(false); // Habilitar el botón si no hay errores
  //     })
  //     .catch(() => {
  //       // setIsButtonDisabled(true); // Deshabilitar el botón si hay errores
  //     });
  // };

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
        // debugger;
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

  useEffect(() => {
    const errors = formRegisterValidation(registerFormData); // Ejecuta la validación completa
    debugger;

    setIsButtonRegistrerDisabled(Object.keys(errors).length > 0); // Habilita/deshabilita el botón en base a los errores
    console.log('isButtonRegisterDisabled:', Object.keys(errors).length > 0);
  }, [registerFormData]);

  // Funciones para el modal
  const openModal = () => setIsModalOpen(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
  const closeModal = () => setIsModalOpen(false);
  const handleRegisterSubmit = () => {
    if (!registerFormRef.current) return;
    const registerData = registerFormRef.current.getFieldsValue();
    setRegisterFormData(registerData);
    console.log('Datos de registro:', registerData);
    closeModal();
  };
  // Manejo estado de carga

  const [loadingSpinRoles, setLoadingSpinRoles] = useState<boolean>(false);
  const [firstCharge, setFirstCharge] = useState<boolean>(true);
  const [roleListState, setRoleListState] = useState<Entity[]>([]);

  const [categoriaListState, setCategoriaListState] = useState<Entity[]>([]);
  const [loadingSpinCategorias, setLoadingSpinCategorias] =
    useState<boolean>(false);

  useEffect(() => {
    if (firstCharge) {
      if (
        loadingRoles?.state === ResponseState.Waiting &&
        loadingCategorias?.state === ResponseState.Waiting
      ) {
        dispatch(actions.loadRoles(ResponseState.Started));
        dispatch(actions.loadCategorias(ResponseState.Started));
      } else if (
        loadingRoles?.state === ResponseState.Started &&
        loadingCategorias?.state === ResponseState.Started
      ) {
        setFirstCharge(false);
        dispatch(actions.loadRoles(ResponseState.InProgress));
        dispatch(actions.loadCategorias(ResponseState.InProgress));
        dispatch({
          type: LOAD_ROLES_LIST,
        });
        dispatch({
          type: LOAD_CATEGORIAS_LIST,
        });
      }
    }
    if (
      loadingRoles?.state === ResponseState.InProgress &&
      loadingCategorias?.state === ResponseState.InProgress
    ) {
      setLoadingSpinRoles(true);
      setLoadingSpinCategorias(true);
    } else if (
      loadingRoles?.state === ResponseState.Finished &&
      loadingCategorias?.state === ResponseState.Finished
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
  }, [roles, loadingRoles, categorias, loadingCategorias]);

  return (
    <GeneralContainer>
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
              handleSelectChange={handleSelectChange}
              loadingSpinRoles={loadingSpinRoles}
              loadingSpinCategorias={loadingSpinCategorias}
              categoriaListState={categoriaListState}
              roleListState={roleListState}
            />
          </Spin>
        </Modal>
      </ConfigProvider>
    </GeneralContainer>
  );
}
