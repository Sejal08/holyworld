import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { AuthService } from '../core/auth.service'
import * as firebase from "firebase/app";
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {
  userList: AngularFireList<any>;
  listIn: any[];
  listNear: any[];

  form: FormGroup;
  faoRate = 2.6;
  faoRated = false;
  currentUser1;
  selected;
  public loading = true;

  constructor(
    private db :AngularFireDatabase,
    public authService: AuthService,
    private _formBuilder: FormBuilder,
    private router: Router,

  ) {} 

  // onFaoRate(e) {
  //   this.faoRated = true;
  //   this.faoRate = e;
  //   this.currentUser1 = firebase.auth().currentUser.email;
  //   console.log(this.faoRate)
  //   this.authService.doGoogleLogin()
  //   .then(res => {
  //     this.db.list('/ShopRatings').push({ rating: this.faoRate, emailId: this.currentUser1 });

  //   })
  // }

  add(shopName){
    console.log(shopName);
    localStorage.setItem("shopId", JSON.stringify(shopName))
    }
 
    tryGoogleLogin() {
      this.authService.doGoogleLogin()
      .then(res => {
        this.router.navigate(['/holy/feedback1']);
  
        var currentUser = firebase.auth().currentUser.email;
        localStorage.setItem("email", JSON.stringify(currentUser))
      });
     }

  ngOnInit() {
    this.form = this._formBuilder.group({
      la: [''],

    })
    this.db.list('/Shopping', ref => ref.orderByChild('where').equalTo('devotional')).snapshotChanges().pipe(
      map(actions =>
        actions.map(a => ({ key: a.key, title: a.key, where: a.key, ...a.payload.val() }))
      )
    ).subscribe(Shopping => {
      this.loading = false;
      this.listIn = Shopping;  
      // console.log(this.listVehicle)   
    }, err => {
      this.loading = true;
    });

    this.db.list('/Shopping', ref => ref.orderByChild('where').equalTo('popular')).snapshotChanges().pipe(
      map(actions =>
        actions.map(a => ({ key: a.key, title: a.key, where: a.key, ...a.payload.val() }))
      )
    ).subscribe(Shopping => {
      this.listNear = Shopping;  
      this.loading = false;

      // console.log(this.listVehicle)   
    }, err => {
      this.loading = true;
    });
  }
   
  slideConfig = {
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
    // centerMode: true,
    focusOnSelect: true,
    autoplay: true,
    autoplayDelay: 200,
    asNavFor: '.for1',
  //   nextArrow: '<i class="fa fa-chevron-right flex-center"></i>',
  // prevArrow: '<i class="fa fa fa-chevron-left"></i>',
    // adaptiveHeight: true,
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

slideConfig1 = {
  slidesToShow: 1,
  slidesToScroll: 1,
  // asNavFor: 'slideConfig',
  // focusOnSelect: true,
  infinite: true,
  // arrows: false,
  fade: true,
  asNavFor: '.nav1',
  // nextArrow: '<i class="fa fa-chevron-right"></i>',
  // prevArrow: '<i class="fa fa fa-chevron-left"></i>',
};

nearConfig = {
  speed: 200,
  slidesToShow: 4,
  slidesToScroll: 1,
  // centerMode: true,
  focusOnSelect: true,
  autoplay: true,
  autoplayDelay: 200,
  asNavFor: '.for2',
//   nextArrow: '<i class="fa fa-chevron-right flex-center"></i>',
// prevArrow: '<i class="fa fa fa-chevron-left"></i>',
  // adaptiveHeight: true,
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

nearConfig1 = {
slidesToShow: 1,
slidesToScroll: 1,
// asNavFor: 'slideConfig',
// focusOnSelect: true,
infinite: true,
// arrows: false,
fade: true,
asNavFor: '.nav2',
// nextArrow: '<i class="fa fa-chevron-right"></i>',
// prevArrow: '<i class="fa fa fa-chevron-left"></i>',
};

slickFun(){
  console.log(this.form.value.la)
  console.log(this.selected)
}
}

