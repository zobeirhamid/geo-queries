// @flow
export type Coordinate = {
  latitude: number,
  longitude: number
};

export type GeoBox = {
  southWest: Coordinate,
  northEast: Coordinate
};
