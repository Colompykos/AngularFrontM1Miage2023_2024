import { Component, EventEmitter, Output } from '@angular/core';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent {

  @Output() nouvelAssignment =new EventEmitter<Assignment>();

  
  nomDevoir:string = "";
  
  datedeRendu!: Date;
  rendu!:boolean;


  onSubmit(e:any){
    // console.log('submitted');
    // console.log(this.nomDevoir);
    // console.log(this.dateDeRendu);

    const newAss:Assignment = new Assignment()
    newAss.nom = this.nomDevoir;
    newAss.dateDeRendu = this.datedeRendu;
    newAss.rendu=this.rendu;

    this.nouvelAssignment.emit(newAss);
  }

  
}
