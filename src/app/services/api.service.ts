import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PostComment } from '../models/PostComment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Define API
  BASE_URL = 'https://jsonplaceholder.typicode.com';

  HTTP_OPTIONS = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getComments(text: string, count: number): Observable<PostComment[]> {

    if (!text || text.length < 4  || count === 0) {
      return of(new Array<PostComment>());
    }

    return this.http.get<PostComment[]>(`${this.BASE_URL}/comments?q=${text}&_start=0&_limit=${count}`);
    // .pipe(
    //   // retry(1)
    // );
  }

}
