import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

// Firestore
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore'
import { Message } from '../shared/models/message'

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messagesCollection: AngularFirestoreCollection<Message>;
  messages: Observable<Message[]>;
  messageDoc: AngularFirestoreDocument<Message>;


  constructor(public db: AngularFirestore) {
    // this.messages = this.db.collection('messages').valueChanges();
    this.messagesCollection =  this.db.collection('messages');
    this.messages = this.messagesCollection.snapshotChanges().pipe(map(actions =>{
        return actions.map(a => {
          const data = a.payload.doc.data() as Message;
          data.id = a.payload.doc.id;
          return data;
        })
      }))
  }

   getMessages(){
     return this.messages;
   }

  //  Metodo para agregar un mensaje a la colección
   addMessage(message: Message){
    this.messagesCollection.add(message);
   }

  //  Metodo para eliminar un mensaje
   deleteMessage(message: Message) {
    this.messageDoc = this.db.doc(`messages/${message.id}`);
    this.messageDoc.delete();
   }
}
