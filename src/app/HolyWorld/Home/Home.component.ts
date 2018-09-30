import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { empty } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})


export class HomeComponent implements OnInit {
  public map: any = { lat: 51.678418, lng: 7.809007 };

  public loading = true;

  selectedCountry = 0;
  selectedVehicle = 0;
 
  s;
  search: FormGroup;

  userList: AngularFireList<any>;
  listCity: any[];
  listVehicle: any[];
  listDriver =[];
  events: any[];

  constructor(
    private _formBuilder: FormBuilder,
    private db :AngularFireDatabase,

  ) { }

  ngOnInit() {
    this.search = this._formBuilder.group({
      country: [''],
      // to: [''],
      vehicle: [''],
      country1: [''],
      
  });

  this.db.list('/MasterCities').snapshotChanges().pipe(
    map(actions =>
      actions.map(c => ({ key: c.payload.key, ...c.payload.val()  }))
    )
  ).subscribe(MasterCities => {
   this.listCity = MasterCities; 
   this.loading = false;

  //  console.log(this.listCity[2]);
  });

  this.db.list('/Events', ref => ref.limitToLast(2)).snapshotChanges().pipe(
    map(actions => actions.map(a => ({ key: a.key, ...a.payload.val() }))
    )
  ).subscribe(result => {
    this.events = result;
    });

}

  onSelectCountry() {
    this.s = this.search.value.country;
    // console.log(this.s)

    this.db.list('/Vehicles', ref => ref.orderByChild('city_id').equalTo(this.s)).snapshotChanges().pipe(
      map(actions =>
        actions.map(a => ({ key: a.key, city_id: a.key, name: a.key, ...a.payload.val() }))
      )
    ).subscribe(Vehicles => {
      this.listVehicle = Vehicles;  
      // console.log(this.listVehicle)   
    });

  }

  name: any[];
  contact: any[];
  fare: any[];
  vehicle: any[];
  

  fun(){
    this.listDriver.length= 0;
    this.s = this.search.value.country;
    this.db.list('/Drivers', ref => ref.orderByChild('city').equalTo(this.s)).snapshotChanges().pipe(
      map(actions =>
        actions.map(a => ({ key :a.key, city: a.key, vtype: a.key, ...a.payload.val() }))
      )
    ).subscribe(Drivers => {
            
      Drivers.forEach(item => {
        if (item.city == this.search.value.country && item.vtype == this.search.value.vehicle) {
          // console.log(this.selectedCountry);
      // console.log(item); 
        this.listDriver.push(item);  
        console.log(this.search.value)
        }
        });
    });
  }
}
