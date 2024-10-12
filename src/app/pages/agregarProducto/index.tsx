import {
  Button,
  Col,
  ConfigProvider,
  Form,
  FormInstance,
  Input,
  message,
  Row,
  Spin,
} from 'antd';
import { GeneralContainer } from 'app/components/containers';
import { useGeneralContext } from 'app/context/GeneralContext';
import CustomSelect from 'app/features/customSelect';
import { useSlice } from 'app/features/slice';
import { LOAD_CATEGORIAS_LIST } from 'app/features/slice/sagaActions';
import { Entity, ResponseState } from 'app/features/slice/types';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import agregarProducto from '../../../assets/agregarProducto.svg';
import styles from './styles/AgregarProducto.module.css';
import { formValidation } from './utils/formValidation';
import { rulesForm } from './utils/rulesForm';

const { Item } = Form;

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

  // const saveProduct = async () => {
  //   // Verifica si formRef.current no es null antes de acceder a sus métodos
  //   if (!formRef.current) {
  //     return;
  //   }

  //   // Obtenemos los valores del formulario
  //   const formValues = formRef.current.getFieldsValue();

  //   // Validar el formulario antes de hacer la solicitud
  //   const validationErrors = formValidation(formValues);
  //   setErrors(validationErrors);

  //   // Si hay errores, muestra el mensaje de error y no continua
  //   if (Object.keys(validationErrors).length > 0) {
  //     message.error('Por favor, completa todos los campos correctamente.');
  //     return;
  //   }

  //   // Preparamos los datos a enviar
  //   const productData = {
  //     ...formValues,
  //     precio: Number(formValues.precio), // Aseguramos que el precio sea un número
  //     categoriaId: Number(formValues.categoriaId), // Convertimos categoriaId a número
  //   };
  //   debugger;
  //   const a = productData;

  //   try {
  //     const response = await fetch(
  //       'https://localhost:7029/api/Producto/SaveProducto',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(productData),
  //       },
  //     );

  //     if (!response.ok) {
  //       throw new Error('Error en la solicitud');
  //     }

  //     const result = await response.json();
  //     console.log('Producto guardado:', result);

  //     // Si el producto se guarda con éxito
  //     message.success('Producto guardado con éxito.');

  //     // Resetear el formulario después de un guardado exitoso
  //     formRef.current.resetFields();
  //     setFormData({
  //       nombre: '',
  //       descripcion: '',
  //       precio: 0,
  //       categoriaId: 0,
  //     });
  //   } catch (error) {
  //     // Manejar errores en la solicitud
  //     console.error('Error al guardar el producto:', error);
  //     message.error('Error al guardar el producto.');
  //   }
  // };

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
      categoriaId: Number(formValues.categoriaId), // Convertimos categoriaId a número
    };

    // Dispatch de Redux para iniciar el guardado
    dispatch(actions.loadSaveProducts(ResponseState.InProgress)); // Cambiamos el estado a Started
    dispatch({
      type: 'SAVE_PRODUCTOS',
      payload: productData,
    });
  };

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

  const formRef = useRef<FormInstance>(null);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // const [errors, setErrors] = useState<ValidationErrors>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [reset, setReset] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: 0,
    categoriaId: 0,
  });

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

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // console.log(formData);
  };

  return (
    <>
      <GeneralContainer>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '50%',
            marginBottom: '50px',
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
            <Form
              layout="vertical"
              ref={formRef}
              name="Formulario"
              onFinish={saveProduct}
            >
              <Row gutter={[16, 16]}>
                {/* Campo Nombre */}
                <Col xs={24} sm={12} md={12} lg={12}>
                  <Item
                    label="Nombre"
                    name="nombre"
                    rules={rulesForm.rulesNombre}
                  >
                    <Input
                      placeholder="Nombre del Producto"
                      onChange={handleChange}
                      name="nombre"
                      // status={errors.nombre ? 'error' : ''}
                      value={formData.nombre}
                      // onClick={handleOnClick}
                    />
                  </Item>
                </Col>

                {/* Campo Descripción */}
                <Col xs={24} sm={12} md={12} lg={12}>
                  <Form.Item
                    label="Descripción"
                    name="descripcion"
                    rules={rulesForm.rulesDescripcion}
                  >
                    <Input
                      placeholder="Descripción del Producto"
                      onChange={handleChange}
                      name="descripcion"
                      value={formData.descripcion}
                      // status={errors.descripcion ? 'error' : ''}
                    />
                  </Form.Item>
                </Col>

                {/* Campo Precio */}
                <Col xs={24} sm={12} md={12} lg={12}>
                  <Form.Item
                    required
                    label="Precio"
                    name="precio"
                    rules={rulesForm.rulesPrecio}
                  >
                    <Input
                      type="number"
                      placeholder="Precio del Producto"
                      onChange={handleChange}
                      name="precio"
                      value={formData.precio}
                      // status={errors.precio ? 'error' : ''}
                    />
                  </Form.Item>
                </Col>

                {/* Select Categoría */}
                <Col xs={24} sm={12} md={12} lg={12}>
                  <Form.Item
                    label="Categoría"
                    name="categoriaId"
                    rules={[
                      {
                        required: true,
                        message: 'Por favor selecciona una categoría',
                      },
                    ]}
                  >
                    <Spin spinning={loadingSpinCategorias}>
                      <CustomSelect
                        list={categoriaListState}
                        // onChange={handleChange}
                        // onChange={value =>
                        //   setFormData({ ...formData, categoriaId: value })
                        // }
                        onChange={value => {
                          // Actualizar el estado local
                          setFormData({ ...formData, categoriaId: value });

                          // Solo intentar actualizar el valor del formulario si formRef.current no es null
                          if (formRef.current) {
                            formRef.current.setFieldsValue({
                              categoriaId: value,
                            });
                          }
                        }}
                        label="Categoría"
                        name="categoriaId"
                        value={formData.categoriaId}
                      />
                    </Spin>
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col xs={24}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={isButtonDisabled}
                    block
                  >
                    Agregar Producto
                  </Button>
                </Col>
              </Row>
            </Form>
          </ConfigProvider>
        </div>
      </GeneralContainer>
    </>
  );
}
