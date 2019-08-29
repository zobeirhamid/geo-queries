// @flow
import { sprintf } from 'sprintf-js';
import type { GeoBox, Coordinate } from './types';
import GeoRegion from './GeoRegion';

export default class GeoQuery {
  latitudeKey: string;

  longitudeKey: string;

  geoRegion: GeoRegion;

  constructor(latitudeKey: string, longitudeKey: string) {
    this.latitudeKey = latitudeKey;
    this.longitudeKey = longitudeKey;
  }

  // Requires Functions
  forDistance(center: Coordinate): string {
    const baseQuery: string =
      'ROUND((6371 * 2 * ASIN(SQRT( POWER(SIN(( %3$f - %1$f) *  pi()/180 / 2), 2) +COS( %3$f * pi()/180) * COS(%1$f * pi()/180) * POWER(SIN(( %4$f - %2$f) * pi()/180 / 2), 2) ))), 2)';
    const query: string = sprintf(
      baseQuery,
      this.latitudeKey,
      this.longitudeKey,
      center.latitude,
      center.longitude
    );
    return query;
  }

  forInBox(geoBox: GeoBox): string {
    const baseQuery: string =
      '%1$s <= %3$f AND %2$s >= %4$f AND %1$s >= %5$f AND %2$s <= %6$f';
    const query: string = sprintf(
      baseQuery,
      this.latitudeKey,
      this.longitudeKey,
      geoBox.northEast.latitude,
      geoBox.southWest.longitude,
      geoBox.southWest.latitude,
      geoBox.northEast.longitude
    );

    return query;
  }

  forOrder({ latitude, longitude }: Coordinate): string {
    const baseQuery: string =
      '(%3$s - %1$s) * (%3$s - %1$s) + (%4$s - %2$s) * (%4$s - %2$s)';
    const query: string = sprintf(
      baseQuery,
      this.latitudeKey,
      this.longitudeKey,
      latitude,
      longitude
    );

    return query;
  }
}

export function createGeoQuery(
  center: Coordinate,
  radius: number,
  latitudeKey: string,
  longitudeKey: string
): GeoQuery {
  const geoRegion: GeoRegion = new GeoRegion(center, radius);
  const geoQuery: GeoQuery = new GeoQuery(latitudeKey, longitudeKey, geoRegion);
  return geoQuery;
}
