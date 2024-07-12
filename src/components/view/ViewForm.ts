import { IViewForm, TViewForm } from '../../types/index';
import { View } from '../view/View';
import { ensureAllElements, ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';

export abstract class ViewForm<T> extends View <TViewForm> implements IViewForm {
  protected container: HTMLFormElement;                     //DOM элемент формы
  protected inputs: HTMLInputElement[];                     //все поля ввода формы
  protected submitButton: HTMLButtonElement;                //кнопка сабмита формы
  protected errorSpan: HTMLSpanElement;                     //спан с текстом ошибки

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);
    this.inputs = ensureAllElements<HTMLInputElement>('.form__input', container); //находит все элементы с классом '.form__input' в DOM элементе формы
    this.submitButton = ensureElement<HTMLButtonElement>('.button[type=submit]', container);   //находит элемент с классом '.button' в DOM элементе формы
    this.errorSpan = ensureElement<HTMLSpanElement>('.form__errors', container);      //находит элемент с классом '.form__errors' в DOM элементе формы
     
    this.submitButton.addEventListener('click', () => {                 //слушатель события на сабмит формы с эмитом брокера события form:submit
      this.events.emit(`${this.container.name}:submit`);
    } )
  
    this.inputs.forEach(input => {
    input.addEventListener('input', () => 
      this.events.emit(`${this.container.name}:valid`))                           //слушатель события на ввод данных инпута с эмитом брокера события form:valid
    });
  }

  set valid(state: boolean) {      
    this.setDisabled(this.submitButton, !state);                                                      //активация/блокировка кнопки сабмита при валидности/невалидности кнопки 
    
  }

  get valid(): boolean {    
    const check = this.inputs.every((input) => {return input.value.length !== 0})                                                        //проверка валидности формы (валидна/невалидна)
    return check
  }

  set errorMessage(value: string) {                                             // установка сообщения об ошибке
    this.setText(this.errorSpan, value);
  }

  clear() {                                                                       // очистка формы
    this.container.reset
  }

  render(data: Partial<T> & TViewForm ) {                                 // рендер формы
    const {valid, errorMessage, ...inputs} = data;
    super.render({valid, errorMessage});
    Object.assign(this, inputs);
    return this.container;
}
}