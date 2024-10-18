import { FastifyPluginAsync } from "fastify";
import { IdUsuarioSchema } from "../../../../../../../types/usuario.js";
import * as tareaService from "../../../../../../../services/tareas.js";
import { IdTareaSchema } from "../../../../../../../types/tarea.js";
import { Type } from "@sinclair/typebox";
import { CommentSchema, CommentType } from "../../../../../../../types/comment.js";


const usuariosRoutes: FastifyPluginAsync = async (
    fastify,
    opts): Promise<void> => {

    fastify.get("/", {
        schema: {
            tags: ["comentarios"],
            summary: "Listado de comentarios de la tarea.",
            params: Type.Intersect([IdUsuarioSchema, IdTareaSchema]),
            response: {
                200: {
                    description: "Lista de comentarios de la tarea.",
                    content: {
                        "application/json": {
                            schema: Type.Array(CommentSchema),
                        },
                    },
                },
            },
        },
        onRequest: [fastify.verifyJWT],
        handler: async function (request, reply) {
            const { id_tarea } = request.params as { id_tarea: number };
            return tareaService.findCommentsByIdTarea(id_tarea);
        },
    });

    fastify.post("/", {
        schema: {
            tags: ["comentarios"],
            summary: "Crear comentario de la tarea.",
            params: Type.Intersect([IdUsuarioSchema, IdTareaSchema]),
            body: CommentSchema,
            response: {
                201: {
                    description: "Comentario creado.",
                    content: {
                        "application/json": {
                            schema: CommentSchema,
                        },
                    },
                },
            },
        },
        onRequest: [fastify.verifyJWT],
        handler: async function (request, reply) {
            const comentario = request.body as CommentType;
            const idTarea = comentario.id_tarea
            const idUsuario = comentario.id_usuario
            const descripcion = comentario.descripcion
            const titulo = comentario.titulo
            return tareaService.createComment(idTarea, idUsuario, descripcion, titulo);
        },
    });
}

export default usuariosRoutes;