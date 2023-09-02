import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'correnet';
  fileToUpload: File | any;
  imageUrls: string[] = [];
  searchQuery: string = '';
  ngOnInit() {
    this.fetchImageUrls()
  }
  public imagesHtml = "";
  constructor(private http: HttpClient) { }
  onFileSelected(event: any) {
    this.fileToUpload = event.target.files[0];
  }
  uploadImage() {
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);

    this.http.post<any>('http://localhost:8080/api/images/upload', formData)
      .subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error('There was an error during the upload: ', error);
      }
    );

  }
  updateImagesHtml() {
    this.imagesHtml = this.imageUrls.map(url => `<img src="${url}" alt="Uploaded Image">`).join('');
    console.log(this.imagesHtml);
  }
  fetchImageUrls() {
    this.http.get<string[]>('http://localhost:8080/api/images/urls')
      .subscribe(urls => {
        this.imageUrls = urls;
        this.updateImagesHtml();
      }, error => {
        console.log('Error fetching image URLs:', error);
      });
  }

  searchImages() {
    this.http.get<string[]>(`http://localhost:8080/api/images/search?query=${this.searchQuery}`)
      .subscribe(urls => {
        this.imageUrls = urls;
      }, error => {
        console.log('Error fetching image URLs:', error);
      });
  }
}
