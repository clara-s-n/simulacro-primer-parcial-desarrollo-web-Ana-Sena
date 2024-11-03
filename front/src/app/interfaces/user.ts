export interface User extends UserPhoto {
  username: string;
  email: string;
  is_admin: boolean;
}

export interface UserPhoto {
  id_usuario: number;
  url_foto: string;
}
