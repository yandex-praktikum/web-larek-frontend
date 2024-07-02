import { IViewForm, TViewForm } from '../../types';
import { View } from '../view/View';
import { ensureAllElements, ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';

export class ViewForm extends View <TViewForm> implements IViewForm {
  protected container: HTMLFormElement;                     //DOM элемент формы
  protected inputs: HTMLInputElement[];                     //все поля ввода формы
  protected submitButton: HTMLButtonElement;                //кнопка сабмита формы
  protected errorSpan: HTMLElement;                         //спан с текстом ошибки

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);
    this.inputs = ensureAllElements<HTMLInputElement>('.form__input', container); //найти все элементы с классом '.form__input' в DOM элементе формы
    this.submitButton = ensureElement<HTMLButtonElement>('.button', container);   //найти элемент с классом '.button' в DOM элементе формы
    this.errorSpan = ensureElement<HTMLElement>('.form__errors', container);      //найти элемент с классом '.form__errors' в DOM элементе формы
     

    this.container.addEventListener('input', (event: Event) => {
      const target = event.target as HTMLInputElement;
      const inputName = target.name as string;
      const inputValue = target.value;
      this.changeInput (inputName, inputValue);
  });

    this.container.addEventListener('submit', (event: Event) => {                 //слушатель события на сабмит формы с эмитом брокера события form:submit
      event.preventDefault;
      this.events.emit(`${this.container.name}:submit`);

    } )
  
    this.inputs.forEach(input => {
    input.addEventListener('input', () => 
      this.events.emit(`${this.container.name}:valid`))                           //слушатель события на ввод данных инпута с эмитом брокера события form:valid
    });
  }

  changeInput(inputName: string, inputValue: string) {                           //функция изменения данных ввода с эмитом брокера события input:change
    this.events.emit(`${this.container.name}.${String(inputName)}:change`, {
      inputName,
      inputValue
    });
  } 

  get valid(): boolean {                                                           //проверка валидности формы (валидна/невалидна)
    return this.inputs.every(input => input.value.length === 0);
  }

  set valid(value: boolean) {                                                      //активация/блокировка кнопки сабмита при валидности/невалидности кнопки 
    this.submitButton.disabled = !value;
  }

  set errorMessage(value: string[]) {                                             // установка сообщения об ошибке
    this.setText(this.errorSpan, value);
  }

  clear() {                                                                       // очистка формы
    this.container.reset
  }

  render(data: Partial<TViewForm> & TViewForm ) {                                                     // рендер формы
    const {valid, errorMessage, ...inputs} = data;
    super.render({valid, errorMessage});
    Object.assign(this, inputs);
    return this.container;
}
}