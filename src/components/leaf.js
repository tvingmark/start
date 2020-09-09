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

import DigitalClock from '../components/clock'
import WindowWidth from '../components/wwidth'

import route from '../data/long-route';
import hopp01 from '../data/hopp'
import hopp02 from '../data/hopp02'
import hopp03 from '../data/hopp03'
import hopp04 from '../data/hopp04'
import bus01 from '../data/bus01'
import bus02 from '../data/bus02'
import bus03 from '../data/bus03'
import bus04 from '../data/bus04'

import { wrap } from 'comlink'


const getRouteConfig = () => {
      const number = Math.floor(Math.random() * 4);
      let hoppbikes, bus;
      switch (number) {
          case 1:
              hoppbikes = hopp02
              bus = bus02
              break;
          case 2:
              hoppbikes = hopp03
              bus = bus03
              break;
          case 3:
              hoppbikes = hopp04
              bus = bus04
              break;
          default:
              console.log('Hoppipolla')
              hoppbikes = hopp01
              bus = bus01
              break;
      }
      console.log(number)

      return {
        mapCenter: [64.122136, -21.872780],
        markerCluster: false,
        markers: hoppbikes.data.bikes.map(function (bike) {
            return [bike.lat, bike.lon]
        }),
        busmarkers: bus.positions.map(function (bus){
            return [bus.lat, bus.lon]
        }),
        polylines: [],
        zoom: 12,
      };
};

const zoomToLocation = (location) => {

}

async function wwinit(){
    const worker = new WorkerFetch()
    const obj = wrap(worker)
    console.log(`Counter: ${await obj.counter}`);
    await obj.inc()
    await obj.data()
    console.log(`Counter: ${await obj.counter}`);
}

export default class Leaf extends Component {
  constructor(props) {
    super(props);
    this.state = getRouteConfig();
    // console.dir(hopp.data.bikes.map(bike => return [bike.lat, bike.lon]),
    // console.dir(hopp.data.bikes.map(function (bike) {
    //     return [bike.lat, bike.lon]
    // }))
  }

  // Called just before our component will be destroyed
  componentWillUnmount() {
    // stop when not renderable
    clearInterval(this.timer);
  }  

  componentDidMount() {
    wwinit()
    this.timer = setInterval(() => {
      this.setState(getRouteConfig());
    }, 1000);    
  }
  
  render({}, {
    mapCenter, markerCluster, markers, busmarkers, polylines, zoom,
  }) {

    console.dir(busmarkers)
    return (
      <div className="leaf">
        <div
            style={{
                position: 'absolute',
                top: 0,
                background: 'white',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                paddingTop: '5px',
                width: '100%',
                zIndex: 5000
                
            }}>
            <StoppIcon
                onClick={() => this.setState(getRouteConfig())}
                style={{
                    height: '55px'
                }}    
            />
            <span><DigitalClock / ></span>
        </div>
        <WindowWidth />
        <Map center={mapCenter} style={{ height: '100%' }} zoom={zoom}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {markers.map(position => (
            <Marker key={position.lat}icon={divIcon()} position={position} />
          ))}
          {busmarkers.map(position => (
            <Marker key={position.lat} icon={divIcon({className: 'leaflet-div-icon bus-div-icon', html: 'bus'})} position={position} />
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
