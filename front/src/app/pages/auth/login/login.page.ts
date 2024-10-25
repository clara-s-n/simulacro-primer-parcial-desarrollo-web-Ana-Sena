import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ApiRestService} from '../../../services/api-rest.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css'
})
export class LoginPage {
  // Obtener el valor de los inputs
  username: string = '';
  password: string = '';
  private apiService: ApiRestService = inject(ApiRestService);
  private router: Router = inject(Router);
  private httpService: HttpClient = inject(HttpClient);

  async onSubmit() {
    console.log("username:", this.username);
    console.log("password", this.password);
    const response = await firstValueFrom(this.httpService.post('back/auth', {username: this.username, contraseña: this.password}));
    console.log('response:', response);
  }

}
