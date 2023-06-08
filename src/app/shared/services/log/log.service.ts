import { Injectable } from '@angular/core';

interface LogMessage {
  message:string;
  timestamp:Date;
}


@Injectable({
  providedIn: 'root'
})
export class LogService {
  callStack:LogMessage[] = [];

  constructor() { }

  addLog(message:string):void {
      // prepend new log to bottom of stack
      this.callStack = [{ message, timestamp: new Date() }].concat(this.callStack);
  }

  clear():void {
      // clear stack
      this.callStack = [];
  }

  printHead():void {
      // print bottom of stack
      console.log(this.callStack[0] || null);
  }

  printLog():void {
      // print bottom to top of stack on screen
      this.callStack.reverse().forEach((logMessage) => console.log(logMessage));
  }

  getLog():LogMessage[] {
      // return the entire log as an array
      return this.callStack.reverse();
  }
}
