import { IEvents } from "../base/events";

export class View<T> {
  protected container: HTMLElement;                                              // DOM элемент компонента
  protected events: IEvents;                                                      // объект класса `EventEmitter` для инициации событий при изменении данных
  private _valid: any;


  constructor(container: HTMLElement, events: IEvents) {
    this.container = container;                                                   // DOM элемент компонента
    this.events = events;                                                         // объект класса `EventEmitter` для инициации событий при изменении данных
  }

  public get valid(): any {
    return this._valid;
}
  public set valid(value: any) {
    this._valid = value;
}
                                                                                 
  toggleClass(element: HTMLElement, className: string, method?: boolean) {        // Переключить класс
    element.classList.toggle(className, method);
  }

   
  protected setText(element: HTMLElement, value: unknown) {                      // Установить текстовое содержимое
    if (element) {
      element.textContent = String(value);
  }
}


  setDisabled(element: HTMLElement, state: boolean) {                             // Установить/снять статус блокировки
    if (element) {
        if (state) element.setAttribute('disabled', 'true');
        else element.removeAttribute('disabled');
  }
}


  protected setHidden(element: HTMLElement) {                                       // Скрыть
    element.style.display = 'none';
}

                                                  
  protected setVisible(element: HTMLElement) {                                      // Показать
    element.style.removeProperty('display');
}


protected setImage(element: HTMLImageElement, src: string, alt?: string) {        // Установить изображение 
    if (element) {
        element.src = src;
        if (alt) {
            element.alt = alt;
        }
    }
}

render(data?: Partial<T>): HTMLElement {                                         //вернуть отрисованный html элемент по переданным данным
    Object.assign(this as object, data ?? {});
    return this.container;
}
}