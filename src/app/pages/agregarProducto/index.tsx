import {
  Button,
  Col,
  ConfigProvider,
  Form,
  FormInstance,
  Input,
  Row,
  Spin,
} from 'antd';
import { GeneralContainer } from 'app/components/containers';
import { useGeneralContext } from 'app/context/GeneralContext';
import CustomSelect from 'app/features/customSelect';
import { useSlice } from 'app/features/slice';
import { LOAD_CATEGORIAS_LIST } from 'app/features/slice/sagaActions';
import { Entity, ResponseState } from 'app/features/slice/types';
import React, { createRef, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import agregarProducto from '../../../assets/agregarProducto.svg';
import styles from './styles/AgregarProducto.module.css';
import { ProductoFormValues } from './utils/types';
import { message } from 'antd';

export default function AgregarProducto() {
  // Form
  // const formRef = createRef();
  const formRef = useRef<FormInstance>(null);
  //Genral flow redux
  const { actions } = useSlice();
  const dispatch = useDispatch();

  //   Context
  const { categorias, loadingCategorias, themeColors } = useGeneralContext();

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
  //Formulario

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   setValue,
  // } = useForm<ProductoFormValues>();

  // const onSubmit = (data: ProductoFormValues) => {
  //   console.log('Producto agregado:', data);
  //   // Aquí puedes manejar el envío de datos, como una llamada API
  // };

  // // Manejador para actualizar el valor de la categoría cuando cambie
  // const handleSelectCategoriaChange = (value: number) => {
  //   setValue('categoriaId', value); // Usamos setValue de react-hook-form para actualizar el valor en el estado del formulario
  // };

  const [form, setForm] = useState({
    id: '',
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '', // Corregí el nombre del campo aquí
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    console.log(form);
  };

  // Función para guardar el producto
  const saveProduct = () => {
    // Valida si todos los campos requeridos están completos
    if (!form.nombre || !form.descripcion || !form.precio || !form.categoria) {
      message.error('Por favor, completa todos los campos.');
      return;
    }

    // Si todos los campos están completos, muestra un mensaje de éxito o guarda el producto
    console.log('Producto guardado:', form);

    // Aquí puedes realizar una llamada API para enviar el producto al backend:
    // fetch('/api/saveProduct', {
    //   method: 'POST',
    //   body: JSON.stringify(form),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    // .then(response => response.json())
    // .then(data => {
    //   message.success('Producto guardado con éxito.');
    // })
    // .catch(error => {
    //   message.error('Error al guardar el producto.');
    // });

    message.success('Producto guardado con éxito.');
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
            // border: 'solid blue 3px',
            marginBottom: '50px',
          }}
        >
          <img style={{ width: '50%' }} src={agregarProducto} alt="" />
        </div>
        <div className={styles.sub_container}>
          <ConfigProvider
            theme={{
              // token: currentTheme === 'light' ? lightTheme : darkTheme,
              // token: darkMode ? lightTheme : darkTheme,
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
              initialValues={{
                recordar: true,
              }}
            >
              <Row gutter={[16, 16]}>
                {/* Campo Nombre */}
                <Col xs={24} sm={12} md={12} lg={12}>
                  <Form.Item
                    label="Nombre"
                    rules={[
                      {
                        required: true,
                        message: 'Por favor Ingresa tu Nombre',
                      },
                    ]}
                  >
                    <Input
                      placeholder="Nombre del Producto"
                      // {...register('nombre', { required: true })}
                      onChange={handleChange}
                      name="nombre"
                    />
                  </Form.Item>
                </Col>

                {/* Campo Descripción */}
                <Col xs={24} sm={12} md={12} lg={12}>
                  <Form.Item
                    label="Descripción"
                    rules={[
                      {
                        required: true,
                        message: 'Por favor Ingresa tu Descripción',
                      },
                    ]}
                  >
                    <Input
                      placeholder="Descripción del Producto"
                      onChange={handleChange}
                      name="descripcion"
                    />
                  </Form.Item>
                </Col>

                {/* Campo Precio */}
                <Col xs={24} sm={12} md={12} lg={12}>
                  <Form.Item
                    label="Precio"
                    rules={[
                      {
                        required: true,
                        message: 'Por favor Ingresa tu Precio',
                      },
                    ]}
                  >
                    <Input
                      type="number"
                      placeholder="Precio del Producto"
                      onChange={handleChange}
                      name="precio"
                    />
                  </Form.Item>
                </Col>

                {/* Select Categoría */}
                <Col xs={24} sm={12} md={12} lg={12}>
                  <Form.Item
                    label="Categoría"
                    rules={[
                      {
                        required: true,
                        message: 'Por favor Ingresa tu Categoría',
                      },
                    ]}
                  >
                    <Spin spinning={loadingSpinCategorias}>
                      <CustomSelect
                        list={categoriaListState}
                        onChange={handleChange}
                        label="Categoría"
                        name="categoria"
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
                    onClick={() => saveProduct()}
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
