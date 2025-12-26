import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonCheckbox,
  IonButtons,
  IonSegment,
  IonSegmentButton,
  IonSearchbar,
  IonCard,
  IonBadge,
  IonCardContent,
  IonThumbnail,
  IonListHeader,
  ToastController,
  IonSelectOption,
  IonSelect,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  trashOutline,
  logOutOutline,
  addCircle,
  eyeOutline,
  trashBinOutline,
  checkmarkDoneCircle,
  checkmarkCircle,
  personCircleOutline,
  addCircleOutline,
} from 'ionicons/icons';

import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MovieApiService } from '../services/movie-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon,
    IonCheckbox,
    IonButtons,
    IonSegment,
    IonSegmentButton,
    IonSearchbar,
    IonCard,
    IonBadge,
    IonCardContent,
    IonThumbnail,
    IonListHeader,
    IonSelectOption,
    IonSelect,
  ],
})
export class HomePage {
  private dataService = inject(DataService) as DataService;
  private authService = inject(AuthService) as AuthService;
  private router = inject(Router);
  private toastCtrl = inject(ToastController);
  private movieApi = inject(MovieApiService);

  searchResults: any[] = [];
  searchTerm = '';
  newMovie = '';
  itemType: 'movie' | 'series' = 'movie';
  filterValue = 'all';
  movies$ = this.dataService.getWatchlist();

  constructor() {
    addIcons({
      personCircleOutline,
      logOutOutline,
      addCircleOutline,
      addCircle,
      eyeOutline,
      trashBinOutline,
      checkmarkDoneCircle,
      checkmarkCircle,
      trashOutline,
    });
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position: 'bottom',
    });
    toast.present();
  }

  async add() {
    if (this.newMovie) {
      await this.dataService.addMovie(this.newMovie, this.itemType);
      this.showToast('Ajouté à la liste !', 'success');
      this.newMovie = '';
    }
  }

  getFilteredMovies(movies: any[] | null) {
    if (!movies) return [];
    let filtered = movies;
    if (this.filterValue !== 'all') {
      filtered = filtered.filter((m) => m.type === this.filterValue);
    }
    if (this.searchTerm.trim() !== '') {
      filtered = filtered.filter((m) =>
        m.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    return filtered;
  }

  async delete(id: string) {
    await this.dataService.deleteMovie(id);
    this.showToast('Supprimé', 'danger');
  }

  goToDetails(id: string) {
    this.router.navigate(['/details', id]);
  }

  async toggle(item: any) {
    await this.dataService.toggleStatus(item.id, item.watched);
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  async changeStatus(id: string, newStatus: string) {
    await this.dataService.updateStatus(id, newStatus);
    this.showToast('Statut mis à jour', 'primary');
  }

  goToProfile() {
    this.router.navigateByUrl('/profile');
  }

  onSearchInput(ev: any) {
    const value = ev.detail.value;
    if (value && value.length > 2) {
      this.movieApi.search(value).subscribe((res) => {
        this.searchResults = res;
      });
    } else {
      this.searchResults = [];
    }
  }

  async addFromApi(res: any) {
    const show = res.show;
    const type = show.type === 'Scripted' ? 'series' : 'movie';

    // CORRECTION : On envoie les arguments attendus par le service
    await this.dataService.addMovie(show.name, type, {
      imageUrl:
        show.image?.medium ||
        'https://via.placeholder.com/210x295?text=No+Image',
      summary: show.summary,
    });

    this.searchResults = [];
    this.searchTerm = '';
    this.showToast(`${show.name} ajouté !`, 'success');
  }
}
