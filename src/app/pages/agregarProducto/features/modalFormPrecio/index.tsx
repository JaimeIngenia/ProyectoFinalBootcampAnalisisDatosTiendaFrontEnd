/* eslint-disable react/prop-types */

import { Form, Input, notification, Spin } from 'antd';
import { CustomButtonn, CustomSelect } from 'app/components/containers';
import { useGeneralContext } from 'app/context/GeneralContext';
import React, { useEffect, useState } from 'react';
import { rulesForm } from '../../utils/rulesForm';
import { useSlice } from 'app/features/slice';
import { useDispatch } from 'react-redux';
import { PrecioEntityUpdate } from 'app/api/precio/types';
import { preciosUpdate_Empty } from 'app/api/precio/emptyTypes';
import { ResponseState } from 'app/features/slice/types';
import {
  GET_PRECIO_BY_PRODUCT_ID,
  LOAD_PRODUCTOS_LIST,
  UPDATE_PRECIO,
} from 'app/features/slice/sagaActions';
import { useNavigate } from 'react-router-dom';

export default function ModalFormPrecio({
  id,
  productoIdState,
  registerModalPrecioForm,
  modalPrecioFormRef,
  handleModalPrecioSubmit,
  modalPrecioFormData,
  handleChangeModalPrecio,
  isButtonModalPrecioDisabled,
  closeModal,
  setModalPrecioFormData,
}) {
  // Context
  const {
    darkMode,
    themeColors,
    isMenuCollapsed,
    loadingUpdatePrecio,
    precioGetByProductId,
    loadingPreciooGetByProductId,
    loadingUpdateProduct,
  } = useGeneralContext();
  //Genral flow redux
  const { actions } = useSlice();
  const dispatch = useDispatch();
  // Hook para navegar entre rutas
  const navigate = useNavigate();

  // Utils
  const [firstChargePrecioByProductId, setFirstChargePrecioByProductId] =
    useState<boolean>(true);
  const [loadingSpinPrecioByProductId, setLoadingSpinPrecioByProductId] =
    useState<boolean>(false);
  const [precioByProductIdListState, setPrecioByProductIdListState] =
    useState<PrecioEntityUpdate>(preciosUpdate_Empty);

  // Manejo estados de carga
  const [a, setA] = useState<boolean>(false);

  // Funciones
  const onUpdateProduct = () => {
    if (!modalPrecioFormRef.current) {
      return;
    }
    // Obtenemos los valores del formulario
    const formValues = modalPrecioFormRef.current.getFieldsValue();

    const precioDataUpdated = {
      ...formValues,
    };
    const y = productoIdState;
    const yw = precioGetByProductId.id;
    debugger;
    dispatch(actions.loadUpdatePrecio(ResponseState.InProgress));
    dispatch({
      type: UPDATE_PRECIO,
      payload: {
        id: precioGetByProductId.id,
        precioData: precioDataUpdated,
      },
    });
    closeModal();
    navigate(`/listaProductos`);
  };
  // -----------------
  // animaciones update producto
  // -----------------
  const [loadingSpinUpdateProductos, setLoadingSpinUpdateProductos] =
    useState<boolean>(false);

  //UseEffects
  useEffect(() => {
    if (id) {
      if (firstChargePrecioByProductId) {
        if (loadingPreciooGetByProductId?.state === ResponseState.Waiting) {
          dispatch(actions.loadGetPrecioByProductId(ResponseState.Started));
        } else if (
          loadingPreciooGetByProductId?.state === ResponseState.Started
        ) {
          setFirstChargePrecioByProductId(false);
          dispatch(actions.loadGetPrecioByProductId(ResponseState.InProgress));
          dispatch({
            type: GET_PRECIO_BY_PRODUCT_ID,
            payload: id, // nota revisar si es id o productoId
          });
        }
      }
      if (loadingPreciooGetByProductId?.state === ResponseState.InProgress) {
        setLoadingSpinPrecioByProductId(true);
      } else if (
        loadingPreciooGetByProductId?.state === ResponseState.Finished
      ) {
        if (loadingPreciooGetByProductId?.status) {
          if (precioGetByProductId && modalPrecioFormRef.current) {
            setPrecioByProductIdListState(precioGetByProductId);
            if (loadingSpinPrecioByProductId)
              setLoadingSpinPrecioByProductId(false);
          }
        } else {
          alert(loadingPreciooGetByProductId?.message);
        }
        dispatch(actions.loadGetPrecioByProductId(ResponseState.Waiting));
      }
    } else {
      setModalPrecioFormData({
        precioVenta: 0,
      });
    }
  }, [precioGetByProductId, loadingPreciooGetByProductId, id, dispatch]);

  useEffect(() => {
    debugger;
    if (id && precioByProductIdListState !== preciosUpdate_Empty) {
      const a = precioGetByProductId.id;
      debugger;
      const precioRellenado = {
        id: precioGetByProductId.id,
        precioVenta: precioGetByProductId.precioVenta,
      };

      modalPrecioFormRef.current?.setFieldsValue(precioRellenado);

      debugger;

      setModalPrecioFormData(precioRellenado);
    } else {
      // Resetear todos los campos
      modalPrecioFormRef.current?.resetFields();
    }
  }, [id, precioByProductIdListState, a]);

  //UseEffect de update products

  useEffect(() => {
    if (loadingUpdateProduct?.state === ResponseState.InProgress) {
      setLoadingSpinUpdateProductos(true);
    } else if (loadingUpdateProduct?.state === ResponseState.Finished) {
      setLoadingSpinUpdateProductos(false);
      if (loadingUpdateProduct) setLoadingSpinUpdateProductos(false);
      if (loadingUpdateProduct?.status) {
        // Jaime esto está raro
        // dispatch(actions.loadProducts(ResponseState.InProgress));
        // dispatch({
        //   type: LOAD_PRODUCTOS_LIST,
        // });
        notification.success({
          message: 'Éxito',
          description: 'Actualización completada correctamente.',
          placement: 'bottomRight', // Puedes cambiar la posición si deseas
        });
      } else {
        notification.error({
          message: 'Error',
          description:
            loadingUpdateProduct?.message || 'Error en la Actualización.',
          placement: 'bottomRight',
        });
      }

      dispatch(actions.loadUpdateProducts(ResponseState.Waiting));
    }
  }, [loadingUpdateProduct, dispatch]);

  return (
    <Form
      form={registerModalPrecioForm}
      layout="vertical"
      ref={modalPrecioFormRef}
      name="ModalPrecioFormRef"
      onFinish={id ? onUpdateProduct : handleModalPrecioSubmit}
      initialValues={id ? modalPrecioFormData : undefined}
      // initialValues={modalPrecioFormData}
    >
      <Form.Item
        required
        label="Precio Venta"
        name="precioVenta"
        rules={rulesForm.rulesPrecio}
        validateTrigger="onBlur"
      >
        <Input
          type="number"
          placeholder="Precio de venta del Producto"
          onChange={handleChangeModalPrecio}
          name="precio" // style={{ border: `2px solid ${themeColors.colorBorderCustom}` }}
          style={
            darkMode
              ? { border: `2px solid ${themeColors.colorBorderCustom}` }
              : { border: `1px solid ${themeColors.colorBorderCustom}` }
          }
        />
      </Form.Item>

      <CustomButtonn
        type="primary"
        htmlType="submit"
        disabled={isButtonModalPrecioDisabled}
        block
      >
        {id ? 'Actualizar Precio' : 'Agregar Precio'}
      </CustomButtonn>
    </Form>
  );
}
