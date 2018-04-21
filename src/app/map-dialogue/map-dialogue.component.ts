import {AfterViewInit, Component, ElementRef, Inject, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';

@Component({
  selector: 'app-map-dialogue',
  templateUrl: './map-dialogue.component.html',
  styleUrls: ['./map-dialogue.component.css']
})
export class MapDialogueComponent implements OnInit, AfterViewInit {

  mapForm: FormGroup;
  rUnit: any[];
  zTypes: any[];

  @ViewChild('origin') originRef: ElementRef;

  constructor(private dialogRef: MatDialogRef<MapDialogueComponent>, private fb: FormBuilder, private ngZone: NgZone,
              private mapsAPILoader: MapsAPILoader, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.mapForm = this.fb.group({
      address: ['', Validators.required],
      lat: ['', Validators.required],
      lng: ['', Validators.required],
      radius: ['', Validators.required],
      radUnit: ['', Validators.required],
      zType: ['', Validators.required]
    });

    this.rUnit = [
      'miles',
      'feet'
    ];

    this.zTypes = [
      'Safe', 'Danger', 'Medical', 'Fire', 'Flood'
    ];
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
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

}
