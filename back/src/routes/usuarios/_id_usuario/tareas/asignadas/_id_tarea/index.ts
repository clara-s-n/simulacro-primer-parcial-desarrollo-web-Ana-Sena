import { FastifyPluginAsync } from "fastify";

import { IdUsuarioSchema } from "../../../../../../types/usuario.js";
import * as tareaService from "../../../../../../services/tareas.js";
import { IdTareaSchema } from "../../../../../../types/tarea.js";
import { Type } from "@sinclair/typebox";

const usuariosRoutes: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.delete("/", {
    schema: {
      tags: ["tareas-asignadas"],
      summary: "Desasigna usuario  de la tarea",
      description:
        "### Implementar y validar: \n " +
        " - token \n " +
        " - params \n " +
        " - que el usuario que ejecuta es administrador \n " +
        " - response. \n ",
      params: Type.Intersect([IdUsuarioSchema, IdTareaSchema]),
      response: {
        204: {
          description: "No content",
        },
      },
    },
    onRequest: [fastify.verifyJWT, fastify.verifyAdmin],
    handler: async function (request, reply) {
      const { id_usuario, id_tarea } = request.params as {
        id_usuario: number;
        id_tarea: number;
      };
      reply.code(204);
      return tareaService.unassign(id_usuario, id_tarea);
    },
  });

  fastify.put("/", {
    schema: {
      tags: ["tareas-asignadas"],
      summary: "Asignar tarea a usuario.",
      description:
        "### Implementar y validar: \n " +
        " - token \n " +
        " - params \n " +
        " - codigo de respuesta adecuado \n " +
        " - que el usuario que ejecuta es administrador \n " +
        " - response. \n ",
      params: Type.Intersect([IdUsuarioSchema, IdTareaSchema]),
      response: {
        204: {
          description: "No content",
        },
      },
    },
    onRequest: [fastify.verifyJWT, fastify.verifySelfOrAdmin],
    handler: async function (request, reply) {
      const { id_usuario, id_tarea } = request.params as {
        id_usuario: number;
        id_tarea: number;
      };
      reply.code(204);
      return tareaService.assign(id_usuario, id_tarea);
    },
  });
};

export default usuariosRoutes;
