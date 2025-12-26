import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonTextarea,
  IonButton,
  IonButtons,
  IonBackButton,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonBadge,
  IonIcon,
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  standalone: true,
  imports: [
    IonIcon,
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonTextarea,
    IonButton,
    IonButtons,
    IonBackButton,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonBadge,
  ],
})
export class DetailsPage implements OnInit {
  private route = inject(ActivatedRoute);
  private dataService = inject(DataService);

  movie: any = null;
  id: string = '';

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.dataService.getMovieById(this.id).subscribe((res) => {
      this.movie = res;
    });
  }

  async save() {
    await this.dataService.updateMovie(this.id, {
      description: this.movie.description || '',
      note: this.movie.note || 0,
    });
    alert('Enregistré !');
  }
}
