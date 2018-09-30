import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HolyWorldComponent } from './HolyWorld.component';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';

import { SlickModule } from 'ngx-slick';
import { LoadingModule, ANIMATION_TYPES  } from 'ngx-loading';

import { FlexLayoutModule } from "@angular/flex-layout";
import { AgmCoreModule } from '@agm/core';
import { AuthService } from "./core/auth.service";
import { HomeComponent } from "./Home/Home.component";
import { AboutComponent } from "./about/about.component";
import { VisitPointsComponent } from "./visitPoints/visitPoints.component";
import { ShoppingComponent } from "./shopping/shopping.component";
import { BarRatingModule } from "ngx-bar-rating";
import { FeedbackComponent } from "./hotels/feedback/feedback.component";
import { HotelsComponent } from "./hotels/hotels.component";
import { LiteratureComponent } from "./literature/literature.component";

import { RatingModule } from 'ngx-rating';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { Feedback1Component } from "./shopping/Feedback1/Feedback1.component";

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
} 

const routes: Routes = [
  // {path:'', redirectTo:'holy/visit', pathMatch:'full'},

  {path: 'holy',
  component: HolyWorldComponent,
  children: [
    {path: 'home', component: HomeComponent},
    {path: 'visit', component: VisitPointsComponent},
    {path: 'about', component: AboutComponent},
    {path: 'shopping', component: ShoppingComponent},
    {path: 'feedback', component: FeedbackComponent},
    {path: 'hotels', component: HotelsComponent},
    {path: 'literature', component: LiteratureComponent},
    {path: 'feedback1', component: Feedback1Component},

  ]
}
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,  
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBHpi51gZecun5aPqfPoRSJYiuo-877O-Q'
    }),  
    Ng2CarouselamosModule,
    SlickModule.forRoot(),
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.0)', 
      backdropBorderRadius: '4px',
      primaryColour: '#fa9e1b', 
      secondaryColour: '#8d4fff', 
      tertiaryColour: '#fa9e1b'
  }),
  BarRatingModule,
  RatingModule

  ],

  providers: [
    AuthService,
    HotelsComponent,
    ShoppingComponent
  ],
  declarations: [
    HolyWorldComponent, 
    HomeComponent, 
    AboutComponent, 
    VisitPointsComponent,
    ShoppingComponent,
    FeedbackComponent,
    HotelsComponent,
    LiteratureComponent,
    SafePipe,
    Feedback1Component
  ]
})
export class HolyWorldModule { }
