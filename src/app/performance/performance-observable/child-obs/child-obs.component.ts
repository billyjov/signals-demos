import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ChildObsService } from '../child-obs.service';

@Component({
  selector: 'app-child-obs',
  imports: [],
  templateUrl: './child-obs.component.html',
  styleUrl: './child-obs.component.css'
})
export class ChildObsComponent implements OnInit, OnDestroy {

  // Counter to signal in injection context
  childObsService = inject(ChildObsService);
  counter = this.childObsService.counter;

  ngOnInit(): void {
    console.log('ChildObsComponent initialized');
  }

  ngOnDestroy(): void {
    console.log('ChildObsComponent destroyed');
  }
}
