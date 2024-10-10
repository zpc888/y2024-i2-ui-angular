import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Opportunity, SearchCriteria} from "./opportunity";
import {catchError, Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OpportunityService {
  private opportunityUrl = 'http://localhost:8080/opportunities';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  search(criteria: SearchCriteria): Observable<Opportunity[]> {
    const queryParams = this.toQueryParams(criteria);
    return this.http.get<Opportunity[]>(this.opportunityUrl + queryParams, this.httpOptions)
      .pipe(
        tap((opportunities: Opportunity[]) => {this.log("opportunity search returns " + opportunities.length + " record(s)")}),
        catchError(this.handleError<Opportunity[]>("search opportunity: " + JSON.stringify(criteria)))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(operation + " failed: " + error.message);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }

  toQueryParams(criteria: SearchCriteria): string {
    if (criteria.searchType === 'all') {
      return '';
    }
    if (criteria.searchType === 'byType') {
      return '?type=' + criteria.byTypeValue;
    }
    if (criteria.searchType === 'byRange') {
      if (criteria.byRangeMin) {
        let ret = '?min=' + criteria.byRangeMin;
        if (criteria.byRangeMax) {
          ret = ret + '&max=' + criteria.byRangeMax;
        }
        return ret;
      } else {
        return '?max=' + criteria.byRangeMax;
      }
    }
    // both type and range
    let ret = '?type=' + criteria.byTypeValue;
    if (criteria.byRangeMin) {
      ret = ret + '&min=' + criteria.byRangeMin;
    }
    if (criteria.byRangeMax) {
      ret = ret + '&max=' + criteria.byRangeMax;
    }
    return ret;
  }
}
