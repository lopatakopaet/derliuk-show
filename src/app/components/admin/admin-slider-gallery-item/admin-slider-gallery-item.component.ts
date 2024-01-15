import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {GallerySlider} from "../../../../interfaces/gallerySlider";
import {ApiService} from "../../../services/api.service";

@Component({
  selector: 'app-admin-slider-gallery-item',
  templateUrl: './admin-slider-gallery-item.component.html',
  styleUrls: ['./admin-slider-gallery-item.component.scss']
})
export class AdminSliderGalleryItemComponent implements OnInit {
  @Output() updateSliderItems = new EventEmitter();
  @Input() slide: GallerySlider = {
    photo: '',
    youtubeLink: '',
    id: 0,
    indicator: '',
    idPosition: 0,
    tableName: ''
  };
  @Input() indicator?: number | string;
  @ViewChild('SlideForm') SlideForm: ElementRef<HTMLDivElement> | undefined;
  @ViewChild("MainPhotoForm") MainPhotoForm?: ElementRef;
  imageSrc?: string;

  constructor(private apiService: ApiService,) { }

  ngOnInit(): void {

  }

  // getSliderGalleryItems(): void {
  //   if (this.indicator) {
  //     this.apiService.getSliderGalleryItems(this.indicator).subscribe({
  //       next: (v) => {
  //         this.commentsService.changeComments$(v)
  //         this.updateSlider.emit()
  //       },
  //       error: (e) => {
  //       },
  //       complete: () => {}
  //     })
  //   }
  //
  // }

  updateGalleryItems(): void {
    this.updateSliderItems.emit();
  }

  addSliderGalleryItem(): void {
    this.apiService.addSliderGalleryItem(this.slide).subscribe({
      next: (v) => {
        this.updateGalleryItems();
        alert('Слайд додано')
      },
      error: (e) => {
        this.updateGalleryItems();
        console.error('err', e);
        alert('Не вдалося додати слайд')
      },
      complete: () => {}
    })
  }

  changeSliderGalleryItem(): void {
    this.apiService.changeSliderGalleryItem(this.slide).subscribe({
      next: (v) => {
        this.updateGalleryItems();
        alert('Слайд змінено')
      },
      error: (e) => {
        this.updateGalleryItems();
        console.error('err', e);
        alert('Не вдалося змінити слайд')
      },
      complete: () => {}
    })
  }

  saveSlide(): void {
    if (this.slide){
      // @ts-ignore
      this.slide.youtubeLink = this.SlideForm?.nativeElement.querySelector('.youtube-link')?.value || "";
      this.slide.indicator = this.indicator;
    }
    if (!this.imageSrc && !this.slide.photo) {
      alert('Необхідно додати фото');
      return;
    }
    // если загрузили новое фото
    if (this.MainPhotoForm && this.imageSrc) {
      let addSlide = confirm('Додати/Змінити слайд?');
      if (addSlide) {
        this.apiService.saveFile(this.MainPhotoForm.nativeElement)
          .then(answer => {
            if (answer.message === "File uploaded successfully") {
              this.slide.photo = answer.data.url;
              // если это добавление нового комментария
              if (!this.slide?.id) {
                this.addSliderGalleryItem();
              }
              // если то изменение комментария
              else if (this.slide?.id) {
                this.changeSliderGalleryItem();
              }
            } else {
              alert("Помилка при заватаженні файла")
              console.error('answer', answer);
            }
          })
      }
    } else if (!this.imageSrc && this.slide?.id) {
      let isChangeSlide = confirm('Змінити слайд?');
      if (isChangeSlide) {
        this.changeSliderGalleryItem();
      }
    }
  }

  deleteSliderGalleryItem(): void {
    let data = {
      id: this.slide.id || 0
    }
    let delComment = confirm('Видалити слайд?');
    if (delComment) {
      if (this.slide.id) {
        this.apiService.deleteFile({filePath: this.slide.photo}).subscribe({
          next: (v) => {
            this.apiService.deleteSliderGalleryItem(data).subscribe({
              next: (v) => {
                this.updateGalleryItems();
                alert('Слайд видалено')
              },
              error: (e) => {
                this.updateGalleryItems();
                console.error('err', e);
                alert('Не вдалося видалити слайд')
              },
              complete: () => {}
            })
          },
          error: (e) => {
            this.apiService.deleteSliderGalleryItem(data).subscribe({
              next: (v) => {
                this.updateGalleryItems();
                alert('Слайд видалено')
              },
              error: (e) => {
                this.updateGalleryItems();
                console.error('err', e);
                alert('Не вдалося видалити слайд')
              },
              complete: () => {}
            })
          },
          complete: () => {}
        })
      } else {
        this.updateGalleryItems();
      }
    }
  }
  // превью фото
  readURL(event: Event, elem: HTMLInputElement): void {

    if (!elem.value) {
      this.imageSrc = "";
      return
    }
    // @ts-ignore
    if (event.target.files && event.target.files[0]) {
      // @ts-ignore
      const file = event.target.files[0];

      const reader = new FileReader();
      // @ts-ignore
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }
  }
}
