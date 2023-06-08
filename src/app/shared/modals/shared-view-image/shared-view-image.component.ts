import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shared-view-image',
  templateUrl: './shared-view-image.component.html',
  styleUrls: ['./shared-view-image.component.scss']
})
export class SharedViewImageComponent implements OnInit {

  @Input() fileUrl: any;

  constructor(
    public activeModal: NgbActiveModal,
    ) { }

  ngOnInit(): void {
  }

}
