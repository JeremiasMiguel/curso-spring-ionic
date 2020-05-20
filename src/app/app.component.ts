import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  navigate: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthService,
    private router: Router
  ) {
    this.initializeApp();

    this.sidemenu();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    
  }

  sidemenu() {
    this.navigate =
    [
      {
        title : "Profile",
        url   : "/profile",
        icon  : "person-circle-outline"
      },
      {
        title : "Categories",
        url   : "/categories",
        icon  : "file-tray-stacked-outline"
      },
      {
        title : "Cart",
        url   : "/cart",
        icon  : "cart-outline"
      },
      {
        title : "Logout",
        url   : "/logout",
        icon  : "exit-outline"
      }
    ]
  }

  redirect(page: any) {

    switch(page.title) {
      case 'Logout':
        this.sair();
        break;
      
      default:
        this.router.navigateByUrl(page.url);
    }

  }

  sair() {
    this.auth.logout();
    this.router.navigateByUrl('/home');
  }
}
