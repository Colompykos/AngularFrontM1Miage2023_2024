export class Assignment{
    _id?:string;
    id:number;
    nom: string;
    auteur: string;
    matiere: string;
    dateDeRendu: Date;
    note:number;
    remarques:string;
    rendu:boolean;

}

export class Matiere{
    id:number;
    nom: string;
    professeur: string;
    image: string;
}