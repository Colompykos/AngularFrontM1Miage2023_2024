import { AssignmentsService } from 'src/app/shared/assignments.service';
import { MatiereService } from 'src/app/shared/matieres.service';
import { Component } from '@angular/core';
import { Assignment, Matiere } from '../assignment.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent {
  assignment: Assignment;
  nomAssignment:string;
  dateDeRendu:Date;
  matiere:string;
  note:number;
  remarques:string;
  auteur:string;

  matieres: Matiere[] = [];

  ngOnInit():void{
    this.matiereService.getMatieres().subscribe((matieres) => {
      this.matieres = matieres;
      this.getAssignment();

      
    });

    
  }
  

  constructor(private assignmentsService:AssignmentsService,
             private route: ActivatedRoute,
             private router: Router,
             private matiereService: MatiereService
 ){}

  onSaveAssignment(){
    // event.preventDefault();

    if (!this.assignment) return;

    // on récupère les valeurs dans le formulaire
    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu;
    console.log(this.assignment.matiere);
    this.assignment.matiere = this.assignment.matiere;
    console.log(this.assignment.matiere);
    this.note = this.note > 20 ? 20 : this.note;
    this.assignment.note = this.note;
    this.assignment.remarques = this.remarques;
    this.assignment.auteur = this.auteur;
    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((reponse) => {
        console.log(reponse.message);
 
        // navigation vers la home page
        this.router.navigate(['/home']);
      });
      console.log(this.assignment.nom);
      //console.log(this.assignment.matiere);
  }

  getAssignment() {
    // on récupère l'id dans le snapshot passé par le routeur
    // le "+" force l'id de type string en "number"
    const id = +this.route.snapshot.params['id'];
   
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      if (!assignment) return;
      this.assignment = assignment;
      // Pour pré-remplir le formulaire
      this.nomAssignment = assignment.nom;
      this.dateDeRendu = assignment.dateDeRendu;
      this.matiere = assignment.matiere;
      this.note = assignment.note;
      this.remarques = assignment.remarques;
      this.auteur = assignment.auteur;
    });
  }
 



}
