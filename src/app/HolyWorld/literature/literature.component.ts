import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthService } from '../core/auth.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-literature',
  templateUrl: './literature.component.html',
  styleUrls: ['./literature.component.css']
})
export class LiteratureComponent implements OnInit {

  info: any[];
  info1: any[];
  info2: any[];
  public loading = true;

  constructor(public firebase : AngularFireDatabase,
     private router: Router,
     public authService: AuthService,
    ) {
      
    this.firebase.list('/Literature').snapshotChanges().pipe(
      map(actions => actions.map(a => ({ key: a.key, ...a.payload.val() }))
      )
    ).subscribe(result => {
      this.info = result;
      this.loading = false;

      });

    this.firebase.list('/Videos').snapshotChanges().pipe(
     map(actions => actions.map(a => ({ key: a.key, ...a.payload.val() }))
      )
    ).subscribe(result => {
      this.info1 = result;
      this.loading = false;

      });

    this.firebase.list('/Events').snapshotChanges().pipe(
      map(actions => actions.map(a => ({ key: a.key, ...a.payload.val() }))
      )
    ).subscribe(result => {
      this.info2 = result;
      this.loading = false;

      });
}
  ngOnInit() {}

   slideConfig = {
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplayDelay: 500,
    
    responsive: [
      {
          breakpoint: 1024,
          settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
          }
      },
      {
          breakpoint: 600,
          settings: {
              slidesToShow: 1,
              slidesToScroll: 1
          }
      },
      {
          breakpoint: 480,
          settings: {
              slidesToShow: 1,
              slidesToScroll: 1
          }
      }
      ]      
    }; 
  }
