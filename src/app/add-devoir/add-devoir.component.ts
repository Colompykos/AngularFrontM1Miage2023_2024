import { Component } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';

@Component({
  selector: 'app-add-devoir',
  templateUrl: './add-devoir.component.html',
  styleUrls: ['./add-devoir.component.css']
})
export class AddDevoirComponent {

  ajoutActive : boolean = false;
  
  nomDevoir:string = "";
  datedeRendu:Date = new Date('2023-01-01');
  rendu:boolean=false
  assignments = [
    {
      nom: "Devoir Angular à rendre",
      dateDeRendu: new Date('2021-03-01'),
      rendu: true
    },
    {
      nom: "Devoir Java à rendre",
      dateDeRendu: new Date('2023-03-05'),
      rendu: false
    },
    {
      nom: "Devoir gestion de projet à rendre",
      dateDeRendu: new Date('2021-03-10'),
      rendu: false
    }];

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.ajoutActive=true
    }, 1000);
  }
  onSubmit(e:any){
    // console.log('submitted');
    // console.log(this.nomDevoir);
    // console.log(this.dateDeRendu);

    const newAss:Assignment = new Assignment()
    newAss.nom = this.nomDevoir;
    newAss.dateDeRendu = this.datedeRendu;
    newAss.rendu=this.rendu

    this.assignments.push(newAss)
  }

}
