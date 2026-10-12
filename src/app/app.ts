import { Component, signal } from '@angular/core';
import { Select } from './components/select/select';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Select],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  options = [
    { label: 'Option 1', value: 'option1', disabled: false },
    { label: 'Option 2', value: 'option2', disabled: false },
    { label: 'Option 3', value: 'option3', disabled: true },
  ];
  protected readonly title = signal('components');
}
