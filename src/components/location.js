import { h } from 'preact';
import { useState } from 'preact/hooks';
import { getLocation } from '../utils/'

function Location() {
    const [loc, setLocation] = useState({long: 0, lat: 0 })
    
    const getLocation = useCallBack( () => {
        console.log(getLocation())
    })
}


// Fetch Location
// Async
// Fetch nearest hopp
// Fetch nearest station

// Add destination