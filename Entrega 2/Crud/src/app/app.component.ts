import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'loja-CRUD';
  user: any;
  loggedIn: any
  constructor(private router: Router,private route: ActivatedRoute, private authService: SocialAuthService){
  }
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if(this.loggedIn==true){
        this.router.navigate(["/estoque/logado"], {relativeTo :this.route});

      }
    });
  }
  estoqueLink(){
    if(this.loggedIn==true){
      this.router.navigate(["/estoque/logado"], {relativeTo :this.route});

    }else{
      this.router.navigate(["/estoque"], {relativeTo :this.route});
    }
  }
  vitrineLink(){

      this.router.navigate(["/vitrine"], {relativeTo :this.route});
  }

  comprasLink(){

    this.router.navigate(["/compras"], {relativeTo :this.route});
}
}


