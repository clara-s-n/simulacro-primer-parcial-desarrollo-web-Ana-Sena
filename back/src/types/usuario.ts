import { Type, Static } from "@sinclair/typebox";

export const IdUsuarioSchema = Type.Object({
  id_usuario: Type.Integer({ description: "Identificador único del usuario" }),
});
export type IdUsuarioType = Static<typeof IdUsuarioSchema>;

export const LoginSchema = Type.Object(
  {
    username: Type.String({ description: "Nombre de usuario para el login" }),
    contraseña: Type.String({ description: "Contraseña del usuario" }),
  },
  {
    examples: [
      { username: "admin", contraseña: "@Admin1" },
      { username: "pepe", contraseña: "@Pepe1" },
    ],
  }
);
export type LoginType = Static<typeof LoginSchema>;

export const UsuarioSchema = Type.Object(
  {
    id_usuario: Type.Integer({
      description: "Identificador único del usuario",
    }),
    username: Type.String({ description: "Nombre de usuario" }),
    email: Type.String({ description: "Correo electrónico del usuario" }),
    is_admin: Type.Boolean({
      description: "Indica si el usuario es administrador",
    }),
  },
  {
    additionalProperties: false,
    examples: [
      {
        id_usuario: 5,
        username: "nuevo1",
        email: "actualizado1@parcial.com",
        is_admin: false,
      },
    ],
  }
);

export const NuevoUsuarioSchema = Type.Object(
  {
    username: Type.String({ description: "Nombre de usuario" }),
    email: Type.String({ description: "Correo electrónico del usuario" }),
    contraseña: Type.String({ description: "Contraseña del usuario" }),
    contraseña2: Type.String({
      description: "Confirmación de la contraseña del usuario",
    }),
  },
  {
    examples: [
      {
        username: "nuevo1",
        email: "nuevo1@parcial.com",
        contraseña: "@Nuevo1",
        contraseña2: "@Nuevo1",
      },
      {
        username: "nuevo2",
        email: "nuevo2@parcial.com",
        contraseña: "@Nuevo2",
        contraseña2: "@Nuevo2",
      },
      {
        username: "nuevo3",
        email: "nuevo2@parcial.com",
        contraseña: "@Nuevo3",
        contraseña2: "@Nuevo3",
      },
    ],
  }
);

export type UsuarioType = Static<typeof UsuarioSchema>;
export type NuevoUsuarioType = Static<typeof NuevoUsuarioSchema>;
