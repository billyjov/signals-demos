import { JsonPipe } from '@angular/common';
import { Component, computed, Input, input, signal } from '@angular/core';

@Component({
  selector: 'app-list',
  imports: [JsonPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  // 💡Tip: use input() to get data from parent component
  // 💡Tip: always use typing
  searchTermFromSibling = input('', {
    transform: (elem: string) => elem.toLowerCase(),
  });

  myInput = input();
  @Input() myOldInput!: string;

  // 💡Forget about this
  // @Input({ transform: (elem: string) => elem.toLowerCase() })
  // userAtInput = '';

  //💡Tip: take care of typing carefully
  // usersInput = input<string[]>([], {
  //   // Results in a compilation error
  //   transform(value) {
  //     return Array.isArray(value) ? value : [value];
  //   },
  // });

  users = signal([
    { id: 1, name: 'Lukas Schneider' },
    { id: 2, name: 'Alena Müller' },
    { id: 3, name: 'Finn Wagner' },
    { id: 4, name: 'Leonie Becker' },
    { id: 5, name: 'Jonas Fischer' },
    { id: 6, name: 'Mia Hoffmann' },
    { id: 7, name: 'Ben Weber' },
    { id: 8, name: 'Emma Schäfer' },
    { id: 9, name: 'Noah Koch' },
    { id: 10, name: 'Sophie Wolf' },
  ]);

  filteredUsers = computed(() =>
    this.users().filter((user) =>
      user.name.toLowerCase().includes(this.searchTermFromSibling())
    )
  );
}
