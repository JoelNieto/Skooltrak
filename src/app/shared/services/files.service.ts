import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class FilesService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'files/';
  }

  uploadFile(file: any) {
    const files = file.target.files as File[];
    return this.uploadFiles(files, this.url);
  }

  uploadFiles(files: File[], url: string) {
    if (files.length > 0) {
      const formData: FormData = new FormData();
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i], files[i].name);
      }
      return this.http.post<any>(url, formData);
    }
  }

  uploadAttachment(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<any>(this.url, formData);
  }

  getFile(id: string) {
    return `${this.url}${id}`;
  }

  deleteFile(id: string) {
    return this.http.delete(`${this.url}${id}`);
  }

  makeURL(id: string): string {
    return `${this.url}${id}`;
  }

  getBase64ImageFromURL(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      };
      img.onerror = (error) => {
        reject(error);
      };
      img.src = url;
    });
  }
}
