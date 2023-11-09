import { Assignment } from './../assignments/assignment.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  constructor(private loggingService:LoggingService) { }

  
  assignments:Assignment[] = [
    {
      nom: 'Devoir Angular à rendre',
      dateDeRendu: new Date('2021-03-01'),
      rendu: true,
    },
    {
      nom: 'Devoir Java à rendre',
      dateDeRendu: new Date('2023-03-05'),
      rendu: false,
    },
    {
      nom: 'Devoir gestion de projet à rendre',
      dateDeRendu: new Date('2021-03-10'),
      rendu: false,
    },
  ];

  getAssignments(): Observable<Assignment[]>{
   return of(this.assignments); 
  }

  addAssignment(assignment:Assignment):Observable<string>{
    this.assignments.push(assignment);
    this.loggingService.log(assignment.nom, "ajouté")
    return of ('Assignment ajouté')
  }

  updateAssignment(assignment:Assignment):Observable<string>{
    const index = this.assignments.findIndex(a => a.nom === assignment.nom);
    this.assignments[index] = assignment;
    this.loggingService.log(assignment.nom, "modifié")

    return of ('Assignment modifié')
  }

  deleteAssignment(assignment:Assignment):Observable<string>{
    const index = this.assignments.indexOf(assignment)
    this.assignments.splice(index,1);

    this.loggingService.log(assignment.nom, "supprimé")
    return of ('Assignment supprimé') 

  }
}
