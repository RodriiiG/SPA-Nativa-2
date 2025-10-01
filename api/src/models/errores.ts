import createError from "@fastify/error";

export const ErrorUnknown = createError("ERR1_T05", "Error desconocido", 500, Error);
export const ServiceUnavailable = createError(
  "ERR2_T05",
  "Error de conexión a la base de datos",
  503,
  Error
);
export const NotFound = createError(
  "ERR3_T05",
  "Elemento no encontrado",
  404,
  Error
);
export const Unauthorized = createError(
  "ERR4_T05",
  "Se requiere autenticación para realizar esta acción",
  401,
  Error
);
export const LackPermission = createError(
  "ERR5_T05",
  "No tiene permisos suficientes para realizar esta acción",
  403,
  Error
);
