import { Component, OnInit, ViewChild } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';

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

  filtreRendu: string = 'Tous';
  

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
      console.log(this.dataSource);
      
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
      this.applyFilter();
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


  ondeletedAssignment(event:Assignment){
    this.assignments.forEach((item,index)=>{
      if(item===event) this.assignments.splice(index,1);
    });
  this.assignementSelectionne != null
  }

  addAssignment(){
    this.router.navigate(['/add']);
  }

  Filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    // Custom filter predicate to search across multiple fields
    this.dataSource.filterPredicate = (data: Assignment, filter: string) => {
      const searchString = filter.toLowerCase();
      const formattedDate = new Date(data.dateDeRendu).toLocaleDateString('en-GB'); // Change the locale as per your date format
  
      return (
        data.nom.toLowerCase().includes(searchString) ||  // Search in 'nom' field
        data.id.toString().includes(searchString) ||      // Search in 'id' field
        data.matiere.toLowerCase().includes(searchString) ||      // Search in 'matiere' field
        formattedDate.includes(searchString) || // Search in formatted date field
        (data.rendu ? 'rendu' : 'non rendu').includes(searchString)||
        data.auteur.toLowerCase().includes(searchString)    // Search in 'auteur' field
         // Search in 'rendu' field
        // Add more conditions for other fields if needed
      );
    };
  
    this.dataSource.filter = filterValue;
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  applyFilter() {
    this.dataSource.filterPredicate = (data: Assignment, filter: string) => {
      const renduText = data.rendu ? 'Rendu' : 'Non Rendu';
      return this.filtreRendu === 'Tous' || renduText === this.filtreRendu;
    };
  
    this.dataSource.filter = 'activate'; // To trigger the filtering process
  }

  goToPage(pageNumber: number) {
    this.paginator.pageIndex = pageNumber - 1;
  }
  
  
}
