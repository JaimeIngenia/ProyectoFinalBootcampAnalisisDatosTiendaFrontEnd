import { ConfigProvider, Form, FormInstance, message, Spin } from 'antd';
import {
  ContainerImagesGeneral,
  CustomContainerForm,
  CustomTitleGeneal,
  GeneralContainer,
  SubGeneralContainer,
} from 'app/components/containers';
import { useGeneralContext } from 'app/context/GeneralContext';
import { useSlice } from 'app/features/slice';
import { ResponseState } from 'app/features/slice/types';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  formClientSaveValidation,
  formValidation,
} from '../agregarProducto/utils/formValidation';
import agregarClienteDark from '../../../assets/agregarCliente.svg';
import agregarClienteLight from '../../../assets/clientes/clientLight.svg';
import MainForm from './features/mainForm';
import styles from './features/mainForm/styles/CrearCliente.module.css';
import { ClienteEntity, ClienteEntitySave } from 'app/api/clientes/types';
import { clienteById_Empty } from 'app/features/slice/emptyTypes';
import {
  GET_CLIENT_BY_ID,
  UPDATE_CLIENT,
} from 'app/features/slice/sagaActions';

export default function CrearClientPage() {
  // Hook para navegar entre rutas
  const navigate = useNavigate();
  // Obtén el ID de los parámetros de la URL
  const { id } = useParams();

  const {
    clienteSaveLoading,
    themeColors,
    clienteGetById,
    loadingClienteGetById,
    loadingUpdateClient,
    darkMode,
  } = useGeneralContext();

  //Genral flow redux
  const { actions } = useSlice();
  const dispatch = useDispatch();

  //Formulario

  const clienteSaveformRef = useRef<FormInstance>(null);

  const [clientSaveform] = Form.useForm();

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [clienteSaveformData, setClienteSaveFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
  });

  const saveCliente = () => {
    if (!clienteSaveformRef.current) {
      return;
    }
    const formValues = clienteSaveformRef.current.getFieldsValue();
    const productData = {
      ...formValues,
    };

    dispatch(actions.loadSaveCliente(ResponseState.InProgress));
    dispatch({
      type: 'SAVE_CLIENTE',
      payload: productData,
    });
  };

  const onUpdateCliente = () => {
    if (!clienteSaveformRef.current) {
      return;
    }
    // Obtenemos los valores del formulario
    const formValues = clienteSaveformRef.current.getFieldsValue();

    const clienteDataUpdated = {
      ...formValues,
    };
    dispatch(actions.loadUpdateClient(ResponseState.InProgress));
    dispatch({
      type: UPDATE_CLIENT,
      payload: {
        id: id,
        clientData: clienteDataUpdated,
      },
    });
    navigate(`/listarClientes`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setClienteSaveFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Validar solo el campo que ha cambiado
    clienteSaveformRef.current
      ?.validateFields([name]) // Valida solo el campo actual
      .then(() => {})
      .catch(() => {});
  };
  useEffect(() => {
    const errors = formClientSaveValidation(clienteSaveformData); // Ejecuta la validación completa
    setIsButtonDisabled(Object.keys(errors).length > 0); // Habilita/deshabilita el botón en base a los errores
  }, [clienteSaveformData]);

  // Para traer el cliente por id

  const [loadingSpinClienteById, setLoadingSpinClienteById] =
    useState<boolean>(false);
  const [clienteByIdListState, setClienteByIdListState] =
    useState<ClienteEntity>(clienteById_Empty);

  //Para Guardar el cliente

  const [loadingSpinSaveCliente, setLoadingSpinSaveCliente] =
    useState<boolean>(false);

  // Para la carga

  const [firstChargeClienteById, setFirstChargeClienteById] =
    useState<boolean>(true);

  const [a, setA] = useState<boolean>(false);

  //UseEffect para getProductById son dos

  useEffect(() => {
    if (id) {
      if (firstChargeClienteById) {
        if (loadingClienteGetById?.state === ResponseState.Waiting) {
          dispatch(actions.loadGetClientById(ResponseState.Started));
        } else if (loadingClienteGetById?.state === ResponseState.Started) {
          setFirstChargeClienteById(false);
          dispatch(actions.loadGetClientById(ResponseState.InProgress));
          dispatch({
            type: GET_CLIENT_BY_ID,
            payload: id,
          });
        }
      }
      if (loadingClienteGetById?.state === ResponseState.InProgress) {
        setLoadingSpinClienteById(true);
      } else if (loadingClienteGetById?.state === ResponseState.Finished) {
        if (loadingClienteGetById?.status) {
          if (clienteGetById && clienteSaveformRef.current) {
            setClienteByIdListState(clienteGetById);
            if (loadingSpinClienteById) setLoadingSpinClienteById(false);
          }
        } else {
          alert(loadingClienteGetById?.message);
        }
        dispatch(actions.loadGetClientById(ResponseState.Waiting));
      }
    } else {
      setClienteSaveFormData({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
      });
    }
  }, [clienteGetById, loadingClienteGetById, id, dispatch]);

  // El dos UseEffect necesario para getProductById

  useEffect(() => {
    if (
      id &&
      clienteByIdListState !== clienteById_Empty
      // && a
    ) {
      const clienteConCategoriaId = {
        nombre: clienteGetById.nombre,
        apellido: clienteGetById.apellido,
        email: clienteGetById.email,
        telefono: clienteGetById.telefono,
      };

      clienteSaveformRef.current?.setFieldsValue(clienteConCategoriaId);

      setClienteSaveFormData(clienteConCategoriaId);
    } else {
      // Resetear todos los campos
      clienteSaveformRef.current?.resetFields();
    }
  }, [id, clienteByIdListState]);

  // UseEffect para save Cliente

  useEffect(() => {
    if (clienteSaveLoading.state === ResponseState.InProgress) {
      message.loading('Guardando cliente...');
    } else if (clienteSaveLoading.state === ResponseState.Finished) {
      if (clienteSaveLoading.status) {
        message.success('Cliente guardado con éxito.');

        if (clienteSaveformRef.current) {
          clienteSaveformRef.current.resetFields();
          setClienteSaveFormData({
            nombre: '',
            apellido: '',
            email: '',
            telefono: '',
          });
        }
        navigate(`/listarClientes`);
      } else {
        message.error(
          `Error al guardar el cliente: ${clienteSaveLoading.message}`,
        );
      }
      dispatch(actions.loadSaveProducts(ResponseState.Waiting));
    }
  }, [clienteSaveLoading, dispatch]);

  return (
    <GeneralContainer>
      <CustomTitleGeneal>
        Agregar cliente a la tienda
        {/* {id
          ? 'Actualizar producto a la tienda'
          : 'Agregar producto a la tienda'} */}
      </CustomTitleGeneal>
      <SubGeneralContainer>
        <ContainerImagesGeneral>
          {/* <img style={{ width: '50%' }} src={agregarCliente} alt="" /> */}
          <div
            style={{
              width: '90%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {darkMode ? (
              <img
                style={{ width: '50%' }}
                src={agregarClienteDark}
                alt="Logo Mercado Dos Puentes"
              />
            ) : (
              <img
                style={{ width: '50%' }}
                src={agregarClienteLight}
                alt="Logo Mercado Dos Puentes"
              />
            )}
          </div>
          <br />
        </ContainerImagesGeneral>
        <div className={styles.sub_container}>
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
            <Spin spinning={loadingSpinSaveCliente || loadingSpinClienteById}>
              <MainForm
                clienteSaveformRef={clienteSaveformRef}
                clientSaveform={clientSaveform}
                isButtonDisabled={isButtonDisabled}
                saveCliente={saveCliente}
                handleChange={handleChange}
                onUpdateCliente={onUpdateCliente}
                id={id}
              />
            </Spin>
          </ConfigProvider>
        </div>
      </SubGeneralContainer>
    </GeneralContainer>
  );
}
