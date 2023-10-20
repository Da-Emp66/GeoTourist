import { Ion, IonImageryProvider, Terrain, Viewer, Cartesian3, Math, createOsmBuildingsAsync } from "cesium";
// import "cesium/Build/Cesium/Widgets/widgets.css";
import logo from './logo.svg';
import './App.css';
import React from 'react';
// const express = require('express');

// const app = express();
// const cors = require('cors')

// const path = require("path-browserify");
// const url = require("url/");
// const zlib = require("browserify-zlib");
// const https = require("https-browserify");
// const http = require("stream-http");

async function renderSimple() {
  Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNmFjMjc3NS03OTQwLTQyYjktYTc1OS03OWRhZmYyNTA2ZjAiLCJpZCI6MTcyNDM2LCJpYXQiOjE2OTc1OTYwNTR9.PnoA-E9n2A1lPV2GQctPDS15M-OGxxMzt8cVPG6f13w";

  const viewer = new Viewer("cesiumContainer");
  try {
    const imageryLayer = viewer.imageryLayers.addImageryProvider(
      await IonImageryProvider.fromAssetId(3) 
    );
    await viewer.zoomTo(imageryLayer)
  } catch (error) {
    console.log(error);
  }
} 

// async function render() {
//     // Your access token can be found at: https://ion.cesium.com/tokens.
//     // This is the default access token from your ion account

//     Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNmFjMjc3NS03OTQwLTQyYjktYTc1OS03OWRhZmYyNTA2ZjAiLCJpZCI6MTcyNDM2LCJpYXQiOjE2OTc1OTYwNTR9.PnoA-E9n2A1lPV2GQctPDS15M-OGxxMzt8cVPG6f13w';

//     // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
//     const viewer = new Viewer('cesiumContainer', {
//       terrain: Terrain.fromWorldTerrain(),
//     });    

//     // Fly the camera to San Francisco at the given longitude, latitude, and height.
//     viewer.camera.flyTo({
//       destination: Cartesian3.fromDegrees(-122.4175, 37.655, 400),
//       orientation: {
//         heading: Math.toRadians(0.0),
//         pitch: Math.toRadians(-15.0),
//       }
//     });

//     // Add Cesium OSM Buildings, a global 3D buildings layer.
//     const buildingTileset = await createOsmBuildingsAsync();
//     viewer.scene.primitives.add(buildingTileset);

//     return viewer;
// }

function App() {
  // Grant CesiumJS access to your ion assets

  return (
    <div className="App">
      <header className="App-header">
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" 
        content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a> */}
      <script src="https://cesium.com/downloads/cesiumjs/releases/1.110/Build/Cesium/Cesium.js" />
      <link href="https://cesium.com/downloads/cesiumjs/releases/1.110/Build/Cesium/Widgets/widgets.css" rel="stylesheet" />
      </header> 
      <body>
        <div id="cesiumContainer" ref={React.useCallback(async() => {renderSimple();}, [])}> 
      </div>
      </body>
    </div>
  );
}


// import { Viewer } from 'cesium';
// import Viewer from "cesium/widgets/Source/Viewer/Viewer";

// class Capp {
//     componentDidMount() {
//         this.viewer = new Viewer(this.cesiumContainer);
//     }

//     render() {
//         return (
//             <div>
//                 <div id="cesiumContainer" ref={ element => this.cesiumContainer = element }/>
//             </div>
//         );
//     }
// }

// function App() {
//   const app = new Capp();
//   return app.render();
// }
// app = new App()
// return app.render()

export default App;
