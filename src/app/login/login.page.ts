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
  IonIcon,
} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
// AJOUT DES IMPORTS POUR LES ICONES
import { addIcons } from 'ionicons';
import { playCircle } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
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
    IonInput,
    IonButton,
  ],
})
export class LoginPage {
  email = '';
  password = '';
  private auth = inject(AuthService);
  private router = inject(Router);

  constructor() {
    // ENREGISTREMENT DE L'ICONE POUR LE LOGO
    addIcons({ playCircle });
  }

  async login() {
    if (!this.email || !this.password) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    try {
      const cleanEmail = this.email.trim();
      await this.auth.login({ email: cleanEmail, password: this.password });
      this.router.navigateByUrl('/home');
    } catch (e: any) {
      alert('Erreur de connexion : ' + e.message);
    }
  }

  // Cette fonction peut rester ici en sécurité,
  // mais tu utiliseras principalement goToRegister() pour naviguer
  async register() {
    try {
      const cleanEmail = this.email.trim();
      if (this.password.length < 6) {
        alert('Le mot de passe doit faire 6 caractères minimum');
        return;
      }
      await this.auth.register({ email: cleanEmail, password: this.password });
      this.router.navigateByUrl('/home');
    } catch (e: any) {
      alert('Erreur de création : ' + e.message);
    }
  }

  // REDIRECTION VERS LA PAGE D'INSCRIPTION
  goToRegister() {
    this.router.navigateByUrl('/register');
  }
}
