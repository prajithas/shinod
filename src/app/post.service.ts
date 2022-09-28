import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  //private url="https://shinod.in/wp-json/wp/v2/posts?page=1&per_page=6";
  constructor(private httpClient:HttpClient) { }
  getPosts(_url: string,noofpages: number){
    _url=_url+'?page=1&per_page='+noofpages;
    //console.log(_url)
    return this.httpClient.get(_url).pipe(retry(2), catchError(this.handleError));
  }
  getPostsByCategory(_url: string,noofpages: number,category:string){
    _url=_url+'?categories='+category+'&page=1&per_page='+noofpages;
   
    return this.httpClient.get(_url).pipe(retry(2), catchError(this.handleError));
  }
  getPostsByTag(_url: string,noofpages: number,tag:string){
    _url=_url+'?tags='+tag+'&page=1&per_page='+noofpages;
   
    return this.httpClient.get(_url).pipe(retry(2), catchError(this.handleError));
  }
  private _url(_url: any) {
    throw new Error('Method not implemented.');
  }
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
  nextUser(page:any) {
    return this.httpClient.get(`https://shinod.in/wp-json/wp/v2/posts?page=${(page)}&per_page=6`)
      .pipe(retry(2), catchError(this.handleError));
  }
  previousUser(page:any) {
    return this.httpClient.get(`https://shinod.in/wp-json/wp/v2/posts?page=${(page)}&per_page=6`)
      .pipe(retry(2), catchError(this.handleError));
  }
  getPostById(postId:any): Observable<any>{
    return this.httpClient.get('https://shinod.in/wp-json/wp/v2/posts/'+postId).pipe(retry(2), catchError(this.handleError));
  }
  getCategoryNameById(categoryId:any){
    return this.httpClient.get('https://shinod.in/wp-json/wp/v2/categories/'+categoryId);

  }
  getTagNameById(tagId:any): Observable<any>{
    return this.httpClient.get<any>('https://shinod.in/wp-json/wp/v2/tags/'+tagId).pipe(retry(2),catchError(this.handleError));
  }
  getCategory(_url: string){ console.log('service ' + _url)
    return this.httpClient.get(_url);

  }
  getPageById(_url:string,page:any): Observable<any>{
    _url=_url+page;
    
    return this.httpClient.get(_url);
  }
}
