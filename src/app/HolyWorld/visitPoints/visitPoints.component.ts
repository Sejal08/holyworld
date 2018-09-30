import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-visitPoints',
  templateUrl: './visitPoints.component.html',
  styleUrls: ['./visitPoints.component.scss']
})
export class VisitPointsComponent implements OnInit {
  userList: AngularFireList<any>;
  listIn: any[];
  listNear: any[];

  public loading = true;

 
  constructor(
    private db :AngularFireDatabase,

  ) {}

  ngOnInit() {
    this.db.list('/VisitPoints', ref => ref.orderByChild('where').equalTo('In Shirdi')).snapshotChanges().pipe(
      map(actions =>
        actions.map(a => ({ key: a.key, title: a.key, where: a.key, ...a.payload.val() }))
      )
    ).subscribe(VisitPoints => {
      this.loading = false;
      this.listIn = VisitPoints;  
      // console.log(this.listVehicle)   
    }, err => {
      this.loading = true;
    });

    this.db.list('/VisitPoints', ref => ref.orderByChild('where').equalTo('Near Shirdi')).snapshotChanges().pipe(
      map(actions =>
        actions.map(a => ({ key: a.key, title: a.key, where: a.key, ...a.payload.val() }))
      )
    ).subscribe(VisitPoints => {
      this.listNear = VisitPoints;  
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
}
