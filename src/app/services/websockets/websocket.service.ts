import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IMessages } from '../../shared/interfaces/chat.interface';
import { environment } from '../../../environments/environment';

interface INewMessageEvent {
  event: string;
  chat_id: string;
  message: IMessages;
}

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  getMessage: Subject<INewMessageEvent> = new Subject();
  socket: WebSocket;
  constructor() {
    this.socket = new WebSocket(environment.websocketApi);
  }

  subscribeToGetMessageEvent(userId: string) {
    this.socket.addEventListener('open', () => {
      this.socket.send(JSON.stringify({ meta: 'join', clientId: userId }));
    });

    this.socket.addEventListener('message', (event) => {
      const transformEvent: INewMessageEvent = JSON.parse(event.data);

      if (transformEvent.event === 'get_message')
        this.getMessage.next(transformEvent);
    });
  }
}
