import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonButtons,
  IonBackButton,
  IonIcon,
  ToastController,
} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { personAddOutline } from 'ionicons/icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonButtons,
    IonBackButton,
    IonIcon,
  ],
})
export class RegisterPage {
  email = '';
  password = '';
  confirmPassword = ''; // Nouveau champ

  private auth = inject(AuthService);
  private router = inject(Router);
  private toastCtrl = inject(ToastController);

  constructor() {
    addIcons({ personAddOutline });
  }

  async register() {
    const cleanEmail = this.email.trim();

    // 1. Vérification des champs vides
    if (!cleanEmail || !this.password || !this.confirmPassword) {
      this.showToast('Veuillez remplir tous les champs', 'warning');
      return;
    }

    // 2. Vérification de la longueur du mot de passe
    if (this.password.length < 6) {
      this.showToast(
        'Le mot de passe doit faire 6 caractères minimum',
        'warning'
      );
      return;
    }

    // 3. Vérification de la correspondance des mots de passe
    if (this.password !== this.confirmPassword) {
      this.showToast('Les mots de passe ne correspondent pas', 'danger');
      return;
    }

    try {
      await this.auth.register({ email: cleanEmail, password: this.password });
      this.showToast('Compte créé avec succès !', 'success');
      this.router.navigateByUrl('/home');
    } catch (e: any) {
      this.showToast('Erreur : ' + e.message, 'danger');
    }
  }

  // Fonction utilitaire pour le toast (si tu ne l'as pas déjà)
  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position: 'bottom',
    });
    toast.present();
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }
}
