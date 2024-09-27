import createError from "@fastify/error";

export const NotFoundError = createError(
  "FST_ERR_NOT_FOUND",
  "No se encontró el elemento buscado.",
  // "No se encontró el elemento buscado %s",
  404
);
