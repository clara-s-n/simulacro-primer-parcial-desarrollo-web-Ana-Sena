import { Component} from '@angular/core';
import { IonFabButton } from '@ionic/angular/standalone';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  standalone: true,
  selector: 'app-foto',
  templateUrl: './foto.page.html',
  styleUrls: ['./foto.page.scss'],
  imports: [IonFabButton],
})
export class FotoPage {

  image : string = '';
  constructor() {}

  public async takePhoto() {
    const foto = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });

    if(foto.webPath){
      this.image = foto.webPath;
    }
    
    
  }
}
