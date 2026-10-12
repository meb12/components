import { Component, forwardRef, Input } from '@angular/core';
import { Options } from './select.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './select.html',
  styleUrls: ['./select.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Select),
      multi: true,
    },
  ],
})
export class Select implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() options: Options[] = [];
  @Input() disabled = false;
  isOpen = false;
  value: string | null = null;

  private onChange: (value: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  get selectedOption(): Options | undefined {
    return this.options.find((option) => option.value === this.value);
  }

  writeValue(value: string | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  updateValue(value: string): void {
    if (this.disabled) return;

    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  toggleOptions(): void {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: Options): void {
    if (option.disabled) return;

    this.value = option.value;
    this.onChange(this.value);
    this.onTouched();
    this.isOpen = false;
  }
}
