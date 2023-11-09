import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Assignment } from './../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})
export class AssignmentDetailComponent implements OnInit{

  @Input() assignmentTransmis!:Assignment;
  @Output() deletedAssignment = new EventEmitter<Assignment>();

  checked:boolean = false;


  constructor(private assignmentsService :AssignmentsService ) {}

  ngOnInit(): void {}

  onAssignmentRendu(){
    this.assignmentTransmis.rendu = true
    this.assignmentsService.updateAssignment(this.assignmentTransmis)
    .subscribe((message)=> console.log(message));
    this.assignmentTransmis=null;
  }

  onDelete(){
    this.assignmentsService.deleteAssignment(this.assignmentTransmis)
    .subscribe((message)=> console.log(message));
    this.assignmentTransmis=null;
  }

}
