"use client"
import { Ion, IonImageryProvider, Terrain, Viewer, Cartesian3, Math, createOsmBuildingsAsync } from "cesium";
// import "cesium/Build/Cesium/Widgets/widgets.css";
import './App.css';
import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

export const HomePage = (props) => {

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

  async function render() {
      Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNmFjMjc3NS03OTQwLTQyYjktYTc1OS03OWRhZmYyNTA2ZjAiLCJpZCI6MTcyNDM2LCJpYXQiOjE2OTc1OTYwNTR9.PnoA-E9n2A1lPV2GQctPDS15M-OGxxMzt8cVPG6f13w';

      const viewer = new Viewer('cesiumContainer', {
        terrain: Terrain.fromWorldTerrain(),
      });    

      viewer.camera.flyTo({
        destination: Cartesian3.fromDegrees(-122.4175, 37.655, 400),
        orientation: {
          heading: Math.toRadians(0.0),
          pitch: Math.toRadians(-15.0),
        }
      });

      const buildingTileset = await createOsmBuildingsAsync();
      viewer.scene.primitives.add(buildingTileset);

      return viewer;
  }

  return (
    <div className="Homepage">
      <header className="App-header">
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" 
        content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
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

export default HomePage;
