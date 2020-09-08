import { h, Component, Fragment } from 'preact';
import 'preact/debug';
import { divIcon } from 'leaflet';
import {
  Map, Marker, MarkerCluster, Polyline, TileLayer,
} from '../utils/leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import '../style/index.css';

import { StoppIcon } from '../assets/svg'
import WorkerFetch from '../data/fetch.worker'

import route from '../data/long-route';
import hopp from '../data/hopp'
import hopp02 from '../data/hopp02'

import { wrap } from 'comlink'


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
        zoom: 14,
      };
  }
};

const zoomToLocation = (location) => {

}

async function wwinit(){
    const worker = new WorkerFetch()
    const obj = wrap(worker)
    alert(`Counter: ${await obj.counter}`);
    await obj.inc()
    alert(`Counter: ${await obj.counter}`);
}

export default class Leaf extends Component {
  constructor(props) {
    super(props);
    this.state = getRouteConfig("#simple");
    // console.dir(hopp.data.bikes.map(bike => return [bike.lat, bike.lon]),
    console.dir(hopp.data.bikes.map(function (bike) {
        return [bike.lat, bike.lon]
    }))
    wwinit()

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
      <div className="leaf">
        <div
            style={{
                position: 'absolute',
                top: 0,
                background: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                padding: '15px 0px',
                width: '100%',
                zIndex: 5000
                
            }}>
            <StoppIcon
                style={{
                    height: '55px'
                }}    
            />
        </div>
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
      </div>
    );
  }
}
