import { Component, Input, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { TicketInventory } from 'src/app/shared/core/models/app-ticket';

@Component({
  selector: 'app-private-save-lab-rad-note',
  templateUrl: './private-save-lab-rad-note.component.html',
  styleUrls: ['./private-save-lab-rad-note.component.scss']
})
export class PrivateSaveLabRadNoteComponent implements OnInit {

  @Input() ticketInventory: TicketInventory = {} as TicketInventory;

  constructor() { }

  editorConfig: AngularEditorConfig = {
    editable: this.ticketInventory.concludedDate ? false : true,
    spellcheck: true,
    height: '25rem',
    minHeight: '5rem',
  };

  ngOnInit(): void {
  }

}
