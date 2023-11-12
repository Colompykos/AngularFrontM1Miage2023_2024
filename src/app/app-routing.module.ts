import { LoginComponent } from './assignments/login/login.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { authGuard } from './shared/auth.guard';

const routes: Routes = [
  {path:'', component:AssignmentsComponent},
  {path:'home', component:AssignmentsComponent},
  {path:'add', component:AddAssignmentComponent},
  {path:'assignments/:id',component:AssignmentDetailComponent},
  {path:'log',component:LoginComponent},
  {path:'assignments/:id/edit',component:EditAssignmentComponent,canActivate:[authGuard]},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
