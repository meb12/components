import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { Select } from './components/select/select';
import { Switch } from './components/switch/switch';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, Select, Switch],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  form = new FormGroup({
    selectedOption: new FormControl<string | null>(null, Validators.required),
    switchValue: new FormControl<boolean>(false, {
      nonNullable: true,
    }),
  });

  options = [
    { label: 'Opção 1', value: 'option1' },
    { label: 'Opção 2', value: 'option2' },
    {
      label: 'Opção 3',
      value: 'option3',
      disabled: true,
    },
  ];

  setSelectDisabled(event: Event): void {
    const control = this.form.controls.selectedOption;
    (event.target as HTMLInputElement).checked ? control.disable() : control.enable();
  }

  setSwitchDisabled(event: Event): void {
    const control = this.form.controls.switchValue;
    (event.target as HTMLInputElement).checked ? control.disable() : control.enable();
  }

  // =========================
  // PERSONALIZAÇÕES DO SELECT
  // =========================

  fontSize = 16;
  paddingHorizontal = 8;
  paddingVertical = 11;

  borderColor = '#4a5c60';
  backgroundColor = '#fbfbfb';
  borderHoverColor = '#5b1c7d';
  backgroundHoverColor = '#f2eaf6';
  textColor = '#1d2426';

  changeFontSize(amount: number): void {
    this.fontSize = Math.max(10, Math.min(32, this.fontSize + amount));
  }

  changePadding(direction: 'horizontal' | 'vertical', amount: number): void {
    if (direction === 'horizontal') {
      this.paddingHorizontal = Math.max(0, Math.min(40, this.paddingHorizontal + amount));
    } else {
      this.paddingVertical = Math.max(0, Math.min(40, this.paddingVertical + amount));
    }
  }

  resetSelectCustomization(): void {
    this.fontSize = 16;
    this.paddingHorizontal = 8;
    this.paddingVertical = 11;

    this.borderColor = '#4a5c60';
    this.backgroundColor = '#fbfbfb';
    this.borderHoverColor = '#5b1c7d';
    this.backgroundHoverColor = '#f2eaf6';
    this.textColor = '#1d2426';
  }

  // =========================
  // PERSONALIZAÇÕES DO SWITCH
  // =========================

  switchPrimaryColor = '#753399';
  switchTrackActiveColor = '#bd94d1';
  switchTrackInactiveColor = '#dadedf';
  switchBorderColor = '#4b5563';

  resetSwitchCustomization(): void {
    this.switchPrimaryColor = '#753399';
    this.switchTrackActiveColor = '#bd94d1';
    this.switchTrackInactiveColor = '#dadedf';
    this.switchBorderColor = '#4b5563';
  }
}
