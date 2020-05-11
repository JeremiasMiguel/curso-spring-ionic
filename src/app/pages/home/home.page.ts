import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { CredenciaisDTO } from 'src/models/credenciais.dto';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  creds: CredenciaisDTO = {
    email: '',
    senha: ''
  };

  constructor(public router: Router, public menu: MenuController, public authService: AuthService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menu.swipeGesture(false);
  }

  ionViewWillLeave() {
    this.menu.swipeGesture(true);
  }

  login() {
    this.authService.authenticate(this.creds).subscribe(response => {
      this.authService.successfulLogin(response.headers.get('Authorization'));
      this.router.navigateByUrl('/categories');
    },
    error => {});
  }

}
