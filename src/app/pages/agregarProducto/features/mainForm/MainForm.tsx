/* eslint-disable react/prop-types */
import React from 'react';
import { rulesForm } from '../../utils/rulesForm';
import { Button, Col, Form, Input, Row, Spin } from 'antd';
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
}) {
  return (
    <Form
      layout="vertical"
      ref={formRef}
      name="Formulario"
      // onFinish={saveProduct}
      onFinish={formData.id ? onUpdateProduct : saveProduct}
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
                // onChange={value => {
                //   debugger;
                //   console.log('Categoría seleccionada:', value); // Ver qué ID se selecciona
                //   setFormData({ ...formData, categoriaId: value });
                //   if (formRef.current) {
                //     formRef.current.setFieldsValue({
                //       categoriaId: value,
                //     });
                //   }
                // }}
                onChange={value => {
                  console.log('Valor de cambio:', value); // Verifica el valor recibido
                  console.log('formData antes:', formData); // Verifica el estado antes del cambio

                  if (formData.id) {
                    // Verifica si el ID está presente
                    debugger; // Este debe ser alcanzado si el ID está presente
                    setFormData(prev => ({ ...prev, categoriaId: value }));

                    if (formRef.current) {
                      formRef.current.setFieldsValue({
                        categoriaId: value,
                      });
                    }
                  } else {
                    debugger; // Este se activará si no hay un ID
                    setFormData(prev => ({ ...prev, categoriaId: value }));
                    if (formRef.current) {
                      formRef.current.setFieldsValue({
                        categoriaId: value,
                      });
                    }
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
            {/* Agregar Producto */}
            {formData.id ? 'Actualizar Producto' : 'Agregar Producto'}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
