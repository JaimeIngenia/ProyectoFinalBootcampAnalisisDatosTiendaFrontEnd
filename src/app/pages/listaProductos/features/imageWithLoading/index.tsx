/* eslint-disable react/prop-types */
import React from 'react';
import { Spin } from 'antd';
import { useState } from 'react';

export default function ImageWithLoading({
  src,
  alt,
  width = 100,
  height = 'auto',
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  return (
    <div
      style={{
        width,
        height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {loading && <Spin />} {/* Spinner mientras se carga */}
      {!loading && error && <span>Error al cargar imagen</span>}{' '}
      {/* Mostrar mensaje de error si falla */}
      <img
        src={src}
        alt={alt}
        style={{ display: loading || error ? 'none' : 'block', width, height }}
        onLoad={() => setLoading(false)} // Imagen cargada
        onError={() => {
          setLoading(false);
          setError(true); // Si falla la carga
        }}
      />
    </div>
  );
}
