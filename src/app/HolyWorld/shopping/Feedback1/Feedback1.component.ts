import { Component, OnInit } from '@angular/core';
import { ShoppingComponent } from '../shopping.component'
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Users } from '../data.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-Feedback1',
  templateUrl: './Feedback1.component.html',
  styleUrls: ['./Feedback1.component.css']
})
export class Feedback1Component implements OnInit {
  feedbackForm: FormGroup;
  UsersList: AngularFireList<any>;
  selectedUsers: Users = new Users();
  getCurrentUser;
  getHotelId;
  getAvg;
  HotelTitle;
  shopId;
  FeedbackRating;
  avg;
  public loading = true;

  faoRate = 2.6;
  faoRated = false;

  rate;
  onFaoRate(e) {
    this.faoRated = true;
    this.faoRate = e;
    console.log(this.faoRate)

    localStorage.setItem("faoRate1", JSON.stringify(this.faoRate))
  }

  constructor(private firebase: AngularFireDatabase,
    private router: Router,
    public authService: AuthService,
    private fb: FormBuilder,
    public shopComponent: ShoppingComponent,
  ) {
  }

  ngOnInit() {
    this.getData();
    this.createForm();
    this.getCurrentUser = JSON.parse(localStorage.getItem("email1"));
    this.getHotelId = JSON.parse(localStorage.getItem("shopId"));
  }

  getData() {
    this.UsersList = this.firebase.list('ShopFeedback');
    return this.UsersList;
  }

  insertData(data: Users) {
    this.rate = JSON.parse(localStorage.getItem("faoRate1"));
    console.log(this.rate)
    this.UsersList.push({
      email: this.getCurrentUser,
      comment: data.comment,
      rating: this.rate,
      shopId: this.getHotelId,
    });
  }


  createForm() {
    this.feedbackForm = this.fb.group({
      email: ['', Validators.required],
      comment: ['', Validators.required],
      rating: ['', Validators.required],
      shopId: ['', Validators.required],
    });
  }

  key1;
  shopIID;
  average() {
    this.shopIID = this.getHotelId;
    this.firebase.list('/ShopFeedback', ref => ref.orderByChild('shopId').equalTo(this.shopIID)).snapshotChanges().pipe(
      map(actions => actions.map(a => ({ key: a.key, shopId: a.key, rating: a.key, ...a.payload.val() }))
      )
    ).subscribe(result => {
      this.shopId = result.map(item => item.shopId)
      this.FeedbackRating = result.map(item => item.rating)

      var sumNumber = this.FeedbackRating.reduce((acc, cur) => acc + Number(cur), 0)
      var length = this.FeedbackRating.length
      this.avg = sumNumber / length
      console.log(this.avg)

      this.firebase.list('/Shopping', ref => ref.orderByChild('title').equalTo(this.shopIID)).snapshotChanges().pipe(
        map(actions =>
          actions.map(a => ({ key: a.key, ...a.payload.val() }))
        )
      ).subscribe(users => {
        this.key1 = users.map(item => item.key);
        // console.log(this.key1[0]);

        this.firebase.list('/Shopping').update(this.key1[0], { service_rating: this.avg, })
        console.log("Success")
      });

    });
  }

  onSubmit(feedbackForm) {
    if (feedbackForm.value == undefined) {
      console.log("please enter value first")
    }
    else {
      this.insertData(feedbackForm.value)
      console.log(feedbackForm.value)
      alert("Feedback is successfully submitted...")
      this.router.navigate(['/holy/shopping'])
      this.average();
    }
  }

}

