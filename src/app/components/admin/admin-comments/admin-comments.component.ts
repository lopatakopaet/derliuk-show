import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Comment} from "../../../../interfaces/Comment";
import {ApiService} from "../../../services/api.service";
import {CommentsService} from "../../../services/comments.service";
@Component({
  selector: 'app-admin-comments',
  templateUrl: './admin-comments.component.html',
  styleUrls: ['./admin-comments.component.scss']
})
export class AdminCommentsComponent implements OnInit {
  tableName: string = 'comments';
  @Output() updateSlider = new EventEmitter();
  @Input() comment: Comment = {
    id: 0,
    photo: "",
    name: "",
    date: "",
    rating: 5,
    comment: "",
    tableName: ""
  };
  @Input() showALll: boolean = false;
  @ViewChild('commentElem') commentElem: ElementRef<HTMLDivElement> | undefined;
  @ViewChild('CommentForm') CommentForm: ElementRef<HTMLDivElement> | undefined;
  @ViewChild("MainPhotoForm") MainPhotoForm?: ElementRef;

  imageSrc?: string;
  public innerWidth: any;
  public elemOffsetHeight: any;


  constructor(private apiService: ApiService,
              private commentsService: CommentsService) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }
  ngAfterViewInit(): void {
    setTimeout(()=> {
      this.elemOffsetHeight = this.commentElem?.nativeElement.offsetHeight;
    }, 0)
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    this.elemOffsetHeight = this.commentElem?.nativeElement.offsetHeight;
  }

  getComments(): void {
    this.apiService.getComments(this.tableName).subscribe({
      next: (v) => {
        this.commentsService.changeComments$(v)
        this.updateSlider.emit()
      },
      error: (e) => {
      },
      complete: () => {}
    })
  }

  addComment(): void {
    this.apiService.addComment(this.comment).subscribe({
      next: (v) => {
        this.getComments();
        alert('Коментар додано')
      },
      error: (e) => {
        this.getComments();
        console.error('err', e);
        alert('Не вдалося додати коментар')
      },
      complete: () => {}
    })
  }

  changeComment(): void {
    this.apiService.changeComment(this.comment).subscribe({
      next: (v) => {
        this.getComments();
        alert('Коментар змінено')
      },
      error: (e) => {
        this.getComments();
        console.error('err', e);
        alert('Не вдалося змінити коментар')
      },
      complete: () => {}
    })
  }

  saveComment(): void {
    if (this.comment){
      this.comment.comment = this.CommentForm?.nativeElement.querySelector('.comment')?.innerHTML || "";
      this.comment.name = this.CommentForm?.nativeElement.querySelector('.comment-name')?.innerHTML || "";
      this.comment.date = this.CommentForm?.nativeElement.querySelector('.comment-date')?.innerHTML || "";
      this.comment.rating = this.CommentForm?.nativeElement.querySelector('.comment-rating')?.innerHTML || "";
      this.comment.tableName = this.tableName;
    }
    if (!this.imageSrc && !this.comment.photo) {
      alert('Необхідно додати фото');
      return;
    }
   // если загрузили новое фото
    if (this.MainPhotoForm && this.imageSrc) {
      let addComment = confirm('Додати/Змінити коментар?');
      if (addComment) {
        this.apiService.saveFile(this.MainPhotoForm.nativeElement)
          .then(answer => {
            if (answer.message === "File uploaded successfully") {
              this.comment.photo = answer.data.url;
              // если это добавление нового комментария
              if (!this.comment?.id) {
                  this.addComment();
              }
              // если то изменение комментария
              else if (this.comment?.id) {
                this.changeComment();
              }
            } else {
              alert("Помилка при заватаженні файла")
              console.error('answer', answer);
            }
          })
      }
    } else if (!this.imageSrc && this.comment?.id) {
      let isChangeComment = confirm('Змінити коментар?');
      if (isChangeComment) {
        this.changeComment();
      }
    }
  }

  deleteComment(): void {
    let data = {
      tableName: this.tableName,
      id: this.comment.id || 0
    }
    let delComment = confirm('Видалити коментар?');
    if (delComment) {
      if (this.comment.id) {
        this.apiService.deleteFile({filePath: this.comment.photo}).subscribe({
          next: (v) => {
            this.apiService.deleteComment(data).subscribe({
              next: (v) => {
                this.getComments();
                alert('Коментар видалено')
              },
              error: (e) => {
                this.getComments();
                console.error('err', e);
                alert('Не вдалося видалити коментар')
              },
              complete: () => {}
            })
          },
          error: (e) => {
            this.apiService.deleteComment(data).subscribe({
              next: (v) => {
                this.getComments();
                alert('Коментар видалено')
              },
              error: (e) => {
                this.getComments();
                console.error('err', e);
                alert('Не вдалося видалити коментар')
              },
              complete: () => {}
            })
          },
          complete: () => {}
        })
      } else {
        this.getComments();
      }


    }
  }

  onSlideChange() {
    console.log('slide change');
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
