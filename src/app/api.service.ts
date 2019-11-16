import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiUrl = 'https://testapi.io/api/crimsonsunset/code-challenge-jobs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
    public getJobs(): any {
      try{
        return this.http.get(apiUrl);
      }catch{
        throw new Error('error');
      }
    }


}
