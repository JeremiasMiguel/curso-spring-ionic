import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { CredenciaisDTO } from 'src/models/credenciais.dto';

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

  constructor(public router: Router, public menu: MenuController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menu.swipeGesture(false);
  }

  ionViewWillLeave() {
    this.menu.swipeGesture(true);
  }

  login() {
    console.log(this.creds);
    this.router.navigateByUrl('/categories');
  }

}
