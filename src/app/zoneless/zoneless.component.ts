import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'app-zoneless',
  imports: [],
  templateUrl: './zoneless.component.html',
  styleUrl: './zoneless.component.css'
})
export class ZonelessComponent implements DoCheck {
  users = [];
  userId = 0;

  
  ngDoCheck(): void {
    console.log('ngDoCheck called');
  }
}
