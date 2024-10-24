/* eslint-disable react/prop-types */
import { Button, Col, Form, Input, Row, Select, Spin } from 'antd';
import React from 'react';
import { rulesForm } from '../../utils/rulesForm';
import CustomSelect from 'app/features/customSelect';
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
  return (
    <Form
      form={form}
      layout="vertical"
      ref={formRef}
      name="Formulario"
      onFinish={id ? onUpdateProduct : saveProduct}
      initialValues={id ? formData : undefined}
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
            validateTrigger="onBlur"
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
      </Row>

      <Row>
        <Col xs={24}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={isButtonDisabled}
            block
          >
            {/* Agregar Producto */}
            {id ? 'Actualizar Producto' : 'Agregar Producto'}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
