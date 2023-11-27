import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DragDropModule, moveItemInArray} from '@angular/cdk/drag-drop';
import {Gallery} from "../../../../interfaces/Gallery";
import {ApiService} from "../../../services/api.service";

@Component({
  selector: 'app-admin-gallery',
  templateUrl: './admin-gallery.component.html',
  styleUrls: ['./admin-gallery.component.scss']
})
export class AdminGalleryComponent implements OnInit {
  @ViewChild("MainPhotoForm") MainPhotoForm?: ElementRef;
  @ViewChild("mainPhotoInput") mainPhotoInput?: ElementRef;
  photoForChange?: Gallery;
  photos: Gallery[] = [
    {
      id: 0,
      photo: "",
      idPosition: 0
    }
  ];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getGalleryItems();
  }

  // drop(event: СdkDragDrop<any>): void {
  drop(event: any): void {
    // moveItemInArray(event.container.data, event.previousIndex,event.currentIndex)

    // moveItemInArray(this.photos, event.previousIndex,event.currentIndex)
    console.log('event', event)
  }



  sortPhotos(photos: Gallery[]): Gallery[] {
    return photos.sort((n1, n2) => n1.idPosition - n2.idPosition)
  }

  dragover_handler(event: any): void {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  // сохранение новой позиции фото
  drop_handler(event: any): void {
    event.preventDefault();
    let startPosition: number, endPosition: number;
    // Получить id целевого элемента
    const data = event.dataTransfer.getData("application/my-app");
    startPosition = +event.target.id;
    endPosition = +data;
    if (startPosition && endPosition && (startPosition != endPosition)) {
      this.photos.forEach(elem => {
        if (elem.idPosition === startPosition) {
          elem.idPosition = endPosition;
        } else if (elem.idPosition === endPosition) {
          elem.idPosition = startPosition
        }
      })
      // сохранить новые позиции в БД
      this.apiService.changeGalleryItemPosition(this.photos).subscribe(res=> {
        this.sortPhotos(this.photos);
      })
    }
  }

  dragstart_handler(event: any): void {
    event.dataTransfer.setData("application/my-app", event.target.id);
    event.dataTransfer.effectAllowed = "move";
  }

  savePhoto(): void {
    if (this.MainPhotoForm) {
      this.apiService.saveFile(this.MainPhotoForm.nativeElement)
        .then(answer => {
          if (answer.message === "File uploaded successfully") {
            console.log("answer.data.url", answer.data.url);
            if (this.photoForChange) {
              this.changePhotoItem(this.photoForChange, answer.data.url);
            } else {
              this.saveNewPhotoItem(answer.data.url);
            }
          } else {
            alert("Помилка при заватаженні файла")
            console.error('answer', answer);
          }
        })
    }
  }

  deletePhoto(photo: Gallery): void {
    let data = {
      filePath: photo.photo
    }
    this.apiService.deleteFile(data).subscribe(res=> {
      this.apiService.deleteGalleryItem(photo.id).subscribe(res=> {
        this.getGalleryItems();
      })
    })
  }

  setPhotoForChange(photo: Gallery): void {
    this.photoForChange = photo;
    this.mainPhotoInput?.nativeElement.click();
  }

  resetPhotoForChange(): void {
    this.photoForChange = undefined;
    this.mainPhotoInput?.nativeElement.click();
  }

  saveNewPhotoItem(photoUrl: string):void {
    let data = {
      photo: '',
      idPosition: 1,
    }
    if (this.photos && this.photos.length) {
      let idPosition = 1;
      // позиционируем фотографию как последнюю в списке
      for (let key in this.photos) {
        if (this.photos[key].idPosition > idPosition) {
          data.idPosition = this.photos[key].idPosition + 1;
        }
      }
    }
    data.photo = photoUrl;
    this.apiService.addGalleryItem(data).subscribe( req => {
      this.getGalleryItems();
    })
  }

  changePhotoItem(photo: Gallery, photoUrl: string):void {
    let data:Gallery = photo;
    data.photo = photoUrl;
    this.apiService.changeGalleryItem(data).subscribe( res => {
      this.getGalleryItems();
    })
  }

  getGalleryItems(): void {
    this.apiService.getGallery().subscribe(items => {
      this.photos = items;
      this.sortPhotos(this.photos);
    })
  }
}
