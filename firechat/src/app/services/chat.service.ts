import { Injectable } from '@angular/core';
import { Message } from '../models/message.model';
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  itemsCollection: AngularFirestoreCollection<Message>;

  chats: Message[] = [];

  user: any = {};

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user) => {
      console.log(user);

      if (!user) {
        return;
      }

      this.user.name = user.displayName;
      this.user.uid = user.uid;
    });
  }

  loadMessages() {
    this.itemsCollection = this.afs.collection<Message>('chats', (ref) =>
      ref.orderBy('date', 'desc').limit(5)
    );
    return this.itemsCollection.valueChanges().pipe(
      map((messages: Message[]) => {
        this.chats = [];
        for (let message of messages) {
          this.chats.unshift(message);
        }
      })
    );
  }

  addMessage(text: string) {
    let message: Message = {
      author: this.user.name,
      message: text,
      date: new Date().getTime(),
      uid: this.user.uid,
    };

    return this.itemsCollection.add(message);
  }

  login(provider: string) {
    if (provider == 'Google') {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } else {
      this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
    }
  }
  logout() {
    this.user = {};
    this.afAuth.auth.signOut();
  }
}
