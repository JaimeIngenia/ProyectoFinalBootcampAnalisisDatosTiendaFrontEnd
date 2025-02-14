/* eslint-disable react/prop-types */
import { Col, Form, Input, Row, Spin } from 'antd';
import { CustomButtonn } from 'app/components/containers';
import { useGeneralContext } from 'app/context/GeneralContext';
import CustomSelect from 'app/features/customSelect';
import React from 'react';
import { rulesForm } from '../../utils/rulesForm';
const { Item } = Form;

export default function MainForm({
  id,
  formRef,
  saveProduct,
  onUpdateProduct,
  handleChange,
  formData,
  loadingSpinCategorias,
  categoriaListState,
  setFormData,
  isButtonDisabled,
  productByIdListState,
  handleSelectChange,
}) {
  const [form] = Form.useForm();
  const { darkMode, themeColors, isMenuCollapsed } = useGeneralContext();

  return (
    <Form
      form={form}
      layout="vertical"
      ref={formRef}
      name="Formulario"
      onFinish={id ? onUpdateProduct : saveProduct}
      initialValues={id ? formData : undefined}
      style={{
        maxHeight: '60vh', // Limitar altura al viewport
        overflowY: isMenuCollapsed ? 'auto' : 'unset', // Habilitar scroll cuando isMenuCollapsed es true
        padding: isMenuCollapsed ? '1rem' : '0', // Opcional, ajustar padding si hay menos espacio
      }}
    >
      <Row gutter={[16, 16]}>
        {/* Campo Nombre */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Item
            required
            label="Nombre"
            name="nombre"
            rules={rulesForm.rulesNombre}
            validateTrigger="onBlur"
          >
            <Input
              placeholder="Nombre del Producto"
              onChange={handleChange}
              name="nombre"
              style={
                darkMode
                  ? { border: `2px solid ${themeColors.colorBorderCustom}` }
                  : { border: `1px solid ${themeColors.colorBorderCustom}` }
              }
            />
          </Item>
        </Col>

        {/* Campo Descripción */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item
            required
            label="Descripción"
            name="descripcion"
            rules={rulesForm.rulesDescripcion}
            validateTrigger="onBlur"
          >
            <Input
              placeholder="Descripción del Producto"
              onChange={handleChange}
              name="descripcion"
              // style={{ border: `2px solid ${themeColors.colorBorderCustom}` }}
              style={
                darkMode
                  ? { border: `2px solid ${themeColors.colorBorderCustom}` }
                  : { border: `1px solid ${themeColors.colorBorderCustom}` }
              }
            />
          </Form.Item>
        </Col>

        {/* Select Categoría */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Item
            required
            label="Categoría"
            name="categoriaId"
            rules={rulesForm.rulesCategoriaId}
            validateTrigger="onBlur"
          >
            <Spin spinning={loadingSpinCategorias}>
              {/* <Select
                placeholder="Selecciona una categoría"
                onChange={handleSelectChange}
                value={formData.categoriaId}
              >
                {categoriaListState.map(categoria => (
                  <Select.Option key={categoria.id} name="categoriaId">
                    {categoria.nombre}
                  </Select.Option>
                ))}
              </Select> */}
              <CustomSelect
                list={categoriaListState}
                onChange={handleSelectChange}
                label="una categoría"
                value={formData.categoriaId}
              />
            </Spin>
          </Item>
        </Col>
        {/* Campo StockActual  */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item
            label="Stock Actual"
            name="stockActual"
            rules={rulesForm.rulesStockActual}
            validateTrigger="onBlur"
          >
            <Input
              type="number"
              placeholder="Stock Actual del Producto"
              onChange={handleChange}
              name="stockActual"
              style={
                darkMode
                  ? { border: `2px solid ${themeColors.colorBorderCustom}` }
                  : { border: `1px solid ${themeColors.colorBorderCustom}` }
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        {/* Campo Imagen */}
        <Col xs={24}>
          <Form.Item
            label="Imagen"
            name="imagen"
            rules={rulesForm.rulesImagenAgregarProducto}
            validateTrigger="onBlur"
          >
            <Input
              placeholder="Imagen del Producto"
              onChange={handleChange}
              name="imagen"
              // style={{ border: `2px solid ${themeColors.colorBorderCustom}` }}
              style={
                darkMode
                  ? { border: `2px solid ${themeColors.colorBorderCustom}` }
                  : { border: `1px solid ${themeColors.colorBorderCustom}` }
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col xs={24}>
          <CustomButtonn
            type="primary"
            htmlType="submit"
            disabled={isButtonDisabled}
            block
          >
            {/* Agregar Producto */}
            {id ? 'Actualizar Producto' : 'Agregar Producto'}
          </CustomButtonn>
        </Col>
      </Row>
    </Form>
  );
}
