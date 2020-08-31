import { h } from 'preact';
import style from './style';
import { getLocation } from '../../utils'

const Home = () => (
  <div class={style.home}>
    <h1>Strætó eða hopp</h1>
    <p>Sjáðu hvernig veðrar í leiðinni.</p>
    <button onClick={getLocation}
        >Fetch location</button>
    <p>Your location is: <span>-64.232 43.2323</span></p>
  </div>
);

export default Home;
