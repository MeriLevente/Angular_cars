import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarModel } from './car.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { 
  }

  apiUrl = 'https://caroftheyear2023.jedlik.cloud';

  getManus() : Observable<{id: number, name: string}[]> {
    return this.http.get<{id: number, name: string}[]>(`${this.apiUrl}/api/manufacturers`);
  }

  getCars(id: string): Observable<CarModel[]> {
    return this.http.get<CarModel[]>(`${this.apiUrl}/api/cars/${id}`)
  }

  postVote(vote: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/vote`, vote)
  }

}
