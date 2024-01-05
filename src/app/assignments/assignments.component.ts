import { Component, OnInit, ViewChild } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit{
  @ViewChild(MatPaginator)  paginator : MatPaginator
  @ViewChild(MatSort)  sort : MatSort

  dataSource:MatTableDataSource<Assignment>
  posts:any

  
  ajoutActive: boolean = false;

  nomDevoir: string = '';

  auteur : string = '';

  matiere : string = '';

  datedeRendu: Date = new Date('2023-01-01');

  note: number = 0;

  remarques: string = '';

  rendu: boolean = false;

  assignementSelectionne!: Assignment;

  // formVisible = false;

  assignments!:Assignment[]

  isConnected: boolean=false;
  

  constructor(private assignmentsService: AssignmentsService,
    public authService:AuthService,
    private router:Router) {}
    
  ngOnInit(): void {
    //  this.assignments = this.assignmentsService.getAssignments();
    this.getAssignments()
    
    setTimeout(() => {
      this.ajoutActive = true;
    }, 3000);

  }
  getAssignments(){
    this.assignmentsService.getAssignments().subscribe((assignments) => {
      this.assignments = assignments;
      this.posts=this.assignments
      this.dataSource = new MatTableDataSource(this.posts)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    });


  }



  onSubmit(e: any) {
    // console.log('submitted');
    // console.log(this.nomDevoir);
    // console.log(this.dateDeRendu);

    const newAss: Assignment = new Assignment();
    newAss.nom = this.nomDevoir;
    newAss.dateDeRendu = this.datedeRendu;
    newAss.rendu = this.rendu;
    newAss.auteur = this.auteur;
    newAss.matiere = this.matiere;
    newAss.note = this.note;
    newAss.remarques = this.remarques;
    
    

    this.assignments.push(newAss);
  }

  assignmentClique(assignment: Assignment) {
    // console.log("clicked");
    this.assignementSelectionne = assignment;
  }

  onAddAssignmentBtnClick() {
    // this.formVisible = true;
  }

  // onNouvelAssignement(event: Assignment) {
  //   // this.assignments.push(event);
  //   this.assignmentsService.addAssignment(event)
  //   .subscribe((message) => console.log(message));

  //   // this.formVisible=false;
    
  // }

  ondeletedAssignment(event:Assignment){
    this.assignments.forEach((item,index)=>{
      if(item===event) this.assignments.splice(index,1);
    });
  this.assignementSelectionne != null
  }

  addAssignment(){
    this.router.navigate(['/add']);
  }

}
