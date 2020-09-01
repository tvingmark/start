import { h, Component, Fragment } from 'preact';
import 'preact/debug';
import { divIcon } from 'leaflet';
import {
  Map, Marker, MarkerCluster, Polyline, TileLayer,
} from '../utils/leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import '../style/index.css';
import route from '../data/long-route';
import hopp from '../data/hopp'

const getRouteConfig = (hash) => {
  switch (hash) {
    case '#cluster':
      return {
        mapCenter: [63.83919, 20.15069],
        markerCluster: [
          [63.8374896962485, 20.163206074534],
          [63.9374896962485, 20.163206074534],
          [63.7374896962485, 20.163206074534],
          [63.8574896962485, 20.163206074534],
          [63.8174896962485, 20.163206074534],
          [63.8274896962485, 20.163206074534],
          [63.8974896962485, 20.163206074534],
        ],
        markers: [],
        polylines: [],
        zoom: 8,
      };
    case '#polyline':
      return {
        mapCenter: [63.83919, 20.15069],
        markerCluster: false,
        markers: [
          [59.3367, 18.0667],
          [63.8374896962485, 20.163206074534],
        ],
        polylines: [
          route,
        ],
        zoom: 5,
      };
    default:
      return {
        mapCenter: [64.122136, -21.872780],
        markerCluster: false,
        markers: hopp.data.bikes.map(function (bike) {
            return [bike.lat, bike.lon]
        }),     
        polylines: [],
        zoom: 13,
      };
  }
};


export default class Leaf extends Component {
  constructor(props) {
    super(props);
    this.state = getRouteConfig("#simple");
    // console.dir(hopp.data.bikes.map(bike => return [bike.lat, bike.lon]),
    console.dir(hopp.data.bikes.map(function (bike) {
        return [bike.lat, bike.lon]
    }))
  }

  componentDidMount() {
    window.addEventListener('popstate', () => {
      this.setState(getRouteConfig(window.location.hash));
    });
  }
  
  render({}, {
    mapCenter, markerCluster, markers, polylines, zoom,
  }) {
    return (
      <Fragment>
        <header>
          <h5>Stopp.app</h5>
        </header>
        <Map center={mapCenter} style={{ height: '100%' }} zoom={zoom}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {markers.map(position => (
            <Marker icon={divIcon()} position={position} />
          ))}
          {polylines.map(positions => (
            <Polyline positions={positions} />
          ))}
          {markerCluster && (
            <MarkerCluster key="cluster">
              {markerCluster.map(position => (
                <Marker key={position.join(',')} icon={divIcon()} position={position} />
              ))}
            </MarkerCluster>
          )}
        </Map>
      </Fragment>
    );
  }
}
