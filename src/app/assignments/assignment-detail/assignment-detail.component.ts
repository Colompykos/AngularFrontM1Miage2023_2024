import { LoggingService } from './../../shared/logging.service';
import { AuthService } from './../../shared/auth.service';
import { Component, EventEmitter, /*Input*/ OnInit, Output } from '@angular/core';
import { Assignment, Matiere } from './../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { MatiereService } from 'src/app/shared/matieres.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})
export class AssignmentDetailComponent implements OnInit{

  selectedMatiere: Matiere;
  matieres: Matiere[] = [];
 
  constructor(private assignmentsService :AssignmentsService,
              private route:ActivatedRoute,
              private router:Router,
              public authService:AuthService,
              private matiereService: MatiereService,
              private toastr: ToastrService
              ) {}

  // @Input() assignmentTransmis!:Assignment;
  assignmentTransmis:Assignment;
  // @Output() deletedAssignment = new EventEmitter<Assignment>();

  checked:boolean = false;

  

  ngOnInit(): void {
    const id = +this.route.snapshot.params["id"];
    //this.assignmentsService.getAssignment(id)
     
    this.matiereService.getMatieres().subscribe((matieresFromDb) => {
      this.matieres = matieresFromDb;
      //this.matieres = matieresFromDb.filter(matiere => matiere.nom === this.assignmentTransmis.matiere);
    });
    this.assignmentsService.getAssignment(id)
    .subscribe(ass => {
    this.assignmentTransmis = ass;
    this.selectedMatiere = this.matieres.find(matiere => matiere.nom === this.assignmentTransmis.matiere);
  });


    }

  onAssignmentRendu(){
    this.assignmentTransmis.rendu = true
    this.assignmentsService.updateAssignment(this.assignmentTransmis)
    .subscribe((reponse)=>{
      console.log(reponse.message);
      this.router.navigate(["home"])
    });
  }

  onDelete(){
    this.assignmentsService.deleteAssignment(this.assignmentTransmis)
    .subscribe((reponse)=>{
      console.log(reponse.message);
      this.toastr.success("assignment deleted successfully", 'Deleted');
      this.router.navigate(["home"])
    });
    this.assignmentTransmis=undefined;
  }

  onClickEdit(){
    this.router.navigate(['assignments',this.assignmentTransmis.id,'edit'])
  }

  isAdmin(){
    return this.authService.IsAdmin();
  }


}
