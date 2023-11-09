import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  constructor() {}

  log(assignmentName:string, action: any) {
    console.log("Log: l'assignment " + assignmentName + ' a été ' + action);
  }
}
