import { FastifyPluginAsync } from "fastify";
import {
  LoginSchema,
  LoginType,
  UsuarioSchema,
  UsuarioType,
} from "../../types/usuario.js";
import db from "../../services/db.js";
import { Type } from "@sinclair/typebox";

const authRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post("/", {
    schema: {
      summary: "Hacer login",
      description: "Ruta para loguearse usuando username y contraseña.",
      security: [],
      tags: ["auth"],
      body: LoginSchema,
      response: {
        200: {
          description: "Datos del usuario dentro del token",
          content: {
            "application/json": {
              schema: Type.Object({
                token: Type.String(),
                usuario: UsuarioSchema,
              }),
            },
          },
        },
      },
    },
    handler: async function (request, reply) {
      const { username, contraseña } = request.body as LoginType;
      const res = await db.query(
        "SELECT U.id_usuario,U.email,U.username,U.is_admin FROM usuarios U WHERE username=$1 and contraseña = crypt($2, contraseña);",
        [username, contraseña]
      );
      if (res.rowCount === 0)
        reply.unauthorized("El username o contraseña no es correcto.");
      const usuario: UsuarioType = res.rows[0];

      const token = fastify.jwt.sign(usuario);
      reply.send({ token, usuario });
    },
  });
};

export default authRoutes;
