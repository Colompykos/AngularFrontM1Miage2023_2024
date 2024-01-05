import { Assignment } from './../assignments/assignment.model';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  constructor(
    private loggingService: LoggingService,
    private http: HttpClient
  ) {}

   url = 'http://localhost:8010/api/assignments';
   //url = 'https://back-end-m1miage2023-2024-colompykos.onrender.com/api/assignments';

  assignments: Assignment[] = [];
  private idCounter:any

  getAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.url);
    //  return of(this.assignments);
  }

  getNewId(): Observable<number> {
    return new Observable<number>(subscriber => {
      this.http.get<number>(this.url + "/lastid").subscribe(id => {
        this.idCounter = id;
        console.log(this.idCounter);
        subscriber.next(this.idCounter + 1);
      });
    });
  }

  getAssignment(id: number): Observable<Assignment> {
    return this.http.get<Assignment>(this.url + '/' + id).pipe(catchError(this.handleError<any>(('### catchError: getAssignments by id avec id=' + id))));
    // return of (this.assignments.find(ass=>ass.id===id));
  }

  addAssignment(assignment: Assignment): Observable<any> {
    // this.assignments.push(assignment);
    // return of ('Assignment ajouté')
    this.loggingService.log(assignment.nom, 'ajouté');
    return this.http.post<Assignment>(this.url, assignment);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    // const index = this.assignments.findIndex(a => a.nom === assignment.nom);
    // this.assignments[index] = assignment;
    // return of ('Assignment modifié')
    this.loggingService.log(assignment.nom, 'modifié');
    return this.http.put<Assignment>(this.url, assignment);
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    // const index = this.assignments.indexOf(assignment)
    // this.assignments.splice(index,1);

    // return of ('Assignment supprimé')
    this.loggingService.log(assignment.nom, 'supprimé');
    return this.http.delete(this.url + '/' + assignment._id);
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);
 
      return of(result as T);
    }
 };
 
}
