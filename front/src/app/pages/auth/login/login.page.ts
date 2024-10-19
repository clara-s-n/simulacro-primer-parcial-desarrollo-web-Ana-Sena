import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ApiRestService} from '../../../services/api-rest.service';
import {Router} from '@angular/router';

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

  async onSubmit() {
    console.log("username:", this.username);
    console.log("password", this.password);
    const sent = await this.apiService.post('auth/',
      JSON.stringify({username: this.username, contraseña: this.password}))
    console.log(sent)
    this.apiService.setToken(sent.token)
    await this.router.navigate(['/tasks'])
  }

}
