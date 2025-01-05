import { ConfigProvider, Form, FormInstance, message, Modal, Spin } from 'antd';
import { ProductEntityGetById } from 'app/api/products/types';
import {
  ContainerImagesGeneral,
  CustomTitleGeneal,
  GeneralContainer,
  SubGeneralContainer,
} from 'app/components/containers';
import { useGeneralContext } from 'app/context/GeneralContext';
import { useSlice } from 'app/features/slice';
import { productoById_Empty } from 'app/features/slice/emptyTypes';
import {
  GET_PRODUCT_BY_ID,
  LOAD_CATEGORIAS_LIST,
  UPDATE_PRODUCT,
} from 'app/features/slice/sagaActions';
import { Entity, ResponseState } from 'app/features/slice/types';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import agregarProductoDark from '../../../assets/agregarProducto.svg';
import agregarProductoLight from '../../../assets/products/productosLight.svg';
import MainForm from './features/mainForm/MainForm';
import styles from './styles/AgregarProducto.module.css';
import {
  formModalPrecioValidation,
  formValidation,
} from './utils/formValidation';
import { v4 as uuidv4 } from 'uuid';
import ModalFormPrecio from './features/modalFormPrecio';
import { open } from 'node:fs/promises';

export default function AgregarProducto() {
  // poner de primeras por si existe errores de no lectura
  const [productoIdState, setProductoIdState] = useState('');
  // Hook para navegar entre rutas
  const navigate = useNavigate();
  // Obtén el ID de los parámetros de la URL
  const { id } = useParams();
  //Genral flow redux
  const { actions } = useSlice();
  const dispatch = useDispatch();
  //   Context
  const {
    categorias,
    loadingCategorias,
    themeColors,
    productosSaveLoading,
    productoGetById,
    loadingProductoGetById,
    loadingUpdateProduct,
    darkMode,
    isMenuCollapsed,
    preciosSaveLoading,
    loadingUpdatePrecio,
    precioGetByProductId,
    loadingPreciooGetByProductId,
  } = useGeneralContext();

  const [firstCharge, setFirstCharge] = useState<boolean>(true);
  const [firstChargeProductById, setFirstChargeProductById] =
    useState<boolean>(true);

  // Manejo estados de carga

  const [a, setA] = useState<boolean>(false);
  const [loadingSpinCategorias, setLoadingSpinCategorias] =
    useState<boolean>(false);

  const [loadingSpinProductById, setLoadingSpinProductById] =
    useState<boolean>(false);

  // Estados de lista para los selectors

  const [categoriaListState, setCategoriaListState] = useState<Entity[]>([]);

  const [productByIdListState, setProductByIdListState] =
    useState<ProductEntityGetById>(productoById_Empty);

  //Formulario

  const formRef = useRef<FormInstance>(null);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    descripcion: '',
    categoriaId: '',
    imagen: '',
    stockActual: 0,
  });

  const saveProduct = () => {
    if (!formRef.current) {
      return;
    }
    const formValues = formRef.current.getFieldsValue();
    // const productData = {
    //   ...formValues,
    // };
    const productData = {
      id: uuidv4(), // Generar un nuevo GUID
      ...formValues,
    };
    // Actualizar el estado productoId con el nuevo id
    setProductoIdState(productData.id);

    dispatch(actions.loadSaveProducts(ResponseState.InProgress)); // Cambiamos el estado a Started
    dispatch({
      type: 'SAVE_PRODUCTOS',
      payload: productData,
    });
    openModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Actualizar el Form y el estado local
    formRef.current?.setFieldsValue({
      [name]: name === 'precio' ? Number(value) : value,
    });

    setFormData(prev => ({
      ...prev,
      [name]: name === 'precio' ? Number(value) : value,
    }));

    // Actualizar el Form y el estado local
    formRef.current?.setFieldsValue({
      [name]: name === 'stockActual' ? Number(value) : value,
    });

    setFormData(prev => ({
      ...prev,
      [name]: name === 'stockActual' ? Number(value) : value,
    }));

    // Validar solo el campo que ha cambiado
    formRef.current
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
    formRef.current?.setFieldsValue({
      categoriaId: value,
    });

    setFormData(prev => ({
      ...prev,
      categoriaId: value,
    }));

    // Validar solo el campo 'categoriaId'
    formRef.current
      ?.validateFields(['categoriaId']) // Valida solo el campo de categoría
      .then(() => {
        // setIsButtonDisabled(false); // Habilitar el botón si no hay errores
      })
      .catch(() => {
        // setIsButtonDisabled(true); // Deshabilitar el botón si hay errore
      });
  };

  useEffect(() => {
    const errors = formValidation(formData); // Ejecuta la validación completa
    setIsButtonDisabled(Object.keys(errors).length > 0); // Habilita/deshabilita el botón en base a los errores
  }, [formData]);

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
          setA(true);
          if (loadingSpinCategorias) setLoadingSpinCategorias(false);
        }
      } else {
        alert(loadingCategorias?.message);
      }
      dispatch(actions.loadCategorias(ResponseState.Waiting));
    }
  }, [categorias, loadingCategorias]);

  //UseEffect para getProductById

  useEffect(() => {
    if (id) {
      if (firstChargeProductById) {
        if (loadingProductoGetById?.state === ResponseState.Waiting) {
          dispatch(actions.loadGetProductById(ResponseState.Started));
        } else if (loadingProductoGetById?.state === ResponseState.Started) {
          setFirstChargeProductById(false);
          dispatch(actions.loadGetProductById(ResponseState.InProgress));
          dispatch({
            type: GET_PRODUCT_BY_ID,
            payload: id,
          });
        }
      }
      if (loadingProductoGetById?.state === ResponseState.InProgress) {
        setLoadingSpinProductById(true);
      } else if (loadingProductoGetById?.state === ResponseState.Finished) {
        if (loadingProductoGetById?.status) {
          if (productoGetById && formRef.current) {
            setProductByIdListState(productoGetById);
            if (loadingSpinProductById) setLoadingSpinProductById(false);
          }
        } else {
          alert(loadingProductoGetById?.message);
        }
        dispatch(actions.loadGetProductById(ResponseState.Waiting));
      }
    } else {
      setFormData({
        id: '',
        nombre: '',
        descripcion: '',
        categoriaId: '',
        imagen: '',
        stockActual: 0,
      });
    }
  }, [productoGetById, loadingProductoGetById, id, dispatch]);

  useEffect(() => {
    if (
      id &&
      productByIdListState !== productoById_Empty &&
      categoriaListState.length > 0 &&
      a
    ) {
      const categoriaEncontrada = categoriaListState.find(
        categoria => categoria.id === productoGetById.categoria.id,
      );
      const productoConCategoriaId = {
        id: productoGetById.id,
        nombre: productoGetById.nombre,
        descripcion: productoGetById.descripcion,
        categoriaId: categoriaEncontrada ? categoriaEncontrada.id : '',
        imagen: productoGetById.imagen,
        stockActual: productoGetById.stockActual ?? 0,
      };

      formRef.current?.setFieldsValue(productoConCategoriaId);

      setFormData(productoConCategoriaId);
    } else {
      // Resetear todos los campos
      formRef.current?.resetFields();
    }
  }, [id, productByIdListState, categoriaListState, a]);

  // UseEffect para save products
  useEffect(() => {
    if (productosSaveLoading.state === ResponseState.InProgress) {
      message.loading('Guardando producto...');
    } else if (productosSaveLoading.state === ResponseState.Finished) {
      if (productosSaveLoading.status) {
        message.success('Producto guardado con éxito.');

        if (formRef.current) {
          formRef.current.resetFields();
          setFormData({
            // nota agregar el id **
            id: '',
            nombre: '',
            descripcion: '',
            // precio: 0,
            categoriaId: '',
            imagen: '',
            stockActual: 0,
          });
        }
        // navigate(`/listaProductos`);
      } else {
        message.error(
          `Error al guardar el producto: ${productosSaveLoading.message}`,
        );
      }
      dispatch(actions.loadSaveProducts(ResponseState.Waiting));
    }
  }, [productosSaveLoading, dispatch]);

  //Función update products
  const onUpdateProduct = () => {
    if (!formRef.current) {
      return;
    }
    // Obtenemos los valores del formulario
    const formValues = formRef.current.getFieldsValue();

    const productDataUpdated = {
      ...formValues,
    };
    dispatch(actions.loadUpdateProducts(ResponseState.InProgress));
    dispatch({
      type: UPDATE_PRODUCT,
      payload: {
        id: id,
        productData: productDataUpdated,
      },
    });
    // navigate(`/listaProductos`);
    openModal();
  };

  // Modal de precio

  const openModal = () => setIsModalOpen(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
  const closeModal = () => setIsModalOpen(false);

  // Forumario
  const [registerModalPrecioForm] = Form.useForm(); // Formulario del modal
  const modalPrecioFormRef = useRef<FormInstance>(null);
  const [modalPrecioFormData, setModalPrecioFormData] = useState({
    id: '',
    productoId: '',
    // fechaInicio: '',
    fechaInicio: new Date().toISOString(), // Fecha actual
    precioVenta: 0,
  });

  // Utils
  const [isButtonModalPrecioDisabled, setIsButtonModalPrecioDisabled] =
    useState(true);

  // Funciones
  const handleModalPrecioSubmit = () => {
    if (!modalPrecioFormRef.current) return;

    const registerData = modalPrecioFormRef.current.getFieldsValue();

    // Verificar que productoId no esté vacío
    if (!productoIdState) {
      console.error('El productoId no está definido');
      // Puedes mostrar un mensaje de error al usuario o manejarlo de otra manera
      return;
    }

    // Generar un nuevo GUID para el id
    const precioData = {
      id: uuidv4(),
      productoId: productoIdState, // Pasar el productoId desde formData
      fechaInicio: new Date().toISOString(), // Fecha actual
      precioVenta: registerData.precioVenta, // Obtener el precioVenta del formulario
    };

    setModalPrecioFormData(precioData);
    console.log('Datos de registro del precio:', precioData);
    // Nota crear el dispatch
    dispatch(actions.loadSavePrecio(ResponseState.InProgress)); // Cambiamos el estado a Started
    dispatch({
      type: 'SAVE_PRECIO',
      payload: precioData,
    });
    closeModal();
  };

  const handleChangeModalPrecio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    modalPrecioFormRef.current?.setFieldsValue({
      [name]: name === 'precio' ? Number(value) : value,
    });

    setModalPrecioFormData(prev => ({
      ...prev,
      [name]: name === 'precio' ? Number(value) : value,
    }));

    // Actualiza el valor en el formulario de Ant Design
    modalPrecioFormRef.current?.setFieldsValue({ [name]: value });

    // Actualiza el estado local para la validación en useEffect
    setModalPrecioFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Validar solo el campo que ha cambiado
    modalPrecioFormRef.current
      ?.validateFields([name]) // Valida solo el campo actual
      .then(() => {
        // setIsButtonDisabled(false); // Habilitar el botón si no hay errores
      })
      .catch(() => {
        // setIsButtonDisabled(true); // Deshabilitar el botón si hay errores
      });
  };

  // UseEffects

  useEffect(() => {
    const errors = formModalPrecioValidation(modalPrecioFormData); // Ejecuta la validación completa

    setIsButtonModalPrecioDisabled(Object.keys(errors).length > 0); // Habilita/deshabilita el botón en base a los errores
    console.log('isButtonRegisterDisabled:', Object.keys(errors).length > 0);
  }, [modalPrecioFormData]);

  // UseEffect para save modal precio

  useEffect(() => {
    if (preciosSaveLoading.state === ResponseState.InProgress) {
      message.loading('Guardando Precio...');
    } else if (preciosSaveLoading.state === ResponseState.Finished) {
      if (preciosSaveLoading.status) {
        message.success('Precio guardado con éxito.');

        if (modalPrecioFormRef.current) {
          modalPrecioFormRef.current.resetFields();
          setModalPrecioFormData({
            id: '',
            productoId: '',
            fechaInicio: '',
            precioVenta: 0,
          });
        }
        navigate(`/listaProductos`);
      } else {
        message.error(
          `Error al guardar el Precio: ${preciosSaveLoading.message}`,
        );
      }
      dispatch(actions.loadSavePrecio(ResponseState.Waiting));
    }
  }, [preciosSaveLoading, dispatch]);

  return (
    <>
      <GeneralContainer>
        <CustomTitleGeneal>
          {id
            ? 'Actualizar producto a la tienda'
            : 'Agregar producto a la tienda'}
        </CustomTitleGeneal>
        <SubGeneralContainer>
          <ContainerImagesGeneral>
            {darkMode ? (
              <img
                style={{ width: '50%' }}
                src={agregarProductoDark}
                alt="Logo Mercado Dos Puentes"
              />
            ) : (
              <img
                style={{ width: '50%' }}
                src={agregarProductoLight}
                alt="Logo Mercado Dos Puentes"
              />
            )}
          </ContainerImagesGeneral>
          <div>
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
              <Spin spinning={loadingSpinProductById}>
                <MainForm
                  id={id}
                  formRef={formRef}
                  saveProduct={saveProduct}
                  onUpdateProduct={onUpdateProduct}
                  handleChange={handleChange}
                  formData={formData}
                  setFormData={setFormData}
                  loadingSpinCategorias={loadingSpinCategorias}
                  categoriaListState={categoriaListState}
                  isButtonDisabled={isButtonDisabled}
                  productByIdListState={productByIdListState}
                  handleSelectChange={handleSelectChange}
                />
              </Spin>
              <Modal
                title="Agrega el precio del producto"
                visible={isModalOpen}
                onCancel={closeModal}
                footer={null}
              >
                <Spin spinning={false}>
                  <ModalFormPrecio
                    id={id}
                    productoIdState={productoIdState}
                    registerModalPrecioForm={registerModalPrecioForm}
                    modalPrecioFormRef={modalPrecioFormRef}
                    handleModalPrecioSubmit={handleModalPrecioSubmit}
                    modalPrecioFormData={modalPrecioFormData}
                    handleChangeModalPrecio={handleChangeModalPrecio}
                    isButtonModalPrecioDisabled={isButtonModalPrecioDisabled}
                    closeModal={closeModal}
                    setModalPrecioFormData={setModalPrecioFormData}
                  />
                </Spin>
              </Modal>
            </ConfigProvider>
          </div>
        </SubGeneralContainer>
      </GeneralContainer>
    </>
  );
}
