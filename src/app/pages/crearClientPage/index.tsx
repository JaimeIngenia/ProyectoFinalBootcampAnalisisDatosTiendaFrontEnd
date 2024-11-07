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
import agregarCliente from '../../../assets/agregarCliente.svg';
import MainForm from './features/mainForm';
import styles from './features/mainForm/styles/CrearCliente.module.css';
import { ClienteEntity, ClienteEntitySave } from 'app/api/clientes/types';
import { clienteById_Empty } from 'app/features/slice/emptyTypes';
import { GET_CLIENT_BY_ID } from 'app/features/slice/sagaActions';

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

  const saveProduct = () => {
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

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;

  //   // Actualizar el Form y el estado local
  //   clienteSaveformRef.current?.setFieldsValue({});

  //   setClienteSaveFormData(prev => ({
  //     ...prev,
  //   }));

  //   // Validar solo el campo que ha cambiado
  //   clienteSaveformRef.current
  //     ?.validateFields([name]) // Valida solo el campo actual
  //     .then(() => {})
  //     .catch(() => {});
  // };
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

  // Para la carga

  const [firstChargeClienteById, setFirstChargeClienteById] =
    useState<boolean>(true);

  const [a, setA] = useState<boolean>(false);

  //UseEffect para getProductById

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
          debugger;
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

  //Para Guardar el cliente

  const [loadingSpinSaveCliente, setLoadingSpinSaveCliente] =
    useState<boolean>(false);

  // UseEffect para save products son dos

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

  // El dos
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
  }, [id, clienteByIdListState, a]);
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
          <img style={{ width: '50%' }} src={agregarCliente} alt="" />
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
                saveProduct={saveProduct}
                handleChange={handleChange}
              />
            </Spin>
          </ConfigProvider>
        </div>
      </SubGeneralContainer>
    </GeneralContainer>
  );
}
