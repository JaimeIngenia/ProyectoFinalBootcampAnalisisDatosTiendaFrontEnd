import {
  funcionGeneradoraValidaciones,
  funcionGeneradoraValidacionesRol,
  funcionGeneradoraValidacionesPrecio,
  funcionGeneradoraValidacionesSucursal,
  funcionGeneradoraValidacionesEmpleado,
  funcionGeneradoraValidacionesVenta,
  funcionGeneradoraValidacionesProducto,
  funcionGeneradoraValidacionesImagenAgregarProducto,
  funcionGeneradoraValidacionesCantidad,
  funcionGeneradoraValidacionesStockActual,
} from './formValidation';
import {
  createMaxLengthRegex,
  emailRegex,
  maxLengthRegex,
  minLengthRegex,
} from './regex';

export const rulesForm = {
  rulesNombre: funcionGeneradoraValidaciones({
    maxLength: 50,
    label: 'Nombre',
    field: 'nombre',
  }),
  rulesDescripcion: funcionGeneradoraValidaciones({
    maxLength: 150,
    label: 'Descripcion',
    field: 'descripcion',
  }),
  rulesPrecio: funcionGeneradoraValidacionesPrecio({
    maxLength: 15,
    label: 'Precio',
    field: 'precio',
  }),
  rulesStockActual: funcionGeneradoraValidacionesStockActual({
    maxLength: 15,
    label: 'Stock Actual',
    field: 'stockActual',
  }),
  rulesCategoriaId: funcionGeneradoraValidacionesRol({
    label: 'Categoría',
  }),
  //Para la pagina del login
  rulesRolesId: funcionGeneradoraValidacionesRol({
    label: 'Rol',
  }),
  rulesSucursalId: funcionGeneradoraValidacionesSucursal({
    label: 'Sucursal',
  }),
  rulesEmpleadoId: funcionGeneradoraValidacionesEmpleado({
    label: 'Empleado',
  }),
  rulesVentaId: funcionGeneradoraValidacionesVenta({
    label: 'Venta',
  }),
  rulesProductoId: funcionGeneradoraValidacionesProducto({
    label: 'Producto',
  }),
  rulesCantidad: funcionGeneradoraValidacionesCantidad({
    maxLength: 15,
    label: 'Cantidad',
    field: 'cantidad',
  }),
  // Para la pagina de agregar producto
  rulesImagenAgregarProducto:
    funcionGeneradoraValidacionesImagenAgregarProducto({
      maxLength: 150,
      label: 'Imagen',
      field: 'imagen',
    }),
  rulesInput: [
    {
      required: true,
      message: '${label} is Required!',
    },
  ],
  rulesCorreo: [
    {
      required: true,
      message: 'Correo es obligatorio',
    },
    {
      pattern: emailRegex,
      message: 'Por favor, ingrese un correo electrónico válido',
    },
  ],
  rulesContrasena: [
    {
      required: true,
      message: 'Contraseña es obligatoria',
    },
    // {
    //   validator: async (rule, value) => {
    //     if (!value) {
    //       return Promise.reject('Contraseña es obligatoria');
    //     }

    //     // Validar longitud mínima de la contraseña (6 caracteres)
    //     if (!minLengthRegex.test(value)) {
    //       return Promise.reject(
    //         'La contraseña debe tener al menos 6 caracteres',
    //       );
    //     }

    //     // Validar longitud máxima de la contraseña (20 caracteres)
    //     if (!maxLengthRegex(20).test(value)) {
    //       return Promise.reject(
    //         'La contraseña no puede exceder los 20 caracteres',
    //       );
    //     }

    //     return Promise.resolve();
    //   },
    // },
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
