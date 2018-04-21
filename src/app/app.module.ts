import { BrowserModule } from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

// Google Maps Angular Component Library
import {AgmCoreModule} from '@agm/core';

// AngularFire imports
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {environment} from '../environments/environment';

import {CdkTableModule} from '@angular/cdk/table';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MapDialogueComponent } from './map-dialogue/map-dialogue.component';
import {MapCommsService} from './map-comms.service';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MapDialogueComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAE11bLsYZt43ZUzOqbl3R86gQ_bqlkTSY',
      libraries: ["places"]
    }),
    AngularFireModule.initializeApp(environment.firebase), AngularFireAuthModule, AngularFireDatabaseModule,
    CdkTableModule, LayoutModule,
    MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule, MatDialogModule, MatInputModule,
    MatNativeDateModule, MatDatepickerModule,
    MatRadioModule, MatSelectModule
  ],
  entryComponents: [
    MapDialogueComponent
  ],
  providers: [
    MapCommsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
