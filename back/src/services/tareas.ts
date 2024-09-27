import { TareaFullType, TareaType } from "../types/tarea.js";
import { NotFoundError } from "../util/errors.js";
import db from "./db.js";

const baseQuery = `
  with tareas AS(
    SELECT T.*,U.username as creador, array_agg(UA.username)  as usuarios
    FROM public.tareas T
    JOIN public.usuarios U ON U.id_usuario=T.id_usuario 
    LEFT JOIN public.usuario_tareas ut on UT.id_tarea = T.id_tarea
    LEFT JOIN public.usuarios UA on UA.id_usuario = UT.id_usuario
    group by T.id_tarea, U.username
  )
  SELECT * FROM tareas T
`;

export const findAll = async () => {
  const res = await db.query(baseQuery);
  return res.rows;
};

export const findCreadasByUserId = async (id_usuario: number) => {
  const res = await db.query(
    `
    ${baseQuery}
    WHERE T.id_usuario=$1
    `,
    [id_usuario]
  );
  if (res.rowCount === 0) throw new NotFoundError(""); //FIXME: No diferencia si el usuario no existe o no tiene tareas creadas.
  return res.rows;
};

export const findAsignadasByIdUsuario = async (id_usuario: number) => {
  const consulta = `
    ${baseQuery}
    JOIN public.usuario_tareas UT ON UT.id_tarea = T.id_tarea AND UT.id_usuario = $1
    WHERE UT.id_usuario=$1
    `;

  console.log(consulta);
  const res = await db.query(consulta, [id_usuario]);

  return res.rows;
};

export const findById = async (id_tarea: number): Promise<TareaFullType> => {
  const res = await db.query(
    `
    ${baseQuery}
    WHERE id_tarea=$1
    `,
    [id_tarea]
  );
  if (res.rowCount === 0) throw new NotFoundError("");
  return res.rows[0];
};

export const findByIdAndCreator = async (
  id_tarea: number,
  id_usuario: number
): Promise<TareaFullType> => {
  const res = await db.query(
    `
    ${baseQuery}
    WHERE T.id_tarea=$1 AND T.id_usuario = $2
    `,
    [id_tarea, id_usuario]
  );
  if (res.rowCount === 0) throw new NotFoundError("");
  return res.rows[0];
};

export const deleteByIds = async (id_usuario: number, id_tarea: number) => {
  const res = await db.query(
    "DELETE FROM public.tareas WHERE id_usuario=$1 AND id_tarea=$2",
    [id_usuario, id_tarea]
  );
  if (res.rowCount === 0) throw new NotFoundError("");
};

export const unassign = async (id_usuario: number, id_tarea: number) => {
  const res = await db.query(
    "DELETE FROM public.usuario_tareas WHERE id_usuario=$1 AND id_tarea=$2",
    [id_usuario, id_tarea]
  );
  if (res.rowCount === 0) throw new NotFoundError("");
};

export const assign = async (id_usuario: number, id_tarea: number) => {
  const res = await db.query(
    "INSERT INTO public.usuario_tareas(id_usuario,id_tarea) VALUES($1,$2)",
    [id_usuario, id_tarea]
  );
  if (res.rowCount === 0) throw new NotFoundError("");
};

export const updateById = async (id_tarea: number, tarea: TareaType) => {
  const res = await db.query(
    `
    UPDATE public.tareas  
    SET nombre=$2, duracion=$3 
    WHERE id_tarea=$1;
    `,
    [id_tarea, tarea.nombre, tarea.duracion]
  );
  if (res.rowCount === 0) throw new NotFoundError("");
  return findById(id_tarea);
};

export const create = async (id_usuario: number, nuevaTarea: TareaType) => {
  const res = await db.query(
    `
    INSERT INTO public.tareas (nombre,duracion,id_usuario) 
    VALUES($1, $2, $3) RETURNING *;
    `,
    [nuevaTarea.nombre, nuevaTarea.duracion, id_usuario]
  );
  const tarea_creada: TareaFullType = res.rows[0];
  return findById(tarea_creada.id_tarea);
};


export const findCommentsByIdTarea = async (id_tarea: number) => {
    const res = await db.query(
        `
        SELECT * FROM public.comentarios WHERE id_tarea=$1
        `,
        [id_tarea]
    );
    return res.rows;
}

export const createComment = async (id_tarea: number, id_usuario: number, comentario: string, titulo: string) => {
    const res = await db.query(
      `
        INSERT INTO public.comentarios (  id_tarea, id_usuario, titulo, descripcion)
        VALUES ($1, $2, $3, $4) RETURNING *;
      `,
      [id_tarea,id_usuario, titulo, comentario]
  );
  return res.rows[0];
}

export const deleteComment = async (id_tarea: number, id_comentario: number) => {
    const res = await db.query(
        `
        DELETE FROM public.comentarios WHERE id_tarea=$1 AND id_comentario=$2
        `,
        [id_tarea, id_comentario]
    );
    return res.rows[0];
}

export const updateComment = async (id_tarea: number, id_comentario: number, comentario: string, titulo: string) => {
    const res = await db.query(
        `
        UPDATE public.comentarios
        SET descripcion=$3, titulo=$4
        WHERE id_tarea=$1 AND id_comentario=$2
        RETURNING *;
        `,
        [id_tarea, id_comentario, comentario, titulo]
    );
    return res.rows[0];
}

