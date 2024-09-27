import { FastifyPluginAsync } from "fastify";

import {
  IdUsuarioSchema,
  IdUsuarioType,
} from "../../../../../types/usuario.js";
import * as tareaService from "../../../../../services/tareas.js";
import { Type } from "@sinclair/typebox";
import { TareaFullSchema } from "../../../../../types/tarea.js";

const usuariosRoutes: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.get("/", {
    schema: {
      tags: ["tareas-asignadas"],
      params: IdUsuarioSchema,
      summary: "Obtener tareas asignadas al usuario",
      description:
        "### Implementar y validar: \n " +
        " - token \n " +
        " - params \n " +
        " - que el usuario que ejecuta es administrador o el propio usuario buscado \n " +
        " - response. \n ",
      response: {
        200: {
          description: "Usuario encontrado. ",
          content: {
            "application/json": {
              schema: Type.Array(TareaFullSchema),
            },
          },
        },
      },
    },
    onRequest: [fastify.verifyJWT, fastify.verifySelfOrAdmin],
    handler: async function (request, reply) {
      const { id_usuario } = request.params as IdUsuarioType;
      return tareaService.findAsignadasByIdUsuario(id_usuario);
    },
  });
};

export default usuariosRoutes;
