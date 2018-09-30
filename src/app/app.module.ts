import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HolyWorldModule } from "./HolyWorld/HolyWorld.module";
import { Ng2CarouselamosModule } from 'ng2-carouselamos';

import { AgmCoreModule } from '@agm/core';
import { SlickModule } from 'ngx-slick';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';
import { LoadingModule } from 'ngx-loading';
import { BarRatingModule } from "ngx-bar-rating";

import { RatingModule } from 'ngx-rating';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
} 

const routes: Routes = [
  {path:'', redirectTo:'/holy', pathMatch:'full'},
  {path:'holy', loadChildren:'./HolyWorld/HolyWorld.module#HolyWorldModule'},
];


@NgModule({
   declarations: [
      AppComponent,
      SafePipe
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HolyWorldModule,
      RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBpJg2v-vEJYqnyfApV7o5NoPzq8Pr6UMc'
    }),
    LoadingModule,
    Ng2CarouselamosModule,
    SlickModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BarRatingModule,
    RatingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
