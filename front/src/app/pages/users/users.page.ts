import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { first, firstValueFrom } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  imports: [
    IonicModule,
    RouterLink,
    NgForOf,
    NgIf
  ]
})
export class UsersPage implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getUsers();
  }

  userList: User[] = [];
  // Nos traemos los datos de los usuarios
  async getUsers() {
    // Hacemos una petición GET a la API
    // y nos traemos los datos de los usuarios
    // que se encuentran en la base de datos
    // y los mostramos en la vista
    // mediante la variable userList
    this.userList = await firstValueFrom(this.http.get<User[]>('http://localhost/back/usuarios'));
  }
  /*
  async getPhoto(id_usuario: number) {
    // Hacemos una petición GET a la API
    // y nos traemos la foto de perfil del usuario
    // que se encuentra en la base de datos
    // y la mostramos en la vista
    // mediante la variable user.url_foto
    const user = this.userList.find(user => user.id_usuario === id_usuario);
    if (user) {
      user.url_foto = await firstValueFrom(this.http.get<string>(`http://localhost/back/usuarios/${id_usuario}/image`));
    }
  }*/

}
