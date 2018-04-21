import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {MapDialogueComponent} from '../map-dialogue/map-dialogue.component';
import {} from '@types/googlemaps';
import {MapCommsService} from '../map-comms.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title: string = 'Live Zone Map';
  lat: number = 36;
  lng: number = -119;
  zoom: number = 6;
  markers: any[];
  markersRef: Observable<any[]>;
  tempKey: any = null;
  isEditing: boolean = false;

  constructor(private dialog: MatDialog, private mapComs: MapCommsService,  private db: AngularFireDatabase) { }

  ngOnInit() {
    // Call FB here and get data
    this.markers = [];
    this.db.list('DangerZone').snapshotChanges().subscribe(
      actions => {
        let tempMarkersRef = [];
        actions.forEach(
          action => {
            // console.log(action);
            // console.log(action.type);
            // console.log(action.key);
            // console.log(action.payload.val());
            if (action.key !== 'init') {
              let markerObj = action.payload.val();
              markerObj.key = action.key;
              tempMarkersRef.push(markerObj);
            }
          }
        );
        // done with current update
        // update the markersRef here, since done
        this.markers = [...tempMarkersRef];
      }
    );
  }

  openMapDialog() {
    const dialogRef = this.dialog.open(MapDialogueComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.invalid === undefined || result.invalid) {
        if (this.isEditing) {
          this.isEditing = false;
          this.tempKey = null;
        }
        return;
      }
      const receivedMapForm = result.value;
      const newPoint = {
        lat: receivedMapForm.lat,
        lng: receivedMapForm.lng,
        radius: receivedMapForm.radius,
        zType: receivedMapForm.zType
      };
      if (this.isEditing) {
        this.db.list('DangerZone').set(this.tempKey, newPoint);
        this.tempKey = null;
      }
      else {
        // push to FB new data
        this.db.list('DangerZone').push(newPoint);
      }
      this.lat = newPoint.lat;
      this.lng = newPoint.lng;
    });
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  // $event is actually a MouseEvent, using any to ignore TS compiler errors
  mapClicked($event: any) {
    // console.log($event);
    this.mapComs.tempLat = $event.coords.lat;
    this.mapComs.tempLng = $event.coords.lng;
    this.openMapDialog();
  }

  removeZone(m) {
    console.log(m);
    this.db.list('DangerZone').remove(m.key);
  }

  editZone(m) {
    this.mapComs.tempPoint = m;
    this.tempKey = m.key;
    this.isEditing = true;
    this.openMapDialog();
  }

  mapTypeToColor(zType) {
    if (zType === "Safe") {
      return "green";
    }
    else if (zType === "Danger") {
      return "yellow";
    }
    else if (zType === "Medical") {
      return "orange";
    }
    else if (zType === "Fire") {
      return "red";
    }
    else if (zType === "Flood") {
      return "blue";
    }
    return "black";
  }

  mapTypeToIcon(zType) {
    if (zType === "Safe") {
      return "green";
    }
    else if (zType === "Danger") {
      return "yellow";
    }
    else if (zType === "Medical") {
      return "orange";
    }
    else if (zType === "Fire") {
      return "red";
    }
    else if (zType === "Flood") {
      return "blue";
    }
    return "black";
  }


  markerDragEnd(m, $event: any) {
    // console.log('dragEnd', m, $event);
  }

}
