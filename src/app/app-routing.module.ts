import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { authGuard } from './shared/auth.guard';
import { LoginComponent } from './log-sign/login/login.component';
import { RegisterComponent } from './log-sign/register/register.component';

const routes: Routes = [
  {path:'', component:AssignmentsComponent},
  {path:'home', component:AssignmentsComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'add', component:AddAssignmentComponent},
  {path:'assignments/:id',component:AssignmentDetailComponent},
  {path:'assignments/:id/edit',component:EditAssignmentComponent,canActivate:[authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
