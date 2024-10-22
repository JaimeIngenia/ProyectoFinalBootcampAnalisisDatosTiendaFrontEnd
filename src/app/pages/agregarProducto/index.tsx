import { ConfigProvider, FormInstance, message, Spin } from 'antd';
import { ProductEntityGetById } from 'app/api/products/types';
import { GeneralContainer } from 'app/components/containers';
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
import agregarProducto from '../../../assets/agregarProducto.svg';
import MainForm from './features/mainForm/MainForm';
import styles from './styles/AgregarProducto.module.css';
import { formValidation } from './utils/formValidation';

export default function AgregarProducto() {
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
  } = useGeneralContext();

  const [firstCharge, setFirstCharge] = useState<boolean>(true);
  const [firstChargeProductById, setFirstChargeProductById] =
    useState<boolean>(true);

  // Manejo estados de carga

  const [loadingSpinCategorias, setLoadingSpinCategorias] =
    useState<boolean>(false);

  const [loadingSpinProductById, setLoadingSpinProductById] =
    useState<boolean>(false);

  // Estados de lista para los selectors

  const [categoriaListState, setCategoriaListState] = useState<Entity[]>([]);

  const [productByIdListState, setProductByIdListState] =
    useState<ProductEntityGetById>(productoById_Empty);

  //Form

  const formRef = useRef<FormInstance>(null);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [reset, setReset] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: 0,
    categoriaId: '',
  });

  const saveProduct = () => {
    if (!formRef.current) {
      return;
    }
    // const formValues = formRef.current.getFieldsValue();
    // const productData = {
    //   ...formValues,
    // };
    const productData = {
      ...formData,
    };

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

  //Useeffect para categorias

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
        nombre: '',
        descripcion: '',
        precio: 0,
        categoriaId: '',
      });
    }
  }, [productoGetById, loadingProductoGetById, id, dispatch]);

  useEffect(() => {
    if (id && productByIdListState !== productoById_Empty) {
      const categoriaEncontrada = categoriaListState.find(
        categoria => categoria.id === productoGetById.categoria.id,
      );
      const productoConCategoriaId = {
        nombre: productoGetById.nombre,
        descripcion: productoGetById.descripcion,
        precio: productoGetById.precio,
        categoriaId: categoriaEncontrada ? categoriaEncontrada.id : '',
      };

      setFormData(productoConCategoriaId);
      debugger;
    }
  }, [id, productByIdListState]);

  useEffect(() => {
    const validationErrors = formValidation(formData);
    setErrors(validationErrors);
    setIsButtonDisabled(Object.keys(validationErrors).length > 0);
  }, [formData]);

  // UseEffect para save products
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
            categoriaId: '',
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

  //Función update products
  const onUpdateProduct = () => {
    if (!formRef.current) {
      return;
    }
    // Obtenemos los valores del formulario
    const formValues = formRef.current.getFieldsValue();

    // Preparamos los datos a enviar
    const productDataUpdated = {
      ...formData,
    };
    // const productDataUpdated = {
    //   ...formValues,
    // };
    dispatch(actions.loadUpdateProducts(ResponseState.InProgress));
    dispatch({
      type: UPDATE_PRODUCT,
      payload: {
        id: id,
        productData: productDataUpdated,
      },
    });
    navigate(`/listaProductos`);
  };

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
                />
              </Spin>
            </ConfigProvider>
          </div>
        </div>
      </GeneralContainer>
    </>
  );
}
