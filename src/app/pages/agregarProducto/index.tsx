import { ConfigProvider, Form, FormInstance, message } from 'antd';
import { GeneralContainer } from 'app/components/containers';
import { useGeneralContext } from 'app/context/GeneralContext';
import { useSlice } from 'app/features/slice';
import { LOAD_CATEGORIAS_LIST } from 'app/features/slice/sagaActions';
import { Entity, ResponseState } from 'app/features/slice/types';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import agregarProducto from '../../../assets/agregarProducto.svg';
import MainForm from './features/mainForm/MainForm';
import styles from './styles/AgregarProducto.module.css';
import { formValidation } from './utils/formValidation';

export default function AgregarProducto() {
  //Genral flow redux
  const { actions } = useSlice();
  const dispatch = useDispatch();

  //   Context
  const { categorias, loadingCategorias, themeColors, productosSaveLoading } =
    useGeneralContext();

  // Manejo estados de carga

  const [loadingSpinCategorias, setLoadingSpinCategorias] =
    useState<boolean>(false);

  const [firstCharge, setFirstCharge] = useState<boolean>(true);

  const [categoriaListState, setCategoriaListState] = useState<Entity[]>([]);

  useEffect(() => {
    if (firstCharge) {
      if (loadingCategorias?.state === ResponseState.Waiting) {
        dispatch(actions.loadCategorias(ResponseState.Started));
      } else if (loadingCategorias?.state === ResponseState.Started) {
        setFirstCharge(false);
        dispatch(actions.loadCategorias(ResponseState.InProgress));
        dispatch({
          type: LOAD_CATEGORIAS_LIST,
        });
      }
    }
    if (loadingCategorias?.state === ResponseState.InProgress) {
      setLoadingSpinCategorias(true);
    } else if (loadingCategorias?.state === ResponseState.Finished) {
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
        alert(loadingCategorias?.message);
      }
      dispatch(actions.loadCategorias(ResponseState.Waiting));
    }
  }, [categorias, loadingCategorias]);

  //Form

  const formRef = useRef<FormInstance>(null);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [reset, setReset] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: 0,
    categoriaId: 0,
  });

  const saveProduct = () => {
    if (!formRef.current) {
      return;
    }

    // Obtenemos los valores del formulario
    const formValues = formRef.current.getFieldsValue();

    // Preparamos los datos a enviar
    const productData = {
      ...formValues,
      precio: Number(formValues.precio), // Aseguramos que el precio sea un número
      categoriaId: String(formValues.categoriaId), // Convertimos categoriaId a número
    };

    // Dispatch de Redux para iniciar el guardado
    dispatch(actions.loadSaveProducts(ResponseState.InProgress)); // Cambiamos el estado a Started
    dispatch({
      type: 'SAVE_PRODUCTOS',
      payload: productData,
    });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (formRef.current) {
      formRef.current.resetFields();
    }
    setReset(false);
  }, [reset]);

  useEffect(() => {
    const validationErrors = formValidation(formData);
    setErrors(validationErrors);

    setIsButtonDisabled(Object.keys(validationErrors).length > 0);
  }, [formData]);

  // UseEffect para manejar los estados de carga
  useEffect(() => {
    if (productosSaveLoading.state === ResponseState.InProgress) {
      message.loading('Guardando producto...');
    } else if (productosSaveLoading.state === ResponseState.Finished) {
      if (productosSaveLoading.status) {
        // Si el producto se guarda con éxito
        message.success('Producto guardado con éxito.');

        // Verificar si formRef.current no es null antes de resetear el formulario
        if (formRef.current) {
          formRef.current.resetFields();
          setFormData({
            nombre: '',
            descripcion: '',
            precio: 0,
            categoriaId: 0,
          });
        }
      } else {
        // Manejar errores en la solicitud
        message.error(
          `Error al guardar el producto: ${productosSaveLoading.message}`,
        );
      }
      // Resetear el estado de carga después de que el proceso ha terminado
      dispatch(actions.loadSaveProducts(ResponseState.Waiting));
    }
  }, [productosSaveLoading, dispatch]);

  return (
    <>
      <GeneralContainer>
        <h1
          style={{
            height: '20vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            border: 'solid red 3px',
          }}
        >
          Agregar producto a la tienda
        </h1>
        <div
          style={{
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '50%',
              marginBottom: '50px',
              height: '20vh',
            }}
          >
            <img style={{ width: '50%' }} src={agregarProducto} alt="" />
          </div>
          <div className={styles.sub_container}>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: themeColors.colorPrimary,
                  colorTextBase: themeColors.colorTextBase,
                  colorTextLightSolid: themeColors.colorTextLightSolid,
                },
              }}
            >
              <MainForm
                formRef={formRef}
                saveProduct={saveProduct}
                handleChange={handleChange}
                formData={formData}
                setFormData={setFormData}
                loadingSpinCategorias={loadingSpinCategorias}
                categoriaListState={categoriaListState}
                isButtonDisabled={isButtonDisabled}
              />
            </ConfigProvider>
          </div>
        </div>
      </GeneralContainer>
    </>
  );
}
