import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'

function WindowWidth(props) {
  const [width, setWidth] = useState(0);

  function onResize() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return <div>Window width: {width}</div>;
}

export default WindowWidth