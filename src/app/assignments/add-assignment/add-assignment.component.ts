import { Component} from '@angular/core';
import { Assignment, Matiere } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { MatiereService } from 'src/app/shared/matieres.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})


export class AddAssignmentComponent {
  matieres: Matiere[] = [];
  // ...

  constructor( private _formBuilder: FormBuilder, private assignmentsService:AssignmentsService, private router:Router, private matiereService: MatiereService, private toastr: ToastrService){}
  auteur:string = "";
  matiere: string;
  nomDevoir:string = "";
  datedeRendu!: Date;
  note!:number;
  remarques:string = "";
  rendu!:boolean;
  id:number

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;

  ngOnInit() {
    
    this.matiereService.getMatieres().subscribe((matieres) => {
      this.matieres = matieres;
    this.assignmentsService.getNewId().subscribe((newId) => {
      this.id = newId;
      });
    });

    this.firstFormGroup = this._formBuilder.group({
      nomDevoir: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      auteur: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      matiere: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      remarques: ['']
    });
    this.fifthFormGroup = this._formBuilder.group({
      datedeRendu: ['',Validators.required]
    });
    
  }
  onSubmit(e:any){

    const newAss: Assignment = new Assignment();
    newAss.id = this.id;
    newAss.nom = this.firstFormGroup.get('nomDevoir').value;
    newAss.auteur = this.secondFormGroup.get('auteur').value;
    newAss.matiere = this.thirdFormGroup.get('matiere').value;
    newAss.dateDeRendu = this.fifthFormGroup.get('datedeRendu').value;
    newAss.note = this.note;
    newAss.remarques = this.fourthFormGroup.get('remarques').value;
    newAss.rendu = this.rendu;

    console.log(newAss);
    
    this.assignmentsService.addAssignment(newAss)
      .subscribe((reponse) => {
        console.log(reponse.message);
        this.router.navigate(['home']);
        this.toastr.success("Your work has been added", "", {
          timeOut: 3500
        });
      });
  }
  
}
