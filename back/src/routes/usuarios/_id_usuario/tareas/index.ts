import { FastifyPluginAsync } from "fastify";

import * as tareaService from "../../../../services/tareas.js";
import {
  TareaFullSchema,
  TareaSchema,
  TareaType,
} from "../../../../types/tarea.js";
import { IdUsuarioType } from "../../../../types/usuario.js";
import { Type } from "@sinclair/typebox";

const tareasUsuariosRoutes: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.get("/", {
    schema: {
      tags: ["tareas-usuario"],
      summary: "Tareas creadas por el usuario.",
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
      return tareaService.findCreadasByUserId(id_usuario);
    },
  });

  fastify.post("/", {
    schema: {
      tags: ["tareas-usuario"],
      summary: "Usuario crea una nueva tarea.",
      description:
        "### El codigo de respuesta debe ser el adecuado \n ### El creador de la tarea se toma de los params \n ### Implementar y validar: \n " +
        " - token \n " +
        " - params \n " +
        " - body \n " +
        " - que el usuario que ejecuta es el creador de la tarea \n " +
        " - response. \n ",
      body: TareaSchema,
      response: {
        201: {
          description: "Tarea creada.",
          content: {
            "application/json": {
              schema: TareaFullSchema,
            },
          },
        },
      },
    },
    onRequest: [fastify.verifyJWT, fastify.verifySelf],
    handler: async function (request, reply) {
      const nuevaTarea = request.body as TareaType;
      const { id_usuario } = request.params as IdUsuarioType;
      reply.code(201);
      return tareaService.create(id_usuario, nuevaTarea);
    },
  });
};

export default tareasUsuariosRoutes;
