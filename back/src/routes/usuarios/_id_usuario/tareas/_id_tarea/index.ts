import { FastifyPluginAsync } from "fastify";

import * as tareaService from "../../../../../services/tareas.js";
import {
  IdTareaSchema,
  IdTareaType,
  TareaFullSchema,
  TareaSchema,
  TareaType,
} from "../../../../../types/tarea.js";
import { Type } from "@sinclair/typebox";
import { IdUsuarioSchema } from "../../../../../types/usuario.js";

const tareaUsuarioRoutes: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.get("/", {
    schema: {
      summary: "Obtener tarea de usuario",
      description:
        "### Implementar y validar: \n " +
        " - token \n " +
        " - params \n " +
        " - que el usuario que ejecuta es el creador de la tarea o admin \n " +
        " - response. \n ",
      tags: ["tareas-usuario"],
      params: Type.Intersect([IdUsuarioSchema, IdTareaSchema]),
      response: {
        200: {
          description: "Listado de tareas del usuario dado.",
          content: {
            "application/json": {
              schema: TareaFullSchema,
            },
          },
        },
      },
    },
    onRequest: [fastify.verifyJWT, fastify.verifyTaskCreator],
    handler: async function (request, reply) {
      const { id_tarea, id_usuario } = request.params as {
        id_tarea: number;
        id_usuario: number;
      };
      return tareaService.findByIdAndCreator(id_tarea, id_usuario);
    },
  });

  fastify.put("/", {
    schema: {
      summary: "Modificar la tarea del usuario",
      description:
        "### Implementar y validar: \n " +
        " - token \n " +
        " - params \n " +
        " - body \n " +
        " - que el usuario que ejecuta es el creador de la tarea o admin \n " +
        " - response. \n ",
      tags: ["tareas-usuario"],
      params: Type.Intersect([IdUsuarioSchema, IdTareaSchema]),
      body: TareaSchema,
      response: {
        200: {
          description: "Tarea modificada.",
          content: {
            "application/json": {
              schema: TareaFullSchema,
            },
          },
        },
      },
    },
    onRequest: [fastify.verifyJWT, fastify.verifyTaskCreator],
    handler: async function (request, reply) {
      const nuevaTarea = request.body as TareaType;
      const { id_tarea } = request.params as IdTareaType;
      reply.code(201);
      return tareaService.updateById(id_tarea, nuevaTarea);
    },
  });

  fastify.delete("/", {
    schema: {
      tags: ["tareas-usuario"],
      params: Type.Intersect([IdUsuarioSchema, IdTareaSchema]),
      summary: "Borrar una tarea",
      description:
        "### Implementar y validar: \n " +
        " - token \n " +
        " - params \n " +
        " - que el usuario que ejecuta es administrador o el creador \n " +
        " - response. \n ",
      response: {
        204: {
          description: "No content",
        },
      },
    },
    onRequest: [fastify.verifyJWT, fastify.verifyTaskCreator],
    handler: async function (request, reply) {
      const { id_usuario, id_tarea } = request.params as {
        id_usuario: number;
        id_tarea: number;
      };
      reply.code(204);
      return tareaService.deleteByIds(id_usuario, id_tarea);
    },
  });
};

export default tareaUsuarioRoutes;
