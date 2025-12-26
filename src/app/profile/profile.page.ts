import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonButton,
  IonButtons,
  IonBackButton,
  IonAvatar,
  IonLabel,
  IonItem,
} from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { addIcons } from 'ionicons';
import {
  personCircle,
  filmOutline,
  tvOutline,
  checkmarkDoneOutline,
  timeOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonButton,
    IonButtons,
    IonBackButton,
    IonAvatar,
    IonLabel,
    IonItem,
  ],
})
export class ProfilePage {
  private dataService = inject(DataService);
  private authService = inject(AuthService);

  userEmail = this.authService.user$?.pipe(map((user) => user?.email));

  // Calcul des statistiques
  stats$ = this.dataService.getWatchlist().pipe(
    map((movies) => {
      return {
        total: movies.length,
        films: movies.filter((m) => m.type === 'movie').length,
        series: movies.filter((m) => m.type === 'series').length,
        finished: movies.filter((m) => m.status === 'finished').length,
        todo: movies.filter(
          (m) => m.status === 'todo' || m.status === 'watching'
        ).length,
      };
    })
  );

  constructor() {
    addIcons({
      personCircle,
      filmOutline,
      tvOutline,
      checkmarkDoneOutline,
      timeOutline,
    });
  }
}
