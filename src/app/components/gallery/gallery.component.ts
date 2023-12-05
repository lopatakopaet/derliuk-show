import { Component, OnInit } from '@angular/core';
import {Gallery} from "../../../interfaces/Gallery";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  photos?:Gallery[];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getGalleryItems();
  }

  getGalleryItems(): void {
    this.apiService.getGallery().subscribe(items => {
      this.photos = this.sortPhotos(items);
    })
  }

  sortPhotos(photos: Gallery[]): Gallery[] {
    return photos.sort((n1, n2) => n1.idPosition - n2.idPosition)
  }
}
