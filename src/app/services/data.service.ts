import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { docData } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class DataService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  getWatchlist(): Observable<any[]> {
    const user = this.auth.currentUser;
    if (!user) return of([]);
    const itemRef = collection(this.firestore, `users/${user.uid}/movies`);
    return collectionData(itemRef, { idField: 'id' }) as Observable<any[]>;
  }

  // Remplace addMovie par ceci :
  addMovie(title: string, type: string, extraData: any = {}) {
    const user = this.auth.currentUser;
    const itemRef = collection(this.firestore, `users/${user?.uid}/movies`);
    return addDoc(itemRef, {
      title,
      type,
      status: 'todo',
      watched: false,
      createdAt: new Date(),
      ...extraData, // Ceci permet d'ajouter imageUrl et summary si fournis
    });
  }

  updateStatus(id: string, newStatus: string) {
    const user = this.auth.currentUser;
    const docRef = doc(this.firestore, `users/${user?.uid}/movies/${id}`);

    // Si le statut est "finished", on coche automatiquement la checkbox "watched"
    return updateDoc(docRef, {
      status: newStatus,
      watched: newStatus === 'finished',
    });
  }

  deleteMovie(id: string) {
    const user = this.auth.currentUser;
    const docRef = doc(this.firestore, `users/${user?.uid}/movies/${id}`);
    return deleteDoc(docRef);
  }

  toggleStatus(id: string, status: boolean) {
    const user = this.auth.currentUser;
    const docRef = doc(this.firestore, `users/${user?.uid}/movies/${id}`);
    return updateDoc(docRef, { watched: !status });
  }

  getMovieById(id: string): Observable<any> {
    const user = this.auth.currentUser;
    const docRef = doc(this.firestore, `users/${user?.uid}/movies/${id}`);
    return docData(docRef, { idField: 'id' });
  }

  updateMovie(id: string, data: any) {
    const user = this.auth.currentUser;
    const docRef = doc(this.firestore, `users/${user?.uid}/movies/${id}`);
    return updateDoc(docRef, data);
  }
}
