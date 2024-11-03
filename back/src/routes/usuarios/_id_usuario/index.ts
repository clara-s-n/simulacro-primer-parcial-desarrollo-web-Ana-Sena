import { FastifyPluginAsync } from "fastify";

import {
  IdUsuarioSchema,
  IdUsuarioType,
  UsuarioSchema,
  // UsuarioType,
} from "../../../types/usuario.js";
import * as usuarioService from "../../../services/usuarios.js";
import { MultiPartSchema, MultiPartType} from "../../../types/multipart.js";
//import { Type } from "@sinclair/typebox";
import path from "node:path";
import { writeFileSync} from "node:fs";

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
    //onRequest: [fastify.verifyJWT, fastify.verifySelfOrAdmin],
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
/*
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

      body: Type.Intersect([MultiPartSchema, UsuarioSchema]),
      params: IdUsuarioSchema,
      response: {
        200: {
          description: "Usuario actualizado.",
          content: {
            "application/json": {
              schema: MultiPartSchema,
            },
          },
        },
      },
    },
    //onRequest: [fastify.verifyJWT, fastify.verifySelfOrAdmin],
    handler: async function (request, reply) {

      // Sacamos los datos del usuario a modificar, guardamos la imagen en 'public' y actualizamos el usuario
      const { id_usuario } = request.params as IdUsuarioType;
      const usuario = fields as UsuarioType;
      const imagen = files[0];
      let imageUrl = ''
      // Guardamos la imagen en 'public', le ponemos de nombre el id del usuario y .wbep y actualizamos el usuario
      if (imagen) {
        const path = join(__dirname, "..", "..", "..", "public", `${id_usuario}.webp`);
        const fileStream = new Readable();
        fileStream.push(imagen._buf);
        await pipeline(
          fileStream,
          createWriteStream(path)
        );
        imageUrl = path;
      }

      usuario.url_foto = imageUrl;

      return usuarioService.updateById(usuario);
    },
  });*/

  fastify.put("/image", {
    schema: {
      tags: ['usuarios'],
      summary: 'Actualizar imagen de usuario.',
      description: ' ## Implementar y validar \n - token \n - body. \n - params \n - response. \n - que el usuario que ejecuta es administrador o el mismo usuario a modificar.',
      body: MultiPartSchema,
      params: IdUsuarioSchema,
      response: {
        200: {
          description: 'Usuario actualizado.',
          content: {
            'application/json': {
              schema: MultiPartSchema,
            },
          },
        },
      },
    },
    // onRequest: [fastify.verifyJWT, fastify.verifySelfOrAdmin],
    handler: async function (request, reply) {
      const {id_usuario} = request.params as IdUsuarioType;
      const {image} = request.body as MultiPartType;

      if (!image || !image._buf) {
        throw new Error('No image file provided');
      }

      const fileBuffer = image._buf as Buffer;

      // Define upload directory
      const uploadDir = path.join(process.cwd(), "public", "uploads");

      // Process and save the image
        const imageUrl = `${uploadDir}/${id_usuario}.webp`;
        writeFileSync(imageUrl, fileBuffer);

      // Update user record with new image URL
      await usuarioService.updateImageById(id_usuario, imageUrl);

      return {
        imageUrl,
        message: 'Image successfully updated'
      };
    }
  });
};


      export default usuariosRoutes;
