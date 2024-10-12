import {Component, output} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchValue: string = '';
  clickValue: number = 1;
  searchTask = output<string>();

  public search(): void {
    console.log('Search:' + this.searchValue);
    console.log('Click:' + this.clickValue);

    this.searchTask.emit(this.searchValue);

    this.clickValue++;
  }

}
