import { Injectable, EventEmitter } from '@angular/core';
import { IAction } from './type';

@Injectable({
  providedIn: 'root',
})
export class ConnectorService {
  propUpdated = new EventEmitter<IAction>();
  constructor() {}

  emitUpdatedEvent(action: IAction) {
    this.propUpdated.emit(action);
  }

  makeId(length: number): string {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
