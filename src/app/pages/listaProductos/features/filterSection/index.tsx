/* eslint-disable react/prop-types */
import { Button, Col, Input, Row, Select } from 'antd';
import React, { useState } from 'react';

export default function FilterSection({ onFilterChange, categoriaListState }) {
  const [filters, setFilters] = useState({
    nombre: '',
    categoriaId: null,
    minPrecio: '',
    maxPrecio: '',
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    onFilterChange({ ...filters, [name]: value });
  };

  const handleSelectChange = value => {
    setFilters(prev => ({ ...prev, categoriaId: value }));
    onFilterChange({ ...filters, categoriaId: value });
  };
  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
        {/* Filtro por nombre */}
        <Col xs={24} sm={12} md={6}>
          <Input
            placeholder="Buscar por nombre"
            name="nombre"
            value={filters.nombre}
            onChange={handleInputChange}
          />
        </Col>

        {/* Filtro por categoría */}
        <Col xs={24} sm={12} md={6}>
          <Select
            placeholder="Filtrar por categoría"
            onChange={handleSelectChange}
            value={filters.categoriaId}
            style={{ width: '100%' }}
          >
            <Select.Option value={null}>Todas</Select.Option>
            {categoriaListState.map(categoria => (
              <Select.Option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </Select.Option>
            ))}
          </Select>
        </Col>

        {/* Filtro por precio mínimo */}
        <Col xs={12} sm={12} md={6}>
          <Input
            placeholder="Precio mínimo"
            name="minPrecio"
            value={filters.minPrecio}
            onChange={handleInputChange}
            type="number"
          />
        </Col>

        {/* Filtro por precio máximo */}
        <Col xs={12} sm={12} md={6}>
          <Input
            placeholder="Precio máximo"
            name="maxPrecio"
            value={filters.maxPrecio}
            onChange={handleInputChange}
            type="number"
          />
        </Col>
      </Row>
      <Row>
        <Button
          onClick={() => {
            setFilters({
              nombre: '',
              categoriaId: null,
              minPrecio: '',
              maxPrecio: '',
            });
            onFilterChange({
              nombre: '',
              categoriaId: null,
              minPrecio: '',
              maxPrecio: '',
            });
          }}
        >
          Limpiar filtros
        </Button>
      </Row>
    </>
  );
}
