import { FastifyPluginAsync } from "fastify";

import {
  IdUsuarioSchema,
  IdUsuarioType,
  UsuarioSchema,
  UsuarioType,
} from "../../../types/usuario.js";
import * as usuarioService from "../../../services/usuarios.js";

const usuariosRoutes: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.get("/", {
    schema: {
      tags: ["usuarios"],
      params: IdUsuarioSchema,
      summary: "Obtener un usuario por id",
      description:
        " ## Implementar y validar \n " +
        " - token \n " +
        " - params \n " +
        " - que el usuario que ejecuta es administrador o el propio usuario buscado \n " +
        " - response. \n ",
      response: {
        200: {
          description: "Usuario encontrado. ",
          content: {
            "application/json": {
              schema: UsuarioSchema,
            },
          },
        },
      },
    },
    onRequest: [fastify.verifyJWT, fastify.verifySelfOrAdmin],
    handler: async function (request, reply) {
      const { id_usuario } = request.params as IdUsuarioType;
      return usuarioService.findById(id_usuario);
    },
  });

  fastify.delete("/", {
    schema: {
      tags: ["usuarios"],
      params: IdUsuarioSchema,
      summary: "Borrar usuario por id",
      description:
        " ## Implementar y validar \n " +
        " - token \n " +
        " - params \n " +
        " - que el usuario que ejecuta es administrador \n " +
        " - está bien que falle si el usuario aún tiene tareas asignadas. \n " +
        " - response. \n ",
      response: {
        204: {
          description: "No content",
        },
      },
    },
    onRequest: [fastify.verifyJWT, fastify.verifyAdmin],
    handler: async function (request, reply) {
      const { id_usuario } = request.params as IdUsuarioType;
      reply.code(204);
      return usuarioService.deleteById(id_usuario);
    },
  });

  fastify.put("/", {
    schema: {
      tags: ["usuarios"],
      summary: "Actualizar usuario.",
      description:
        " ## Implementar y validar \n " +
        "- token \n " +
        "- No se puede editar la contraseña. \n " +
        "- body. \n " +
        "- params \n " +
        "- response. \n " +
        "- que el usuario que ejecuta es administrador o el mismo usuario a modificar.",

      body: UsuarioSchema,
      params: IdUsuarioSchema,
      response: {
        200: {
          description: "Usuario actualizado.",
          content: {
            "application/json": {
              schema: UsuarioSchema,
            },
          },
        },
      },
    },
    onRequest: [fastify.verifyJWT, fastify.verifySelfOrAdmin],
    handler: async function (request, reply) {
      const usuario = request.body as UsuarioType;
      return usuarioService.updateById(usuario);
    },
  });
};

export default usuariosRoutes;
