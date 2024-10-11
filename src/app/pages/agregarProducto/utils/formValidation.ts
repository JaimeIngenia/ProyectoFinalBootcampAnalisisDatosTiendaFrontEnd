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

  // Validación de "nombre"
  if (!values.nombre || values.nombre.trim().length === 0) {
    _errors['nombre'] = 'El nombre es obligatorio';
  }

  // Validación de "descripcion"
  if (!values.descripcion || values.descripcion.trim().length === 0) {
    _errors['descripcion'] = 'La descripción es obligatoria';
  }

  // Validación de "precio"
  if (values.precio <= 0) {
    _errors['precio'] = 'El precio debe ser mayor que 0';
  }

  // // Validación de "categoriaId"
  if (!values.categoriaId || values.categoriaId <= 0) {
    _errors['categoriaId'] = 'Debes seleccionar una categoría válida';
  }

  return _errors;
}

export const funcionGeneradoraValidaciones = ({ maxLength, label, field }) => [
  ({ getFieldValue }) => {
    const value = getFieldValue(field);

    if (value && value.length <= maxLength) {
      if (!minLengthRegexSkills.test(value)) {
        return {
          required: true,
          pattern: minLengthRegexSkills,
          message: 'You should write at least 2 characters',
        };
      }
      if (
        containsOnlyNumbers(value) ||
        containsAllowedSymbolsForSkills(value)
      ) {
        if (/[a-zA-Z]/.test(value)) {
          return {
            required: true,
            message: '${label} is Required! ',
          };
        } else {
          return {
            required: true,
            pattern: createMaxLengthNoNumbersRegex(maxLength),
            message: 'Only numbers or symbols are not allowed',
          };
        }
      }
    }

    return {
      required: true,
      pattern: createMaxLengthRegex(maxLength),
      message: !createMaxLengthRegex(maxLength).test(value)
        ? `Maximum ${maxLength} characters allowed for ${label}`
        : `${label} is Required!`,
    };
  },
];

export const funcionGeneradoraValidacionesPrecio = ({
  maxLength,
  label,
  field,
}) => [
  ({ getFieldValue }) => {
    const value = getFieldValue(field);

    if (value && value.length <= maxLength) {
      if (!minLengthRegexSkills.test(value)) {
        return {
          required: true,
          pattern: minLengthRegexSkills,
          message: 'You should write at least 2 characters',
        };
      }
      if (containsAllowedSymbolsForSkills(value)) {
        return {
          required: true,
          pattern: createMaxLengthNoNumbersRegex(maxLength),
          message: 'Only symbols are not allowed',
        };
      }
    }

    return {
      required: true,
      pattern: createMaxLengthRegex(maxLength),
      message: !createMaxLengthRegex(maxLength).test(value)
        ? `Maximum ${maxLength} characters allowed for ${label}`
        : `${label} is Required!`,
    };
  },
];
