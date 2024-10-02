export function agregarPuntoAlFinal(data) {
  if (!Array.isArray(data)) {
    console.error('El dato proporcionado no es un array de objetos.');
    return null;
  }

  const nuevoArray = data.map(item => {
    return {
      ...item,
      nombre: item.nombre.endsWith('.') ? item.nombre : item.nombre + '.', // Modificamos solo "nombre"
    };
  });

  return nuevoArray;
}

const jsonData = [
  { id: 1, nombre: 'Administrador' },
  { id: 2, nombre: 'Vigilante' },
  { id: 3, nombre: 'Cajero' },
];

console.log(agregarPuntoAlFinal(jsonData));
