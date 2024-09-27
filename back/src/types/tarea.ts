import { Static, Type } from "@sinclair/typebox";
export const IdTareaSchema = Type.Object({
  id_tarea: Type.Integer({ description: "Identificador único del usuario" }),
});
export type IdTareaType = Static<typeof IdTareaSchema>;

export const TareaSchema = Type.Object(
  {
    nombre: Type.String({ description: "Nombre de la tarea" }),
    duracion: Type.Integer({ description: "Duración de la tarea en minutos" }),
  },
  { examples: [{ nombre: "TareaN1", duracion: 4 }] }
);
export type TareaType = Static<typeof TareaSchema>;

export const TareaFullSchema = Type.Intersect(
  [
    IdTareaSchema,
    TareaSchema,
    Type.Object({
      id_usuario: Type.Integer({
        description: "Id del usuario que creó la tarea.",
      }),
      creador: Type.String({
        description: "username del usuario que creó la tarea.",
      }),
      usuarios: Type.Array(Type.String(), {
        description: "lista de usuarios asignados.",
      }),
    }),
  ],
  {
    examples: [
      {
        id_tarea: 1,
        nombre: "tarea 1 modificada.",
        duracion: 5,
        id_creador: 2,
      },
      {
        id_tarea: 1,
        nombre: "tarea 1 modificada por alguien que no es el creador.",
        duracion: 5,
        id_creador: 4,
      },
    ],
  }
);
export type TareaFullType = Static<typeof TareaFullSchema>;
