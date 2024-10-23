/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
// import { rulesForm } from '../../utils/rulesForm';
import { Button, Col, Form, Input, Row, Select, Spin } from 'antd';
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
  rulesForm,
}) {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      layout="vertical"
      ref={formRef}
      name="Formulario"
      onFinish={id ? onUpdateProduct : saveProduct}
      validateTrigger={['onBlur', 'onChange']}
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
          >
            <Input
              placeholder="Nombre del Producto"
              onChange={handleChange}
              name="nombre"
              // value={formData.nombre || ''}
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
          >
            <Input
              placeholder="Descripción del Producto"
              onChange={handleChange}
              name="descripcion"
              // value={formData.descripcion || ''}
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
              // value={formData.precio || ''}
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
          >
            <Spin spinning={loadingSpinCategorias}>
              <Select
                placeholder="Selecciona una categoría"
                onChange={handleSelectChange}
                value={formData.categoriaId}
              >
                {categoriaListState.map(categoria => (
                  <Select.Option key={categoria.id} name="categoriaId">
                    {categoria.nombre}
                  </Select.Option>
                ))}
              </Select>
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
