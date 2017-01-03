import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class HelloService {

  constructor(private http: Http) {
  }

  get(): Observable<any> {
    return this.http.get('api/hello.txt')
      .map(response => response.json())
      .catch(this.handleErorr);
  }

  protected handleErorr(error: any): ErrorObservable<string> {
    const errorMsg = ( error.message ) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errorMsg);
  }
}
