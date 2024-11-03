import { Component, OnInit } from '@angular/core';
import { ImageCropperComponent, ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserPhoto} from '../../interfaces/user';

@Component({
  standalone: true,
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  imports: [
    ImageCropperComponent,
    IonicModule
  ]
})
export class ImageComponent implements OnInit {


  ngOnInit() {
    // Sacamos el id del usuario de la URL
    const id = window.location.pathname.split('/').pop();
    console.log('id', id);
    this.user.id_usuario = parseInt(id || '0');
    console.log('user', this.user);
  }

  imageChangedEvent: Event | null = null;
  croppedImage: SafeUrl = '';
  private _imageBlob?: Blob | null;
  user: UserPhoto = {
    id_usuario: 0,
    url_foto: ''
  }

  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) {
  }

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    if (event.objectUrl) {
      this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
    }
    // event.blob can be used to upload the cropped image
    this._imageBlob = event.blob;
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  async uploadImage(id_usuario: number, image: Blob) {
    const formData = new FormData();
    formData.append('image', image, 'image.webp');
    return firstValueFrom(
      this.http.put(`http://localhost/back/usuarios/${id_usuario}/image`, formData)
    );
  }

  async saveImage() {
    if (this._imageBlob) {
      await this.uploadImage(this.user.id_usuario, this._imageBlob);
    }
  }

}
