import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-switch',
  imports: [CommonModule, MatIconModule],
  templateUrl: './switch.html',
  styleUrl: './switch.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Switch),
      multi: true,
    },
  ],
})
export class Switch {
  @Input() label = 'Selecione o estado do componente';
  isChecked = false;
  isDisabled = false;
  showIcon = this.isChecked;

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: boolean | null): void {
    this.isChecked = !!value;
    this.showIcon = this.isChecked;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  toggle(): void {
    if (this.isDisabled) return;

    this.isChecked = !this.isChecked;
    this.showIcon = this.isChecked;
    this.onChange(this.isChecked);
    this.onTouched();
  }
}
