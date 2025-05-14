import { Component, computed, linkedSignal, signal } from '@angular/core';
import { ListComponent } from './list/list.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { FormsModule } from '@angular/forms';

export interface Car {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-component-list',
  imports: [ListComponent, SearchInputComponent, FormsModule],
  templateUrl: './component-list.component.html',
  styleUrl: './component-list.component.css',
})
export class ComponentListComponent {
  selectedCar = signal<Car | null>(null);
  // Option-1: use signal
  quantity = signal(1);

  // Option-2: use computed
  // quantity = computed(() => 1);

  // Option-3: use signal and computed
  // quantity = linkedSignal({
  //   source: this.selectedCar,
  //   computation: () => 1
  // });
  price = computed(() => this.selectedCar()?.price || 0);
  totalPrice = computed(() => this.price() * this.quantity());


  cars = signal<Car[]>([
    { id: 1, name: 'Audi', price: 50000 },
    { id: 2, name: 'BMW', price: 60000 },
    { id: 3, name: 'Mercedes', price: 70000 },
    { id: 4, name: 'Porsche', price: 80000 },
    { id: 5, name: 'Volkswagen', price: 40000 },
    { id: 6, name: 'Ford', price: 30000 },
    { id: 7, name: 'Chevrolet', price: 35000 },
    { id: 8, name: 'Toyota', price: 25000 },
    { id: 9, name: 'Honda', price: 20000 },
    { id: 10, name: 'Nissan', price: 22000 },
  ]);
}
