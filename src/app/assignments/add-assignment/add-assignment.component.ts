import { Component, OnInit/*EventEmitter, Output*/ } from '@angular/core';
import { Assignment, Matiere } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { MatiereService } from 'src/app/shared/matieres.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})


export class AddAssignmentComponent {
  matieres: Matiere[] = [];
  // ...

  constructor( private assignmentsService:AssignmentsService, private router:Router, private matiereService: MatiereService){}
  auteur:string = "";
  matiere: string;
  nomDevoir:string = "";
  datedeRendu!: Date;
  note!:number;
  remarques:string = "";
  rendu!:boolean;
  id:number

  ngOnInit() {
    this.matiereService.getMatieres().subscribe((matieres) => {
      this.matieres = matieres;
    this.assignmentsService.getNewId().subscribe((newId) => {
      this.id = newId;
      });
    });
    
  }
  onSubmit(e:any){
    e.preventDefault();
    // console.log('submitted');
    // console.log(this.nomDevoir);
    // console.log(this.dateDeRendu);

    const newAss: Assignment = new Assignment();
    newAss.id = this.id;
    newAss.nom = this.nomDevoir;
    newAss.auteur = this.auteur;
    newAss.matiere = this.matiere;
    newAss.dateDeRendu = this.datedeRendu;
    newAss.note = this.note;
    newAss.remarques = this.remarques;
    newAss.rendu = this.rendu;
    console.log(newAss);
    this.assignmentsService.addAssignment(newAss)
      .subscribe((reponse) => {
        console.log(reponse.message);
        this.router.navigate(['home']);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been added",
          showConfirmButton: false,
          timer: 1500
        });

      });

  }
  
}
