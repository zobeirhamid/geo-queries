import QueryBuilder from './QueryBuilder';
import GeoRegion from './GeoRegion';

export default class GeoQuery {
  constructor(center, radius, geoBox) {
    this.geoRegion = new GeoRegion();
    if (center) this.geoRegion.setCenter(center);
    if (radius) this.geoRegion.setRadius(radius);
    if (geoBox) this.geoRegion.setGeoBox(geoBox);
  }

  getInBox() {
    return QueryBuilder.forInBox(this.geoRegion.getGeoBox());
  }

  getForOrder() {
    return QueryBuilder.forOrder(this.geoRegion.getCenter());
  }

  getForDistance() {
    return QueryBuilder.forDistance(this.geoRegion.getCenter());
  }
}
