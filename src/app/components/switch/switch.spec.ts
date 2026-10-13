import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Switch } from './switch';

describe('Switch', () => {
  let component: Switch;
  let fixture: ComponentFixture<Switch>;
  let input: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Switch],
    }).compileComponents();

    fixture = TestBed.createComponent(Switch);
    component = fixture.componentInstance;

    fixture.detectChanges();

    input = fixture.nativeElement.querySelector('input[type="checkbox"]');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initial state', () => {
    it('should initialize with default values', () => {
      expect(component.isChecked).toBeFalse();
      expect(component.isDisabled).toBeFalse();
      expect(component.showIcon).toBeFalse();
    });

    it('should render an unchecked and enabled checkbox', () => {
      expect(input.checked).toBeFalse();
      expect(input.disabled).toBeFalse();
    });

    it('should not render the check icon initially', () => {
      const icon = fixture.nativeElement.querySelector('mat-icon');

      expect(icon).toBeNull();
    });
  });

  describe('writeValue', () => {
    it('should check the switch when the value is true', () => {
      component.writeValue(true);
      fixture.detectChanges();

      expect(component.isChecked).toBeTrue();
      expect(component.showIcon).toBeTrue();
      expect(input.checked).toBeTrue();
    });

    it('should uncheck the switch when the value is false', () => {
      component.writeValue(true);
      component.writeValue(false);
      fixture.detectChanges();

      expect(component.isChecked).toBeFalse();
      expect(component.showIcon).toBeFalse();
      expect(input.checked).toBeFalse();
    });

    it('should treat null as false', () => {
      component.writeValue(null);
      fixture.detectChanges();

      expect(component.isChecked).toBeFalse();
      expect(component.showIcon).toBeFalse();
    });

    it('should render the check icon when checked', () => {
      component.writeValue(true);
      fixture.detectChanges();

      const icon: HTMLElement | null = fixture.nativeElement.querySelector('mat-icon');

      expect(icon).not.toBeNull();
      expect(icon?.textContent?.trim()).toBe('check');
    });
  });

  describe('toggle', () => {
    it('should check the switch when toggled from false', () => {
      component.toggle();

      expect(component.isChecked).toBeTrue();
      expect(component.showIcon).toBeTrue();
    });

    it('should uncheck the switch when toggled from true', () => {
      component.writeValue(true);

      component.toggle();

      expect(component.isChecked).toBeFalse();
      expect(component.showIcon).toBeFalse();
    });

    it('should call onChange with true when checked', () => {
      const onChange = jasmine.createSpy('onChange');
      component.registerOnChange(onChange);

      component.toggle();

      expect(onChange).toHaveBeenCalledOnceWith(true);
    });

    it('should call onChange with false when unchecked', () => {
      const onChange = jasmine.createSpy('onChange');
      component.registerOnChange(onChange);
      component.writeValue(true);

      component.toggle();

      expect(onChange).toHaveBeenCalledOnceWith(false);
    });

    it('should call onTouched when toggled', () => {
      const onTouched = jasmine.createSpy('onTouched');
      component.registerOnTouched(onTouched);

      component.toggle();

      expect(onTouched).toHaveBeenCalledTimes(1);
    });

    it('should update the rendered checkbox when toggled', () => {
      component.toggle();
      fixture.detectChanges();

      expect(input.checked).toBeTrue();

      component.toggle();
      fixture.detectChanges();

      expect(input.checked).toBeFalse();
    });

    it('should toggle when the checkbox change event is triggered', () => {
      input.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(component.isChecked).toBeTrue();
    });
  });

  describe('setDisabledState', () => {
    it('should disable the switch when setDisabledState is true', () => {
      component.setDisabledState(true);
      fixture.detectChanges();

      expect(component.isDisabled).toBeTrue();
      expect(input.disabled).toBeTrue();
    });

    it('should enable the switch when setDisabledState is false', () => {
      component.setDisabledState(true);
      component.setDisabledState(false);
      fixture.detectChanges();

      expect(component.isDisabled).toBeFalse();
      expect(input.disabled).toBeFalse();
    });

    it('should not toggle when the switch is disabled', () => {
      const onChange = jasmine.createSpy('onChange');
      const onTouched = jasmine.createSpy('onTouched');

      component.registerOnChange(onChange);
      component.registerOnTouched(onTouched);
      component.setDisabledState(true);

      component.toggle();

      expect(component.isChecked).toBeFalse();
      expect(component.showIcon).toBeFalse();
      expect(onChange).not.toHaveBeenCalled();
      expect(onTouched).not.toHaveBeenCalled();
    });
  });

  describe('label and accessibility', () => {
    it('should set the aria-label from the label input', () => {
      component.label = 'Enable notifications';
      fixture.detectChanges();

      expect(input.getAttribute('aria-label')).toBe('Enable notifications');
    });

    it('should expose the checked state through aria-checked', () => {
      component.writeValue(true);
      fixture.detectChanges();

      expect(input.getAttribute('aria-checked')).toBe('true');

      component.writeValue(false);
      fixture.detectChanges();

      expect(input.getAttribute('aria-checked')).toBe('false');
    });

    it('should prevent the default Space key behavior and toggle', () => {
      const event = new KeyboardEvent('keydown', {
        key: ' ',
        bubbles: true,
        cancelable: true,
      });

      input.dispatchEvent(event);
      fixture.detectChanges();

      expect(event.defaultPrevented).toBeTrue();
      expect(component.isChecked).toBeTrue();
    });
  });
});
