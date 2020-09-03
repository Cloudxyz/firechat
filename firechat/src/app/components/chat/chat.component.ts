import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [],
})
export class ChatComponent implements OnInit {
  message: string;
  element: any;

  constructor(public cs: ChatService) {
    this.cs.loadMessages().subscribe(() => {
      setTimeout(() => {
        this.element.scrollTop = this.element.scrollHeight;
      }, 20);
    });
  }

  ngOnInit(): void {
    this.element = document.getElementById('app-mensajes');
  }

  sendMessage() {
    if (this.message.length === 0) {
      return;
    }

    this.cs.addMessage(this.message).then(() => {
      this.message = '';
    });
  }
}
