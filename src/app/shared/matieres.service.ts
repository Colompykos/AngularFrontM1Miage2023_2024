import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Matiere } from './../assignments/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {
  // apiUrl = 'http://localhost:8010/api/matieres'; // Remplacez par l'URL de votre API
  apiUrl = "https://back-end-m1miage2023-2024-colompykos.onrender.com/api/matieres";


  constructor(private http: HttpClient) { }

  getMatieres(): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(this.apiUrl);
  }

    getMatiere(id: number): Observable<Matiere> {
        return this.http.get<Matiere>(this.apiUrl + '/' + id);
    }

    addMatiere(matiere: Matiere): Observable<any> {
        return this.http.post<Matiere>(this.apiUrl, matiere);
    }

    updateMatiere(matiere: Matiere): Observable<any> {
        return this.http.put<Matiere>(this.apiUrl, matiere);
    }

    deleteMatiere(matiere: Matiere): Observable<any> {
        return this.http.delete(this.apiUrl + '/' + matiere.id);
    }

    addMatiereToAssignment(matiere: Matiere, assignmentId: number): Observable<any> {
        return this.http.put(this.apiUrl + '/' + matiere.id + '/addAssignment/' + assignmentId, {});
    }



}