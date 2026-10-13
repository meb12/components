import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Select } from './select';

describe('Select', () => {
  let component: Select;
  let fixture: ComponentFixture<Select>;
  let selectElement: HTMLSelectElement;

  const mockOptions = [
    { value: 'sp', label: 'São Paulo' },
    { value: 'rj', label: 'Rio de Janeiro' },
    { value: 'mg', label: 'Minas Gerais', disabled: true },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Select],
    }).compileComponents();

    fixture = TestBed.createComponent(Select);
    component = fixture.componentInstance;

    component.id = 'select-estado';
    component.placeholder = 'Selecione um estado';
    component.options = mockOptions;

    fixture.detectChanges();

    selectElement = fixture.nativeElement.querySelector('select');
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar o placeholder', () => {
    const placeholder = selectElement.querySelector('option[value=""]') as HTMLOptionElement | null;

    expect(placeholder).toBeTruthy();
    expect(placeholder?.textContent?.trim()).toBe('Selecione um estado');
    expect(placeholder?.disabled).toBeTrue();
  });

  it('deve renderizar todas as opções', () => {
    const options = Array.from(selectElement.options);

    expect(options.length).toBe(4);
    expect(options[1].textContent?.trim()).toBe('São Paulo');
    expect(options[2].textContent?.trim()).toBe('Rio de Janeiro');
    expect(options[3].textContent?.trim()).toBe('Minas Gerais');
  });

  it('deve desabilitar uma opção marcada como disabled', () => {
    const option = selectElement.querySelector('option[value="mg"]') as HTMLOptionElement | null;

    expect(option).toBeTruthy();
    expect(option?.disabled).toBeTrue();
  });

  it('deve iniciar sem valor selecionado', () => {
    expect(component.value).toBeNull();
    expect(selectElement.value).toBe('');
  });

  it('deve atualizar o valor ao selecionar uma opção', () => {
    selectElement.value = 'sp';
    selectElement.dispatchEvent(new Event('change'));

    fixture.detectChanges();

    expect(component.value).toBe('sp');
    expect(selectElement.value).toBe('sp');
  });

  it('deve chamar onChange ao alterar o valor', () => {
    const onChangeSpy = jasmine.createSpy('onChange');

    component.registerOnChange(onChangeSpy);

    selectElement.value = 'rj';
    selectElement.dispatchEvent(new Event('change'));

    expect(onChangeSpy).toHaveBeenCalledOnceWith('rj');
  });

  it('deve definir o valor como null quando nenhuma opção estiver selecionada', () => {
    const onChangeSpy = jasmine.createSpy('onChange');

    component.registerOnChange(onChangeSpy);

    selectElement.value = '';
    selectElement.dispatchEvent(new Event('change'));

    expect(component.value).toBeNull();
    expect(onChangeSpy).toHaveBeenCalledOnceWith(null);
  });

  it('deve chamar onTouched ao alterar o valor', () => {
    const onTouchedSpy = jasmine.createSpy('onTouched');

    component.registerOnTouched(onTouchedSpy);

    selectElement.value = 'sp';
    selectElement.dispatchEvent(new Event('change'));

    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('deve chamar onTouched ao sair do campo', () => {
    const onTouchedSpy = jasmine.createSpy('onTouched');

    component.registerOnTouched(onTouchedSpy);

    selectElement.dispatchEvent(new Event('blur'));

    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('deve atualizar o valor através de writeValue', () => {
    component.writeValue('rj');
    fixture.detectChanges();

    expect(component.value).toBe('rj');
    expect(selectElement.value).toBe('rj');
  });

  it('deve aceitar null através de writeValue', () => {
    component.writeValue(null);
    fixture.detectChanges();

    expect(component.value).toBeNull();
    expect(selectElement.value).toBe('');
  });

  it('deve desabilitar o campo quando setDisabledState receber true', () => {
    component.setDisabledState(true);
    fixture.detectChanges();

    expect(component.disabled).toBeTrue();
    expect(selectElement.disabled).toBeTrue();
  });

  it('deve habilitar o campo quando setDisabledState receber false', () => {
    component.setDisabledState(true);
    component.setDisabledState(false);
    fixture.detectChanges();

    expect(component.disabled).toBeFalse();
    expect(selectElement.disabled).toBeFalse();
  });

  it('deve aplicar o ID informado ao select', () => {
    expect(selectElement.id).toBe('select-estado');
  });

  it('deve usar o ID padrão quando nenhum ID for informado', () => {
    component.id = 'select-id';
    fixture.detectChanges();

    expect(selectElement.id).toBe('select-id');
  });

  it('deve usar o placeholder como nome acessível', () => {
    expect(selectElement.getAttribute('aria-label')).toBe('Selecione uma opção');
  });

  it('deve indicar que o campo não está inválido inicialmente', () => {
    expect(selectElement.getAttribute('aria-invalid')).toBe('false');
  });

  it('deve indicar quando o campo está inválido', () => {
    component.hasError = true;
    fixture.detectChanges();

    expect(selectElement.getAttribute('aria-invalid')).toBe('true');
    expect(selectElement.classList.contains('has-error')).toBeTrue();
  });

  it('deve remover o estado de erro quando hasError for false', () => {
    component.hasError = true;
    fixture.detectChanges();

    component.hasError = false;
    fixture.detectChanges();

    expect(selectElement.getAttribute('aria-invalid')).toBe('false');
    expect(selectElement.classList.contains('has-error')).toBeFalse();
  });

  it('deve ocultar o ícone decorativo das tecnologias assistivas', () => {
    const icon = fixture.nativeElement.querySelector('.select-icon');

    expect(icon).toBeTruthy();
    expect(icon.getAttribute('aria-hidden')).toBe('true');
  });
});
