import { Injectable } from '@angular/core';

@Injectable()
export class MapCommsService {

  tempLat: number;
  tempLng: number;
  tempPoint: any;

  constructor() {
    this.tempLat = null;
    this.tempLng = null;
    this.tempPoint = null;
  }

  resetTempVals() {
    this.tempLat = null;
    this.tempLng = null;
    this.tempPoint = null;
  }

}
