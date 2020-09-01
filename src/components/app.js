import { h, Component } from 'preact';

import Leaf from "./leaf"

export default class App extends Component {
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */

  render() {
    return (
      <div id="app">
        <Leaf path="/leaf/" />
      </div>
    );
  }
}
