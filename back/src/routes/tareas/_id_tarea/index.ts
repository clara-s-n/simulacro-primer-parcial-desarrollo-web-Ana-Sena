import { FastifyPluginAsync } from "fastify";
import * as tareaService from "../../../services/tareas.js";
import { IdTareaSchema, IdTareaType } from "../../../types/tarea.js";

const tareasRoutes: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.get("/", {
    schema: {
      summary: "Obtener una tarea especifica",
      description:
        "### Implementar y validar: \n " +
        " - token \n " +
        " - params \n " +
        " - response. \n - Solo admin tiene permisos.",
      tags: ["tareas"],
      params: IdTareaSchema,
    },
    onRequest: [fastify.verifyJWT, fastify.verifyAdmin],
    handler: async function (request, reply) {
      const { id_tarea } = request.params as IdTareaType;
      return tareaService.findById(id_tarea);
    },
  });
};

export default tareasRoutes;
