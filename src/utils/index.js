export function getLocation(){
  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    // status.textContent = '';
    // mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    // mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    console.log(latitude)
    console.log(longitude)
    return {
        "ok": true,
        result : {
            long: longitude,
            lat: latitude
        }
    }
  }

  function error() {
    return {"ok": false, "error": "current"}
  }

  if(!navigator.geolocation) {
    return {"ok": false, "error": "permission"}
  } else {
    return navigator.geolocation.getCurrentPosition(success, error);
  } 
}