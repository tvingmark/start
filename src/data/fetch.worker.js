import { expose } from 'comlink';
import axios from 'redaxios';
import busLocation from './bus01'

const obj = {
  counter: 0,
  inc() {
    this.counter++;
  },

// fetch buses, send to ui thread.
  data(){
     console.dir(busLocation)
     return 
    //   https://app.straeto.is/pele/api/v1/positions/filter/11
  }
};


expose(obj);
