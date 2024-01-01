import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Component } from '@angular/core';
import { Assignment } from '../assignment.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent {
  assignment: Assignment;
  nomAssignment:string;
  dateDeRendu:Date;

  ngOnInit():void{

    this.getAssignment();
  }
  

  constructor(private assignmentsService:AssignmentsService,
             private route: ActivatedRoute,
             private router: Router
 ){}

  onSaveAssignment(){
    // event.preventDefault();

    if (!this.assignment) return;

    // on récupère les valeurs dans le formulaire
    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((reponse) => {
        console.log(reponse.message);
        this.router.navigate(['/home']);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been modified",
          showConfirmButton: false,
          timer: 1500
        });
 
        // navigation vers la home page
      });
 
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
    });
  }
 



}
