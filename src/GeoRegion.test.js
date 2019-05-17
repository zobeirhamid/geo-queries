import geolib from 'geolib';
import GeoRegion from './GeoRegion';

jest.mock('geolib');

describe('GeoRegion', () => {
  const dalyCityCoordinate = {
    latitude: 37.6879,
    longitude: 122.4702
  };
  const alamedaCoordinate = {
    latitude: 37.7652,
    longitude: 122.2416
  };
  geolib.getBoundsOfDistance.mockReturnValue([
    dalyCityCoordinate,
    alamedaCoordinate
  ]);

  const center = {
    latitude: 37.7749,
    longitude: 122.4194
  };

  const radius = 5;
  let geoRegion;
  beforeEach(() => {
    geolib.getBoundsOfDistance.mockClear();
    geoRegion = new GeoRegion(center, radius);
  });

  it('is initializable', () => {
    expect(new GeoRegion(center, radius)).toBeInstanceOf(GeoRegion);
  });

  it('can return the center', () => {
    expect(geoRegion.getCenter()).toBe(center);
  });

  it('can return the radius', () => {
    expect(geoRegion.getRadius()).toBe(radius);
  });

  it('can calculate the geo box', () => {
    expect(geoRegion.getGeoBox()).toStrictEqual({
      southWest: dalyCityCoordinate,
      northEast: alamedaCoordinate
    });
    geoRegion.getGeoBox();
    expect(geolib.getBoundsOfDistance).toHaveBeenCalledTimes(1);
  });

  it('calculate the geo box only once', () => {
    expect(geolib.getBoundsOfDistance).toHaveBeenCalledTimes(0);
    geoRegion.getGeoBox();
    geoRegion.getGeoBox();
    geoRegion.getGeoBox();
    geoRegion.getGeoBox();
    expect(geolib.getBoundsOfDistance).toHaveBeenCalledTimes(1);
  });
});
