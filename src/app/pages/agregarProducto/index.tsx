import { GeneralContainer } from 'app/components/containers';
import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Spin,
  ConfigProvider,
  Radio,
} from 'antd';
import { useForm } from 'react-hook-form';
import { ProductoFormValues } from './utils/types';
import CustomSelect from 'app/features/customSelect';
import { useGeneralContext } from 'app/context/GeneralContext';
import { ProductEntity } from 'app/api/products/types';
import { Entity, ResponseState } from 'app/features/slice/types';
import { useSlice } from 'app/features/slice';
import { useDispatch } from 'react-redux';
import { LOAD_CATEGORIAS_LIST } from 'app/features/slice/sagaActions';
import styles from './styles/AgregarProducto.module.css';
import agregarProducto from '../../../assets/agregarProducto.svg';

export default function AgregarProducto() {
  //Genral flow redux
  const { actions } = useSlice();
  const dispatch = useDispatch();

  //   Context
  const { categorias, loadingCategorias, themeColors } = useGeneralContext();

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProductoFormValues>();

  const onSubmit = (data: ProductoFormValues) => {
    console.log('Producto agregado:', data);
    // Aquí puedes manejar el envío de datos, como una llamada API
  };

  // Manejador para actualizar el valor de la categoría cuando cambie
  const handleSelectCategoriaChange = (value: number) => {
    setValue('categoriaId', value); // Usamos setValue de react-hook-form para actualizar el valor en el estado del formulario
  };

  // Dark Mode

  const [currentTheme, setCurrentTheme] = useState('light');

  const lightTheme = {
    colorPrimary: 'rgb(58,15,18)', //'#B339ED',//green
    colorTextBase: 'rgb(58,15,18)', //green
    colorTextLightSolid: 'white',
  };
  const darkTheme = {
    colorPrimary: '#353434', //black
    colorTextBase: '#353434', //blak
    colorTextLightSolid: 'white',
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
              onFinish={handleSubmit(onSubmit)} // Conecta el submit con react-hook-form
            >
              <Row gutter={[16, 16]}>
                {/* Campo Nombre */}
                <Col xs={24} sm={12} md={12} lg={12}>
                  <Form.Item
                    label="Nombre del Producto"
                    validateStatus={errors.nombre ? 'error' : ''}
                    help={errors.nombre ? 'El nombre es requerido' : ''}
                  >
                    <Input
                      placeholder="Nombre del Producto"
                      {...register('nombre', { required: true })}
                    />
                  </Form.Item>
                </Col>

                {/* Campo Descripción */}
                <Col xs={24} sm={12} md={12} lg={12}>
                  <Form.Item
                    label="Descripción"
                    validateStatus={errors.descripcion ? 'error' : ''}
                    help={
                      errors.descripcion ? 'La descripción es requerida' : ''
                    }
                  >
                    <Input
                      placeholder="Descripción del Producto"
                      {...register('descripcion', { required: true })}
                    />
                  </Form.Item>
                </Col>

                {/* Campo Precio */}
                <Col xs={24} sm={12} md={12} lg={12}>
                  <Form.Item
                    label="Precio"
                    validateStatus={errors.precio ? 'error' : ''}
                    help={errors.precio ? 'El precio es requerido' : ''}
                  >
                    <Input
                      type="number"
                      placeholder="Precio del Producto"
                      {...register('precio', {
                        required: true,
                        valueAsNumber: true, // Convierte el valor a número automáticamente
                      })}
                    />
                  </Form.Item>
                </Col>

                {/* Select Categoría */}
                <Col xs={24} sm={12} md={12} lg={12}>
                  <Form.Item
                    label="Categoría"
                    validateStatus={errors.categoriaId ? 'error' : ''}
                    help={errors.categoriaId ? 'Selecciona una categoría' : ''}
                  >
                    <Spin spinning={loadingSpinCategorias}>
                      <CustomSelect
                        list={categoriaListState}
                        onChange={handleSelectCategoriaChange}
                        label="Categoría"
                      />
                    </Spin>
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col xs={24}>
                  <Button type="primary" htmlType="submit" block>
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
