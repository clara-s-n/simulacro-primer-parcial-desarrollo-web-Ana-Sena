import {Component, inject, output} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {ApiRestService} from '../../services/api-rest.service';
import {TaskPost} from '../../interfaces/task';
import { JsonPipe } from '@angular/common';
import { TakenDirective} from '../../directive/taken.directive';
import {DivisorDirective} from '../../directive/divisor.directive';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    TakenDirective,
    DivisorDirective
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  task: TaskPost = {
    nombre: '',
    duracion: 0,
  }
  save = output<TaskPost>();
  private httpClient = inject(HttpClient)
  private router = inject(Router)

  async sendForm(form: NgForm){
    if (form.valid){
      const id_usuario = localStorage.getItem('token.usuario.id_usuario');
      console.log('id_usuario:', id_usuario);
      console.info('Formulario válido');
      this.save.emit(this.task);
      this.httpClient.post(`back/usuarios/${id_usuario}/tareas/`, this.task).subscribe(
        (response) => {
          console.log('response:', response);
        },
        (error) => {
          console.error('error:', error);
        }
      );
      await this.router.navigate(['/tasks']);
    }
    else {
      console.error('Formulario inválido');
    }
  }
}
