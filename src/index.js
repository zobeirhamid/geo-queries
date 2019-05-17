import { createGeoQuery } from './GeoQuery';

export function getQueryForInBox(...args) {
  const geoQuery = createGeoQuery(...args);
  return geoQuery.forInBox();
}

export function getQueryForDistance(...args) {
  const geoQuery = createGeoQuery(...args);
  return geoQuery.forDistance();
}

export function getQueryForOrder(...args) {
  const geoQuery = createGeoQuery(...args);
  return geoQuery.forOrder();
}
