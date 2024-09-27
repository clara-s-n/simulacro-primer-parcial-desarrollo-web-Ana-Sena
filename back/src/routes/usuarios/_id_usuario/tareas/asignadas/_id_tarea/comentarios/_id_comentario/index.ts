import { FastifyPluginAsync } from "fastify";
import { IdUsuarioSchema } from "../../../../../../../../types/usuario.js";
import * as tareaService from "../../../../../../../../services/tareas.js";
import { IdTareaSchema } from "../../../../../../../../types/tarea.js";
import { Type } from "@sinclair/typebox";
import { CommentSchema, CommentType, IdComentarioSchema } from "../../../../../../../../types/comment.js";

const usuariosRoutes: FastifyPluginAsync = async (
    fastify,
    opts): Promise<void> => {

    // El put para modificar un comentario
    fastify.put("/", {
        schema: {
            tags: ["comentarios"],
            summary: "Modificar comentario de la tarea.",
            params: Type.Intersect([IdUsuarioSchema, IdTareaSchema, IdComentarioSchema]),
            body: CommentSchema,
            response: {
                201: {
                    description: "Comentario modificado.",
                    content: {
                        "application/json": {
                            schema: CommentSchema,
                        },
                    },
                },
            },
        },
        onRequest: [fastify.verifyJWT, fastify.verifySelfOrAdmin],
        handler: async function (request, reply) {
            const comentario = request.body as CommentType;
            const idTarea = comentario.id_tarea
            const idUsuario = comentario.id_usuario
            const descripcion = comentario.descripcion
            const titulo = comentario.titulo
            return tareaService.updateComment(idTarea, idUsuario, descripcion, titulo);
        },
    });

    // El delete para borrar un comentario
    fastify.delete("/", {
        schema: {
            tags: ["comentarios"],
            summary: "Eliminar comentario de la tarea.",
            params: Type.Intersect([IdUsuarioSchema, IdTareaSchema, IdComentarioSchema]),
            response: {
                204: {
                    description: "Comentario eliminado.",
                },
            },
        },
        onRequest: [fastify.verifyJWT, fastify.verifySelfOrAdmin],
        handler: async function (request, reply) {
            const { id_tarea } = request.params as { id_tarea: number };
            const {id_comentario} = request.params as {id_comentario: number};
            return tareaService.deleteComment(id_tarea, id_comentario);
        },
    });
}

export default usuariosRoutes;