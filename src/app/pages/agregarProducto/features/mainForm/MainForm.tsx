/* eslint-disable react/prop-types */
import React from 'react';
import { rulesForm } from '../../utils/rulesForm';
import { Button, Col, Form, Input, Row, Spin } from 'antd';
import CustomSelect from 'app/features/customSelect';
const { Item } = Form;

export default function MainForm({
  formRef,
  saveProduct,
  handleChange,
  formData,
  loadingSpinCategorias,
  categoriaListState,
  setFormData,
  isButtonDisabled,
}) {
  return (
    <Form
      layout="vertical"
      ref={formRef}
      name="Formulario"
      onFinish={saveProduct}
    >
      <Row gutter={[16, 16]}>
        {/* Campo Nombre */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Item label="Nombre" name="nombre" rules={rulesForm.rulesNombre}>
            <Input
              placeholder="Nombre del Producto"
              onChange={handleChange}
              name="nombre"
              value={formData.nombre}
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
  );
}
