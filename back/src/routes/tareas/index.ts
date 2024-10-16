import { FastifyPluginAsync } from "fastify";
import * as tareaService from "../../services/tareas.js";
import { TareaFullSchema } from "../../types/tarea.js";
import { Type } from "@sinclair/typebox";

const tareasRoutes: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.get("/", {
    schema: {
      summary: "Listado de tareas completo.",
      description:
        "### Implementar y validar: \n " +
        " - token \n " +
        " - response. \n - Solo admin puede ver todas las tareas.",
      tags: ["tareas"],
      response: {
        200: {
          description: "Lista de tareas completo.",
          content: {
            "application/json": {
              schema: Type.Array(TareaFullSchema),
            },
          },
        },
      },
    },
    // onRequest: [fastify.verifyJWT, fastify.verifyAdmin],
    handler: async function (request, reply) {
      return tareaService.findAll();
    },
  });
};

export default tareasRoutes;
