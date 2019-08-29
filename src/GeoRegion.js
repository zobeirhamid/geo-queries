// @flow
import geolib from 'geolib';
import type { GeoBox, Coordinate } from './types';

export default class GeoRegion {
  center: Coordinate = { latitude: 0, longitude: 0 };

  radius: number = 0;

  geoBox: ?GeoBox;

  hasGeoBox() {
    return this.geoBox && true;
  }

  setGeoBox(geoBox: GeoBox) {
    this.geoBox = geoBox;
  }

  calculateBoxWithCenterAndRadius() {
    const boxCoordinate: Array<Coordinate> = geolib.getBoundsOfDistance(
      this.center,
      this.radius
    );
    this.setGeoBox({
      southWest: boxCoordinate[0],
      northEast: boxCoordinate[1]
    });
  }

  getGeoBox(): ?GeoBox {
    if (!this.hasGeoBox() && this.hasCenter() && this.hasRadius()) {
      const boxCoordinate: Array<Coordinate> = geolib.getBoundsOfDistance(
        this.center,
        this.radius
      );
      this.geoBox = {
        southWest: boxCoordinate[0],
        northEast: boxCoordinate[1]
      };
    }
    return this.geoBox;
  }

  hasCenter() {
    return this.center && true;
  }

  setCenter(center: Coordinate) {
    this.center = center;
  }

  calculateCenterWithBox() {
    this.setCenter(geolib.getCenter(Object.values(this.geoBox)));
  }

  getCenter(): ?Coordinate {
    if (!this.hasCenter() && this.hasGeoBox()) this.calculateCenterWithBox();
    return this.center;
  }

  hasRadius() {
    return this.radius && true;
  }

  setRadius(radius: number) {
    this.radius = radius;
  }

  getRadius(): ?number {
    return this.radius;
  }
}
