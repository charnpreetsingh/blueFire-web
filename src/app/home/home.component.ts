import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {MapDialogueComponent} from '../map-dialogue/map-dialogue.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title: string = 'Live Map';
  lat: number = 39;
  lng: number = -98;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openMapDialog() {
    const dialogRef = this.dialog.open(MapDialogueComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.invalid === undefined || result.invalid) {
        return;
      }
      const receivedMapForm = result.value;
      const newPoint = {
        lat: receivedMapForm.lat,
        lng: receivedMapForm.lng,
        radius: receivedMapForm.radius,
        radUnit: receivedMapForm.radUnit,
        zType: receivedMapForm.zType
      };

      this.lat = newPoint.lat;
      this.lng = newPoint.lng;
    });
  }

}
