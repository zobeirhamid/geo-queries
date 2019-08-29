type Coordinate = {
  latitude: number,
  longitude: number
};

declare module 'geolib' {
  declare function getBoundsOfDistance(
    centerCoordinate: Coordinate,
    radius: number
  ): Array<Coordinate>;
  declare function getCenter(coordinates: Array<mixed>): Coordinate;
}
