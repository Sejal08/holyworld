import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthService } from '../core/auth.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Users } from './data.model';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css'],
  })

export class HotelsComponent implements OnInit {

  info: any[];
  info1: any[];
  UsersList: AngularFireList<any>;
  selectedUsers: Users = new Users();
  HotelTitle;
  public loading = true;
     
  constructor(public firebase : AngularFireDatabase,
     private router: Router,
     public authService: AuthService,
    ) {
      
   this.firebase.list('/Hotel_Information').snapshotChanges().pipe(
      map(actions => actions.map(a => ({ key: a.key, service_rating: a.key, ...a.payload.val() }))
      )
    ).subscribe(result => {
      this.info = result;
      this.info1 = result.map(item => item.service_rating)
      this.loading = false;
      console.log(this.info1)
     });
  
 }

  ngOnInit() {

  }
  
   tryGoogleLogin() {
    this.authService.doGoogleLogin()
    .then(res => {
      this.router.navigate(['/holy/feedback']);

      var currentUser = firebase.auth().currentUser.email;
      localStorage.setItem("email", JSON.stringify(currentUser))
    });
   }

add(slide){
 this.HotelTitle = slide.title;
 console.log(this.HotelTitle);
 localStorage.setItem("hotelId", JSON.stringify(this.HotelTitle))
 }

slideConfig= {
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: true,
  fade: true,
  asNavFor: '.slider-for',
  }; 

 slideConfig1 = {
  speed: 200,
  slidesToShow: 4,
  slidesToScroll: 1,
  focusOnSelect: true,
  autoplay: true,
  autoplayDelay: 200,
  asNavFor: '.slider-nav',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
   
  ]
  }; 
}