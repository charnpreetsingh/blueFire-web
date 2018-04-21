import {AfterViewInit, Component, ElementRef, Inject, NgZone, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import {MapCommsService} from '../map-comms.service';

@Component({
  selector: 'app-map-dialogue',
  templateUrl: './map-dialogue.component.html',
  styleUrls: ['./map-dialogue.component.css']
})
export class MapDialogueComponent implements OnInit, AfterViewInit, OnDestroy {

  mapForm: FormGroup;
  zTypes: any[];
  addressVisible = true;

  @ViewChild('origin') originRef: ElementRef;

  constructor(private dialogRef: MatDialogRef<MapDialogueComponent>, private fb: FormBuilder, private ngZone: NgZone,
              private mapsAPILoader: MapsAPILoader, @Inject(MAT_DIALOG_DATA) private data: any, private mapComs: MapCommsService) {
    this.mapForm = this.fb.group({
      address: ['', Validators.required],
      lat: ['', Validators.required],
      lng: ['', Validators.required],
      radius: ['', Validators.required],
      zType: ['', Validators.required]
    });

    this.zTypes = [
      'Safe', 'Danger', 'Medical', 'Fire', 'Flood'
    ];
  }

  ngOnInit() {
    if (this.mapComs.tempLng || this.mapComs.tempPoint) {
      this.mapForm.get('address').patchValue("N/A");
      this.addressVisible = false;
      if (this.mapComs.tempLng && this.mapComs.tempLat) {
        this.mapForm.get('lat').patchValue(this.mapComs.tempLat);
        this.mapForm.get('lng').patchValue(this.mapComs.tempLng);
      }
      if (this.mapComs.tempPoint) {
        // load tempPoint data
      }
    }
  }

  ngAfterViewInit() {
    if (this.mapForm.get('address').value === "N/A") {
      return;
    }
    this.mapsAPILoader.load().then(() => {
      let originAutocomplete = new google.maps.places.Autocomplete(this.originRef.nativeElement, {
        componentRestrictions: {country: 'us'},
      });

      originAutocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = originAutocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          let latNum = place.geometry.location.lat();
          let longNum = place.geometry.location.lng();

          // TO DO formatted_address is not given a guranteed format by Google Place API
          this.mapForm.get('address').patchValue(place.formatted_address);
          this.mapForm.get('lat').patchValue(latNum);
          this.mapForm.get('lng').patchValue(longNum);


          //set latitude, longitude and zoom
          // this.latitude = place.geometry.location.lat();
          // this.longitude = place.geometry.location.lng();
          // this.zoom = 12;
        });
      });

    });
  }

  ngOnDestroy() {
    this.mapComs.resetTempVals();
  }

}
