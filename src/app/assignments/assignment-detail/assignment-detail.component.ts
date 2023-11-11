import { Component, EventEmitter, /*Input*/ OnInit, Output } from '@angular/core';
import { Assignment } from './../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})
export class AssignmentDetailComponent implements OnInit{

  // @Input() assignmentTransmis!:Assignment;
  assignmentTransmis:Assignment;
  // @Output() deletedAssignment = new EventEmitter<Assignment>();

  checked:boolean = false;


  constructor(private assignmentsService :AssignmentsService,
              private route:ActivatedRoute,
              private router:Router) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params["id"];
    this.assignmentsService.getAssignment(id)
    .subscribe(ass=>this.assignmentTransmis=ass);
  }

  onAssignmentRendu(){
    this.assignmentTransmis.rendu = true
    this.assignmentsService.updateAssignment(this.assignmentTransmis)
    .subscribe((message)=> console.log(message));
    this.assignmentTransmis=null;
    this.router.navigate(["home"])
  }

  onDelete(){
    this.assignmentsService.deleteAssignment(this.assignmentTransmis)
    .subscribe((message)=> console.log(message));
    this.assignmentTransmis=null;

    this.router.navigate(["home"])
  }

}
