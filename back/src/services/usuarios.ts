import { NuevoUsuarioType, UsuarioType } from "../types/usuario.js";
import { NotFoundError } from "../util/errors.js";
import db from "./db.js";

export const findAll = async () => {
  const res = await db.query("SELECT * FROM public.usuarios");
  return res.rows;
};

export const findById = async (id_usuario: number) => {
  const res = await db.query(
    "SELECT * FROM public.usuarios WHERE id_usuario=$1",
    [id_usuario]
  );
  if (res.rowCount === 0) throw new NotFoundError("");
  return res.rows[0];
};

export const deleteById = async (id_usuario: number) => {
  const res = await db.query(
    "DELETE FROM public.usuarios WHERE id_usuario=$1",
    [id_usuario]
  );
  if (res.rowCount === 0) throw new NotFoundError("");
};

export const updateById = async (usuario: UsuarioType) => {
  const res = await db.query(
    `
    UPDATE public.usuarios  
    SET email=$2, username=$3, is_admin=$4
    WHERE id_usuario=$1
    RETURNING *;
    `,
    [usuario.id_usuario, usuario.email, usuario.username, usuario.is_admin]
  );
  if (res.rowCount === 0) throw new NotFoundError("");
  return res.rows[0];
};

export const create = async (nuevoUsuario: NuevoUsuarioType) => {
  const res = await db.query(
    `
    INSERT INTO public.usuarios (username,email,contraseña) 
    VALUES($1, $2, crypt($3, gen_salt('bf'))) RETURNING *;
    `,
    [nuevoUsuario.username, nuevoUsuario.email, nuevoUsuario.contraseña]
  );
  return res.rows[0];
};
