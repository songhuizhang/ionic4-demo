import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { MediaCapture, MediaFile, CaptureError, CaptureAudioOptions } from '@ionic-native/media-capture/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  base64Image;
  mp3;
  file;
  constructor(private camera: Camera, private mediaCapture: MediaCapture, private media: Media) { }

  useCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.base64Image = imageData;
    }, (err) => {
      console.log(err);
      // Handle error
    });
  }

  useMdeia() {
    const options: CaptureAudioOptions = { limit: 1 , duration : 60};
    this.mediaCapture.captureAudio(options)
      .then(
        (data: MediaFile[]) => {
          console.log(data);
          this.mp3 = data;
          this.createMedia(data[0].fullPath);
        },
        (err: CaptureError) => console.error(err)
      );
  }
  createMedia(data) {
    this.file = this.media.create(data);
  }
  playMedia() {
    this.file.play();
  }
  pauseMedia() {
    this.file.pause();
  }

}
