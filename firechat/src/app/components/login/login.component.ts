import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private cs: ChatService) {}

  ngOnInit(): void {}

  login(provider: string) {
    this.cs.login(provider);
  }
}
