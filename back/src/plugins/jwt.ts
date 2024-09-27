//Modificar o borrar este archivo resta 5 puntos.

import jwt, { FastifyJWTOptions } from "@fastify/jwt";
import { FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { FastifyReply } from "fastify/types/reply.js";
import { IdUsuarioType } from "../types/usuario.js";
import { IdTareaType, TareaFullType } from "../types/tarea.js";
import * as tareaService from "../services/tareas.js";

const jwtOptions: FastifyJWTOptions = {
  secret: "MYSUPERSECRET",
};

export default fp<FastifyJWTOptions>(async (fastify) => {
  fastify.register(jwt, jwtOptions);
  fastify.decorate(
    "verifyJWT",
    async function (request: FastifyRequest, reply: FastifyReply) {
      await request.jwtVerify();
    }
  );

  fastify.decorate(
    "verifyAdmin",
    async function (request: FastifyRequest, reply: FastifyReply) {
      console.log("Verificando si es administrador.");
      const usuarioToken = request.user;
      if (!usuarioToken.is_admin)
        throw reply.unauthorized("Tienes que ser admin para hacer eso.");
    }
  );

  fastify.decorate(
    "verifySelf",
    async function (request: FastifyRequest, reply: FastifyReply) {
      const usuarioToken = request.user;
      const id_usuario = Number((request.params as IdUsuarioType).id_usuario);
      if (usuarioToken.id_usuario !== id_usuario)
        throw reply.unauthorized(
          "No estás autorizado a modificar ese recurso que no te pertenece."
        );
    }
  );

  fastify.decorate(
    "verifySelfOrAdmin",
    async function (request: FastifyRequest, reply: FastifyReply) {
      console.log("Verificando si es administrador o self.");
      const usuarioToken = request.user;
      const id_usuario = Number((request.params as IdUsuarioType).id_usuario);
      console.log({ usuarioToken, id_usuario });
      if (!usuarioToken.is_admin && usuarioToken.id_usuario !== id_usuario)
        throw reply.unauthorized(
          "No estás autorizado a modificar ese recurso que no te pertenece si no eres admin."
        );
    }
  );

  fastify.decorate(
    "verifyTaskCreator",
    async function (request: FastifyRequest, reply: FastifyReply) {
      const usuarioToken = request.user;
      const { id_tarea } = request.params as IdTareaType;
      const tarea: TareaFullType = await tareaService.findById(id_tarea); //Si no lo encuentra ya tira notFound
      //Si no es admin, ni es el usuario que la creó.
      if (
        usuarioToken.id_usuario !== tarea.id_usuario &&
        !usuarioToken.is_admin
      )
        throw reply.unauthorized(
          "No estás autorizado a modificar una tarea que no creaste tu."
        );
    }
  );
});
