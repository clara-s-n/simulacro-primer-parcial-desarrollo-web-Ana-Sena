export interface Task {
  id_tarea: number;
  nombre: string;
  duracion: number;
  id_usuario: number;
  creador: string;
  usuarios: string[]
}

export interface TaskPost {
  nombre: string;
  duracion: number;
}
