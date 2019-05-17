// @flow
import geolib from 'geolib';
import type { GeoBox, Coordinate } from './types';

export default class GeoRegion {
  center: Coordinate;

  radius: number;

  geoBox: ?GeoBox;

  constructor(center: Coordinate, radius: number) {
    this.center = center;
    this.radius = radius;
  }

  getGeoBox(): GeoBox {
    if (!this.geoBox) {
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

  getCenter(): Coordinate {
    return this.center;
  }

  getRadius(): number {
    return this.radius;
  }
}
