import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  fGroup: FormGroup;
  emailCtrl: FormControl;
  f: any[];
  d: any[];
  features: any[];
  bank: any[];

  public loading = true;

  constructor(private fBuilder: FormBuilder, private db: AngularFireDatabase, ) {
    this.fGroup = fBuilder.group({
      email: ['', Validators.email],
      name: ['', Validators.email],
      message: ['', Validators.email]
    });
  }

  ngOnInit() {
    this.db.list('/About').snapshotChanges().pipe(
      map(actions =>
        actions.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(About => {
      this.f = About;
      this.loading = false;

      // console.log(this.f)
    });


    this.db.list('/images').snapshotChanges().pipe(
      map(actions =>
        actions.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(images => {
      this.d = images;
      this.loading = false;
    });

    this.db.list('/AboutFeatures').snapshotChanges().pipe(
      map(actions =>
        actions.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(AboutFeatures => {
      this.features = AboutFeatures;
      this.loading = false;
    });

    this.db.list('/BankDetails').snapshotChanges().pipe(
      map(actions =>
        actions.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(BankDetails => {
      this.bank = BankDetails;
    });

  }

  add(fGroup) {
    this.db.list('/Suggestion').push({ name: fGroup.name, email: fGroup.email, message: fGroup.message })
  }

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dots: true,
    infinite: true,
    speed: 100,
    fade: true,
    cssEase: 'linear'
  };


  sendMsg() {
    alert("Message successfully send...")
  }


}