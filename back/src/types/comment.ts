import { Static, Type } from "@sinclair/typebox";

export const CommentSchema = Type.Object(
    {
        id_tarea: Type.Integer({ description: "Identificador único de la tarea" }),
        id_usuario: Type.Integer({ description: "Identificador único del usuario" }),
        descripcion: Type.String({ description: "Comentario del usuario" }),
        titulo: Type.String({ description: "Titulo del comentario", minLength: 10 })
    },
    { examples: [{ id_tarea: 1, id_usuario: 1, comentario: "Comentario de la tarea 1" }] }
    );

export type CommentType = Static<typeof CommentSchema>;


export const IdComentarioSchema = Type.Object(
    {
        id_comentario: Type.Integer({ description: "Identificador único del comentario" }),
    },
    { examples: [{ id_comentario: 1 }] }
    );

export type IdComentarioType = Static<typeof IdComentarioSchema>;

// El put es un partial de CommentSchema
export const PutCommentSchema = Type.Partial(CommentSchema);
// El partial es para que no sea obligatorio enviar todos los campos