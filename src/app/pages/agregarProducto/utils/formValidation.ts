import { SaveUsuarioRequest } from 'app/api/usuarios/types';
import {
  containsAllowedSymbolsForSkills,
  containsOnlyNumbers,
  createMaxLengthNoNumbersRegex,
  createMaxLengthRegex,
  emailRegex,
  minLengthRegexCantidad,
  minLengthRegexSkills,
} from './regex';
import { ProductoFormValues } from './types'; // Asegúrate de importar el tipo correctamente
import { ClienteEntitySave, ClienteSelect } from 'app/api/clientes/types';
import { DetalleVentaForm } from 'app/api/detalleVenta/types';
import { PrecioFormValues } from 'app/api/precio/types';

export function formValidation(values: ProductoFormValues) {
  const _errors: { [key: string]: string } = {}; // Objeto para almacenar los errores

  const maxLength = 150; // Asigna la longitud máxima para los campos
  const minLength = 1; // Longitud mínima para nombre y descripción

  // Validación de "nombre"
  if (!values.nombre || values.nombre.trim().length === 0) {
    _errors['nombre'] = 'El nombre es obligatorio';
  } else if (values.nombre.trim().length < minLength) {
    _errors['nombre'] = `El nombre debe tener al menos ${minLength} caracteres`;
  } else if (!createMaxLengthRegex(maxLength).test(values.nombre)) {
    _errors['nombre'] = `El nombre debe tener máximo ${maxLength} caracteres`;
  } else if (
    containsOnlyNumbers(values.nombre) ||
    containsAllowedSymbolsForSkills(values.nombre)
  ) {
    _errors['nombre'] = 'El nombre no puede contener solo números o símbolos';
  }

  // Validación de "descripcion"
  if (!values.descripcion || values.descripcion.trim().length === 0) {
    _errors['descripcion'] = 'La descripción es obligatoria';
  } else if (values.descripcion.trim().length < minLength) {
    _errors['descripcion'] =
      `La descripción debe tener al menos ${minLength} caracteres`;
  } else if (!createMaxLengthRegex(maxLength).test(values.descripcion)) {
    _errors['descripcion'] =
      `La descripción debe tener máximo ${maxLength} caracteres`;
  } else if (
    containsOnlyNumbers(values.descripcion) ||
    containsAllowedSymbolsForSkills(values.descripcion)
  ) {
    _errors['descripcion'] =
      'La descripción no puede contener solo números o símbolos';
  }

  // Validación de "precio"
  // if (values.precio <= 0) {
  //   _errors['precio'] = 'El precio debe ser mayor que 0';
  // }

  // // Validación de "categoriaId"
  if (!values.categoriaId || values.categoriaId.length <= 0) {
    _errors['categoriaId'] = 'Debes seleccionar una categoría válida';
  }

  return _errors;
}

export function formModalPrecioValidation(values: PrecioFormValues) {
  const _errors: { [key: string]: string } = {}; // Objeto para almacenar los errores

  const maxLength = 150; // Asigna la longitud máxima para los campos
  const minLength = 1; // Longitud mínima para nombre y descripción

  // Validación de "precio"
  // if ((values.precioVenta ?? 0) <= 0) {
  //   _errors['precioVenta'] = 'El precio debe ser mayor que 0';
  // }

  return _errors;
}

export function formRegisterValidation(values: SaveUsuarioRequest) {
  const _errors: { [key: string]: string } = {}; // Objeto para almacenar los errores

  const maxLength = 50; // Asigna la longitud máxima para algunos campos
  const minLength = 2; // Longitud mínima para "nombre"
  const passwordMinLength = 8; // Longitud mínima para "contrasena"

  // Validación de "nombre"
  if (!values.nombre || values.nombre.trim().length === 0) {
    _errors['nombre'] = 'El nombre es obligatorio';
  } else if (values.nombre.trim().length < minLength) {
    _errors['nombre'] = `El nombre debe tener al menos ${minLength} caracteres`;
  } else if (!createMaxLengthRegex(maxLength).test(values.nombre)) {
    _errors['nombre'] = `El nombre debe tener máximo ${maxLength} caracteres`;
  } else if (
    containsOnlyNumbers(values.nombre) ||
    containsAllowedSymbolsForSkills(values.nombre)
  ) {
    _errors['nombre'] = 'El nombre no puede contener solo números o símbolos';
  }

  // Validación de "correo"
  if (!values.correo || values.correo.trim().length === 0) {
    _errors['correo'] = 'El correo es obligatorio';
  } else if (!emailRegex.test(values.correo)) {
    _errors['correo'] = 'Por favor, ingrese un correo electrónico válido';
  }

  // Validación de "contrasena"
  if (!values.contrasena || values.contrasena.trim().length === 0) {
    _errors['contrasena'] = 'La contraseña es obligatoria';
  }
  // else if (values.contrasena.length < passwordMinLength) {
  //   _errors['contrasena'] =
  //     `La contraseña debe tener al menos ${passwordMinLength} caracteres`;
  // }

  // Validación de "empleadoId"
  // if (!values.empleadoId || values.empleadoId.trim().length === 0) {
  //   _errors['empleadoId'] = 'El empleado es obligatorio';
  // }

  // // Validación de "rolId"
  // if (!values.rolId || values.rolId.length <= 0) {
  //   _errors['rolId'] = 'Debes seleccionar un rol válido';
  // }
  // if (!values.sucursalId || values.sucursalId.length <= 0) {
  //   _errors['sucursalId'] = 'Debes seleccionar una sucursal válida';
  // }
  // if (!values.empleadoId || values.empleadoId.length <= 0) {
  //   _errors['empleadoId'] = 'Debes seleccionar un Empleado válida';
  // }

  // // Validación de "sucursalId"
  // if (!values.sucursalId || values.sucursalId.trim().length === 0) {
  //   _errors['sucursalId'] = 'La sucursal es obligatoria';
  // }

  // // Validación de "tiempoSesionActivo" (formato opcional, solo si el valor está presente)
  // if (
  //   values.tiempoSesionActivo &&
  //   !/^\d{2}:\d{2}:\d{2}$/.test(values.tiempoSesionActivo)
  // ) {
  //   _errors['tiempoSesionActivo'] =
  //     'El tiempo de sesión debe estar en formato HH:mm:ss';
  // }

  // // Validación de "imagen" (opcional, pero si está presente, debería ser una URL válida)
  // if (
  //   values.imagen &&
  //   !/^https?:\/\/[\w.-]+(?:\.[\w.-]+)+[\w\-\._~:\/?#[\]@!\$&'()\*\+,;=.]+$/.test(
  //     values.imagen,
  //   )
  // ) {
  //   _errors['imagen'] = 'La URL de la imagen no es válida';
  // }

  return _errors;
}

export function formRegisterValidationAdmin(values: SaveUsuarioRequest) {
  const _errors: { [key: string]: string } = {}; // Objeto para almacenar los errores

  const maxLength = 50; // Asigna la longitud máxima para algunos campos
  const minLength = 2; // Longitud mínima para "nombre"
  const passwordMinLength = 8; // Longitud mínima para "contrasena"

  // Validación de "nombre"
  if (!values.nombre || values.nombre.trim().length === 0) {
    _errors['nombre'] = 'El nombre es obligatorio';
  } else if (values.nombre.trim().length < minLength) {
    _errors['nombre'] = `El nombre debe tener al menos ${minLength} caracteres`;
  } else if (!createMaxLengthRegex(maxLength).test(values.nombre)) {
    _errors['nombre'] = `El nombre debe tener máximo ${maxLength} caracteres`;
  } else if (
    containsOnlyNumbers(values.nombre) ||
    containsAllowedSymbolsForSkills(values.nombre)
  ) {
    _errors['nombre'] = 'El nombre no puede contener solo números o símbolos';
  }

  // Validación de "correo"
  if (!values.correo || values.correo.trim().length === 0) {
    _errors['correo'] = 'El correo es obligatorio';
  } else if (!emailRegex.test(values.correo)) {
    _errors['correo'] = 'Por favor, ingrese un correo electrónico válido';
  }

  // Validación de "contrasena"
  if (!values.contrasena || values.contrasena.trim().length === 0) {
    _errors['contrasena'] = 'La contraseña es obligatoria';
  }
  // else if (values.contrasena.length < passwordMinLength) {
  //   _errors['contrasena'] =
  //     `La contraseña debe tener al menos ${passwordMinLength} caracteres`;
  // }

  // Validación de "empleadoId"
  // if (!values.empleadoId || values.empleadoId.trim().length === 0) {
  //   _errors['empleadoId'] = 'El empleado es obligatorio';
  // }

  // // Validación de "rolId"
  if (!values.rolId || values.rolId.length <= 0) {
    _errors['rolId'] = 'Debes seleccionar un rol válido';
  }
  if (!values.sucursalId || values.sucursalId.length <= 0) {
    _errors['sucursalId'] = 'Debes seleccionar una sucursal válida';
  }
  if (!values.empleadoId || values.empleadoId.length <= 0) {
    _errors['empleadoId'] = 'Debes seleccionar un Empleado válida';
  }

  // // Validación de "sucursalId"
  // if (!values.sucursalId || values.sucursalId.trim().length === 0) {
  //   _errors['sucursalId'] = 'La sucursal es obligatoria';
  // }

  // // Validación de "tiempoSesionActivo" (formato opcional, solo si el valor está presente)
  // if (
  //   values.tiempoSesionActivo &&
  //   !/^\d{2}:\d{2}:\d{2}$/.test(values.tiempoSesionActivo)
  // ) {
  //   _errors['tiempoSesionActivo'] =
  //     'El tiempo de sesión debe estar en formato HH:mm:ss';
  // }

  // // Validación de "imagen" (opcional, pero si está presente, debería ser una URL válida)
  // if (
  //   values.imagen &&
  //   !/^https?:\/\/[\w.-]+(?:\.[\w.-]+)+[\w\-\._~:\/?#[\]@!\$&'()\*\+,;=.]+$/.test(
  //     values.imagen,
  //   )
  // ) {
  //   _errors['imagen'] = 'La URL de la imagen no es válida';
  // }

  return _errors;
}

export function formClientSelectValidation(values: ClienteSelect) {
  const _errors: { [key: string]: string } = {}; // Objeto para almacenar los errores

  const maxLength = 50; // Asigna la longitud máxima para algunos campos
  const minLength = 2; // Longitud mínima para "nombre"
  const passwordMinLength = 8; // Longitud mínima para "contrasena"

  if (!values.clienteId || values.clienteId.length <= 0) {
    _errors['clienteId'] = 'Debes seleccionar un Cliente válido';
  }

  return _errors;
}

export function formDetalleVentaValidation(values: DetalleVentaForm) {
  const _errors: { [key: string]: string } = {}; // Objeto para almacenar los errores

  const maxLength = 50; // Asigna la longitud máxima para algunos campos
  const minLength = 2; // Longitud mínima para "nombre"
  const passwordMinLength = 8; // Longitud mínima para "contrasena"

  if (!values.productoId || values.productoId.length <= 0) {
    _errors['productoId'] = 'Debes seleccionar un Producto válido';
  }

  // Validación de "precio"
  if (values.cantidad <= 0) {
    _errors['cantidad'] = 'El precio debe ser mayor que 0';
  }

  return _errors;
}

export function formClientSaveValidation(values: ClienteEntitySave) {
  const _errors: { [key: string]: string } = {}; // Objeto para almacenar los errores

  const maxLength = 50; // Asigna la longitud máxima para algunos campos
  const minLength = 2; // Longitud mínima para "nombre"

  // Validación de "nombre"
  if (!values.nombre || values.nombre.trim().length === 0) {
    _errors['nombre'] = 'El nombre es obligatorio';
  }

  if (!values.apellido || values.apellido.trim().length === 0) {
    _errors['apellido'] = 'El apellido es obligatorio';
  }

  if (!values.email || values.email.trim().length === 0) {
    _errors['email'] = 'El email es obligatorio';
  }

  if (!values.telefono || values.telefono.trim().length === 0) {
    _errors['telefono'] = 'El telefono es obligatorio';
  }

  return _errors;

  // else if (values.nombre.trim().length < minLength) {
  //   _errors['nombre'] = `El nombre debe tener al menos ${minLength} caracteres`;
  // } else if (!createMaxLengthRegex(maxLength).test(values.nombre)) {
  //   _errors['nombre'] = `El nombre debe tener máximo ${maxLength} caracteres`;
  // } else if (
  //   containsOnlyNumbers(values.nombre) ||
  //   containsAllowedSymbolsForSkills(values.nombre)
  // ) {
  //   _errors['nombre'] = 'El nombre no puede contener solo números o símbolos';
  // }
}
// export const funcionGeneradoraValidaciones = ({ maxLength, label, field }) => [
//   ({ getFieldValue }) => {
//     const value = getFieldValue(field);

//     if (value && value.length <= maxLength) {
//       if (!minLengthRegexSkills.test(value)) {
//         return {
//           required: true,
//           pattern: minLengthRegexSkills,
//           message: 'You should write at least 2 characters',
//         };
//       }
//       if (
//         containsOnlyNumbers(value) ||
//         containsAllowedSymbolsForSkills(value)
//       ) {
//         if (/[a-zA-Z]/.test(value)) {
//           return {
//             required: true,
//             message: '${label} is Required! ',
//           };
//         } else {
//           return {
//             required: true,
//             pattern: createMaxLengthNoNumbersRegex(maxLength),
//             message: 'Only numbers or symbols are not allowed',
//           };
//         }
//       }
//     }

//     return {
//       required: true,
//       pattern: createMaxLengthRegex(maxLength),
//       message: !createMaxLengthRegex(maxLength).test(value)
//         ? `Maximum ${maxLength} characters allowed for ${label}`
//         : `${label} is Required!`,
//     };
//   },
// ];
export const funcionGeneradoraValidaciones = ({ maxLength, label, field }) => [
  {
    required: true,
    validator: async (rule, value, callback) => {
      // Si el valor está vacío o solo contiene espacios
      if (!value || value.trim().length === 0) {
        return Promise.reject(new Error(`${label} is Required!`));
      }

      // Validar si el valor tiene menos de 2 caracteres
      if (!minLengthRegexSkills.test(value)) {
        return Promise.reject(
          new Error('You should write at least 2 characters'),
        );
      }

      // Validar si contiene solo números o símbolos permitidos
      if (
        containsOnlyNumbers(value) ||
        containsAllowedSymbolsForSkills(value)
      ) {
        if (/[a-zA-Z]/.test(value)) {
          return Promise.reject(new Error(`${label} is Required!`));
        } else {
          return Promise.reject(
            new Error('Only numbers or symbols are not allowed'),
          );
        }
      }

      // Validar si excede la longitud máxima
      if (value.length > maxLength) {
        return Promise.reject(
          new Error(`Maximum ${maxLength} characters allowed for ${label}`),
        );
      }

      // Si pasa todas las validaciones, retornamos una promesa resuelta
      return Promise.resolve();
    },
  },
];

// Agregar producto

export const funcionGeneradoraValidacionesImagenAgregarProducto = ({
  maxLength,
  label,
  field,
}) => [
  {
    validator: async (rule, value, callback) => {
      // Si el valor está vacío o solo contiene espacios

      // Validar si el valor tiene menos de 2 caracteres
      if (!minLengthRegexSkills.test(value)) {
        return Promise.reject(
          new Error('You should write at least 2 characters'),
        );
      }

      // Validar si contiene solo números o símbolos permitidos
      if (
        containsOnlyNumbers(value) ||
        containsAllowedSymbolsForSkills(value)
      ) {
        if (/[a-zA-Z]/.test(value)) {
          return Promise.reject(new Error(`${label} is Required!`));
        } else {
          return Promise.reject(
            new Error('Only numbers or symbols are not allowed'),
          );
        }
      }

      // Validar si excede la longitud máxima
      // if (value.length > maxLength) {
      //   return Promise.reject(
      //     new Error(`Maximum ${maxLength} characters allowed for ${label}`),
      //   );
      // }

      // Si pasa todas las validaciones, retornamos una promesa resuelta
      return Promise.resolve();
    },
  },
];

export const funcionGeneradoraValidacionesPrecio = ({
  maxLength,
  label,
  field,
}) => [
  {
    required: true,
    validator: async (rule, value) => {
      // Si el valor está vacío o no está definido
      if (
        value === undefined ||
        value === null ||
        value.toString().trim().length === 0
      ) {
        return Promise.reject(new Error(`${label} is Required!`));
      }

      // Validar si el valor tiene menos de 2 caracteres
      if (!minLengthRegexSkills.test(value.toString())) {
        return Promise.reject(
          new Error('You should write at least 2 characters'),
        );
      }

      // Validar si contiene solo símbolos
      if (containsAllowedSymbolsForSkills(value.toString())) {
        return Promise.reject(new Error('Only symbols are not allowed'));
      }

      // Validar que el valor sea un número y mayor que 0
      if (isNaN(value) || Number(value) <= 0) {
        return Promise.reject(
          new Error('El precio debe ser un número mayor que 0'),
        );
      }

      // Validar si excede la longitud máxima
      if (value.toString().length > maxLength) {
        return Promise.reject(
          new Error(`Maximum ${maxLength} characters allowed for ${label}`),
        );
      }

      // Si pasa todas las validaciones, retornamos una promesa resuelta
      return Promise.resolve();
    },
  },
];

export const funcionGeneradoraValidacionesStockActual = ({
  maxLength,
  label,
  field,
}) => [
  {
    validator: async (rule, value) => {
      // Si el valor está vacío o no está definido
      // if (
      //   value === undefined ||
      //   value === null ||
      //   value.toString().trim().length === 0
      // ) {
      //   return Promise.reject(new Error(`${label} is Required!`));
      // }

      // Validar si el valor tiene menos de 2 caracteres
      // if (!minLengthRegexSkills.test(value.toString())) {
      //   return Promise.reject(
      //     new Error('You should write at least 2 characters'),
      //   );
      // }

      // Validar si contiene solo símbolos
      // if (containsAllowedSymbolsForSkills(value.toString())) {
      //   return Promise.reject(new Error('Only symbols are not allowed'));
      // }

      // Validar que el valor sea un número y mayor que 0
      // if (isNaN(value) || Number(value) <= 0) {
      //   return Promise.reject(
      //     new Error('El precio debe ser un número mayor que 0'),
      //   );
      // }

      // Validar si excede la longitud máxima
      // if (value.toString().length > maxLength) {
      //   return Promise.reject(
      //     new Error(`Maximum ${maxLength} characters allowed for ${label}`),
      //   );
      // }

      // Si pasa todas las validaciones, retornamos una promesa resuelta
      return Promise.resolve();
    },
  },
];

export const funcionGeneradoraValidacionesCantidad = ({
  maxLength,
  label,
  field,
}) => [
  {
    required: true,
    validator: async (rule, value) => {
      // Si el valor está vacío o no está definido
      if (
        value === undefined ||
        value === null ||
        value.toString().trim().length === 0
      ) {
        return Promise.reject(new Error(`${label} is Required!`));
      }

      // Validar si el valor tiene menos de 2 caracteres
      if (!minLengthRegexCantidad.test(value.toString())) {
        return Promise.reject(
          new Error('You should write at least 1 characters'),
        );
      }

      // Validar si contiene solo símbolos
      if (containsAllowedSymbolsForSkills(value.toString())) {
        return Promise.reject(new Error('Only symbols are not allowed'));
      }

      // Validar que el valor sea un número y mayor que 0
      if (isNaN(value) || Number(value) <= 0) {
        return Promise.reject(
          new Error('La cantidad debe ser un número mayor que 0'),
        );
      }

      // Validar si excede la longitud máxima
      if (value.toString().length > maxLength) {
        return Promise.reject(
          new Error(`Maximum ${maxLength} characters allowed for ${label}`),
        );
      }

      // Si pasa todas las validaciones, retornamos una promesa resuelta
      return Promise.resolve();
    },
  },
];

export const funcionGeneradoraValidacionesRol = ({ label }) => [
  {
    required: true,
    validator: async (rule, value) => {
      // Si el valor no está definido o es vacío
      if (
        value === undefined ||
        value === null ||
        value.toString().trim().length === 0
      ) {
        return Promise.reject(
          new Error(`Debes seleccionar un ${label} válidoo`),
        );
      }

      // Si el valor es válido, resolvemos la promesa
      return Promise.resolve();
    },
  },
];
export const funcionGeneradoraValidacionesSucursal = ({ label }) => [
  {
    required: true,
    validator: async (rule, value) => {
      // Si el valor no está definido o es vacío
      if (
        value === undefined ||
        value === null ||
        value.toString().trim().length === 0
      ) {
        return Promise.reject(
          new Error(`Debes seleccionar una ${label} válida`),
        );
      }

      // Si el valor es válido, resolvemos la promesa
      return Promise.resolve();
    },
  },
];
export const funcionGeneradoraValidacionesEmpleado = ({ label }) => [
  {
    required: true,
    validator: async (rule, value) => {
      // Si el valor no está definido o es vacío
      if (
        value === undefined ||
        value === null ||
        value.toString().trim().length === 0
      ) {
        return Promise.reject(
          new Error(`Debes seleccionar un ${label} válida`),
        );
      }

      // Si el valor es válido, resolvemos la promesa
      return Promise.resolve();
    },
  },
];
export const funcionGeneradoraValidacionesVenta = ({ label }) => [
  {
    required: true,
    validator: async (rule, value) => {
      // Si el valor no está definido o es vacío
      if (
        value === undefined ||
        value === null ||
        value.toString().trim().length === 0
      ) {
        return Promise.reject(
          new Error(`Debes seleccionar una ${label} válida`),
        );
      }

      // Si el valor es válido, resolvemos la promesa
      return Promise.resolve();
    },
  },
];
export const funcionGeneradoraValidacionesProducto = ({ label }) => [
  {
    required: true,
    validator: async (rule, value) => {
      // Si el valor no está definido o es vacío
      if (
        value === undefined ||
        value === null ||
        value.toString().trim().length === 0
      ) {
        return Promise.reject(
          new Error(`Debes seleccionar un ${label} válida`),
        );
      }

      // Si el valor es válido, resolvemos la promesa
      return Promise.resolve();
    },
  },
];
