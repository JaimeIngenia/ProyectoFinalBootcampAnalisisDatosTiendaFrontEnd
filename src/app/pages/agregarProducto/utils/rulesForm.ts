import {
  funcionGeneradoraValidaciones,
  funcionGeneradoraValidacionesPrecio,
} from './formValidation';
import { createMaxLengthRegex } from './regex';

export const rulesForm = {
  rulesNombre: funcionGeneradoraValidaciones({
    maxLength: 15,
    label: 'Nombre',
    field: 'nombre',
  }),
  rulesDescripcion: funcionGeneradoraValidaciones({
    maxLength: 15,
    label: 'Descripcion',
    field: 'descripcion',
  }),
  rulesPrecio: funcionGeneradoraValidacionesPrecio({
    maxLength: 15,
    label: 'Precio',
    field: 'precio',
  }),
  rulesInput: [
    {
      required: true,
      message: '${label} is Required!',
    },
  ],

  rulesNombre_v1: [
    ({ getFieldValue }) => ({
      required: true,
      pattern: createMaxLengthRegex(15),
      message: !createMaxLengthRegex(15).test(getFieldValue('nombre'))
        ? 'Maximum 150 characters allowed for ${label}'
        : '${label} is Required!',
    }),
  ],
  rulesNombre_v2: [
    {
      required: true,
      message: 'El nombre es obligatorio',
    },
    {
      pattern: createMaxLengthRegex(15),
      message: 'El nombre no puede tener más de 15 caracteres',
    },
  ],
};
