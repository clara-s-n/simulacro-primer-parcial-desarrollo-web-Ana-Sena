import { FastifyReply, FastifyRequest } from "fastify";
import { UsuarioType } from "./usuario.js";
// import { UsuarioType } from "./user.js";

export interface authenticateFunction {
  (request: FastifyRequest, reply: FastifyReply): Promise<void>;
}

// Most importantly, use declaration merging to add the custom property to the Fastify type system
declare module "fastify" {
  interface FastifyInstance {
    verifyJWT: authenticateFunction;
    verifyAdmin: authenticateFunction;
    verifySelf: authenticateFunction;
    verifySelfOrAdmin: authenticateFunction;
    verifyTaskCreator: authenticateFunction;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: UsuarioType;
    user: UsuarioType;
  }
}
