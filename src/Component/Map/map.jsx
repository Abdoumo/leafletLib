import React , { useRef, useState , useEffect } from 'react'
import {  TileLayer  , Marker , LayersControl ,  MapContainer , Popup, useMapEvents  } from 'react-leaflet'
import L from 'leaflet';
// import PrintControlDefault from 'react-leaflet-easyprint';
import 'leaflet/dist/leaflet.css'
import "leaflet.vectorgrid";

// import "dist/leaflet.easyPrint.js"
// import { esriStyle } from "./Style.jsx";
import "../../../node_modules/leaflet.browser.print/dist/leaflet.browser.print.min.js";

import '../../index.css'
import FormInputs from './FormInputs';

// import PrintControlDefault from "react-leaflet-easyprint";



const MapCm = () => {

   



    const [position, setPosition] = useState(null)
    const [ center , setCenter ] = useState({ lat : 51 , lng : 5 })
    const [ coors , setCoors ] = useState({ lat : 0 , lang : 0 })
    const [map , setMap] = useState(null)
    

//     var customActionToPrint = function(context, mode) {
// 	return function() {
// 		window.alert("We are printing the MAP. Let's do Custom print here!");
// 		context._printMode(mode);
// 	}
// };


//     L.control.browserPrint({
// 	title: 'Just print me!',
// 	documentTitle: 'Map printed using leaflet.browser.print plugin',
// 	printLayer: L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
// 					attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
// 					subdomains: 'abcd',
// 					minZoom: 1,
// 					maxZoom: 16,
// 					ext: 'png'
// 				}),
// 	closePopupsOnPrint: false,
// 	printModes: [
//             L.BrowserPrint.Mode.Landscape("Tabloid",{title: "Tabloid VIEW"}),
//             L.browserPrint.mode("Alert",{title:"User specified print action",pageSize: "A6", action: customActionToPrint, invalidateBounds: false}),
//             L.BrowserPrint.Mode.Landscape(),
//             "Portrait",
//             L.BrowserPrint.Mode.Auto("B4",{title: "Auto"}),
//             L.BrowserPrint.Mode.Custom("B5",{title:"Select area"})
// 	],
// 	manualMode: false
// }).addTo(map);
    let mapTypes = {
    Basic : "https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=iYMRJAQIV6QkqGelkuwh" ,
    Street : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" ,
    NasaMap : "https://gibs-{s}.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default//EPSG3857_500m/{z}/{y}/{x}.jpeg",
     Satilite : "https://api.maptiler.com/maps/cadastre-satellite/256/{z}/{x}/{y}.png?key=iYMRJAQIV6QkqGelkuwh" ,
     Hillshading : "https://api.maptiler.com/tiles/hillshade/{z}/{x}/{y}.webp?key=iYMRJAQIV6QkqGelkuwh" ,
    }
    
    let attribution2 = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    const ZOOM_LEVEL = 9;

    
    const mapRef = useRef();

    // var browserControl = L.control.browserPrint()
 

console.log(mapRef.current , 'mapRef')
const flyToCoors = () => {
    let co  = [parseFloat(coors.lat) , parseFloat(coors.lang)]
     flyToLanglat = <Marker position={co}><Popup>You are here</Popup></Marker>
     mapRef.current?.flyTo(co)
    console.log('co' , co)
    return flyToLanglat
}


var flyToLanglat = coors === 0 ? null : flyToCoors()
    
    function LocationMarker() {
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
        console.log(map , 'thats map')
      setPosition(e.latlng)
      console.log(position)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

const { BaseLayer } = LayersControl;
 
    
    
    useEffect(() => {
        
    }, [center])
    delete L.Icon.Default.prototype._getIconUrl;
    

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('../assets/marker-icon-2x.png'),
  iconUrl: require('../assets/marker-icon.png'),
  shadowUrl: require('../assets/marker-shadow.png')
});

  return (
    <div id="leafletmap">
    <FormInputs coors={setCoors}  setCoors={setCoors} />
    <MapContainer id='Map' ref={mapRef} center={center} zoom={ZOOM_LEVEL} whenCreated={setMap}
    >
    <LayersControl>
    {
        Object.keys(mapTypes)?.map((ele, ind) => (
            <BaseLayer checked key={ind} name={ele}>
        <TileLayer 
            url = {mapTypes[ele]}
            attribution = {attribution2}
            />
        </BaseLayer>
        ))
    }
        
        
    </LayersControl>

    {flyToLanglat}
    <Marker position={[51.505, 5]}
    >
    <Popup>
    Here is the  <br /> Module Name.
    </Popup>
    </Marker>
    <Marker position={[52.505, -0.09]}

    >
    <Popup>
      Here is the  <br /> Module Name.
    </Popup>
    </Marker>
    <LocationMarker />
    </MapContainer>
    </div>
  )
}

export default MapCm