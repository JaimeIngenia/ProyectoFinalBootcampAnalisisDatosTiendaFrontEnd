import {
  containsAllowedSymbolsForSkills,
  containsOnlyNumbers,
  createMaxLengthNoNumbersRegex,
  createMaxLengthRegex,
  minLengthRegexSkills,
} from './regex';
import { ProductoFormValues } from './types'; // Asegúrate de importar el tipo correctamente

export function formValidation(values: ProductoFormValues) {
  const _errors: { [key: string]: string } = {}; // Objeto para almacenar los errores

  const maxLength = 15; // Asigna la longitud máxima para los campos
  const minLength = 2; // Longitud mínima para nombre y descripción

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

  // // Validación de "nombre"
  // if (!values.nombre || values.nombre.trim().length === 0) {
  //   _errors['nombre'] = 'El nombre es obligatorio';
  // } else if (values.nombre.trim().length < minLength) {
  //   _errors['nombre'] = 'El nombre debe tener al menos 2 caracteres';
  // } else if (values.nombre.length > maxLength) {
  //   _errors['nombre'] = `El nombre debe tener máximo ${maxLength} caracteres`;
  // } else if (/^[0-9!@#\$%\^\&*\)\(+=._-]+$/g.test(values.nombre)) {
  //   _errors['nombre'] = 'El nombre no puede contener solo números o símbolos';
  // }

  // // Validación de "descripcion"
  // if (!values.descripcion || values.descripcion.trim().length === 0) {
  //   _errors['descripcion'] = 'La descripción es obligatoria';
  // } else if (values.descripcion.trim().length < minLength) {
  //   _errors['descripcion'] = 'La descripción debe tener al menos 2 caracteres';
  // } else if (values.descripcion.length > maxLength) {
  //   _errors['descripcion'] =
  //     `La descripción debe tener máximo ${maxLength} caracteres`;
  // } else if (/^[0-9!@#\$%\^\&*\)\(+=._-]+$/g.test(values.descripcion)) {
  //   _errors['descripcion'] =
  //     'La descripción no puede contener solo números o símbolos';
  // }

  // Validación de "precio"
  if (values.precio <= 0) {
    _errors['precio'] = 'El precio debe ser mayor que 0';
  }

  // // Validación de "categoriaId"
  if (!values.categoriaId || values.categoriaId.length <= 0) {
    _errors['categoriaId'] = 'Debes seleccionar una categoría válida';
  }

  return _errors;
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

export const funcionGeneradoraValidacionesCategoria = ({ label }) => [
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

// export const funcionGeneradoraValidacionesPrecio = ({
//   maxLength,
//   label,
//   field,
// }) => [
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
//       if (containsAllowedSymbolsForSkills(value)) {
//         return {
//           required: true,
//           pattern: createMaxLengthNoNumbersRegex(maxLength),
//           message: 'Only symbols are not allowed',
//         };
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
