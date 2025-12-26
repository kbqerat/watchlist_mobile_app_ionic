import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MovieApiService {
  private http = inject(HttpClient);

  search(title: string) {
    // API TVMaze : Gratuite, pas besoin de clé !
    return this.http.get<any[]>(
      `https://api.tvmaze.com/search/shows?q=${title}`
    );
  }
}
