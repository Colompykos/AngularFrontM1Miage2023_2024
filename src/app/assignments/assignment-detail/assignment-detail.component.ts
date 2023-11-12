import { LoggingService } from './../../shared/logging.service';
import { AuthService } from './../../shared/auth.service';
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
 
  constructor(private assignmentsService :AssignmentsService,
              private route:ActivatedRoute,
              private router:Router,
              public authService:AuthService) {}

  // @Input() assignmentTransmis!:Assignment;
  assignmentTransmis:Assignment;
  // @Output() deletedAssignment = new EventEmitter<Assignment>();

  checked:boolean = false;

  

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

  onClickEdit(){
    this.router.navigate(['assignments',this.assignmentTransmis.id,'edit'])
  }

  isAdmin(){
    return this.authService.IsAdmin();
  }


}
