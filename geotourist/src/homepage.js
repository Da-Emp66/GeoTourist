"use client"
import { Ion, IonImageryProvider, Terrain, Viewer, Cartesian3, Math as CMath, Cartesian2, Cartographic, createOsmBuildingsAsync, Color, defined, ScreenSpaceEventType, ScreenSpaceEventHandler, Globe } from "cesium";
// import "cesium/Build/Cesium/Widgets/widgets.css";
import './App.css';
import { useNavigate } from 'react-router-dom';
import { React, useEffect, useState, Component } from "react";

export const HomePage = (props) => {


  // Example
  // async function render() {
  //     Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNmFjMjc3NS03OTQwLTQyYjktYTc1OS03OWRhZmYyNTA2ZjAiLCJpZCI6MTcyNDM2LCJpYXQiOjE2OTc1OTYwNTR9.PnoA-E9n2A1lPV2GQctPDS15M-OGxxMzt8cVPG6f13w';

  //     const viewer = new Viewer('cesiumContainer', {
  //       terrain: Terrain.fromWorldTerrain(),
  //     });    

  //     viewer.camera.flyTo({
  //       destination: Cartesian3.fromDegrees(-122.4175, 37.655, 400),
  //       orientation: {
  //         heading: CMath.toRadians(0.0),
  //         pitch: CMath.toRadians(-15.0),
  //       }
  //     });

  //     const buildingTileset = await createOsmBuildingsAsync();
  //     viewer.scene.primitives.add(buildingTileset);

  //     return viewer;
  // }

  // latitude: float
  // longitude: float
  // cameraElevation: int
  function zoomToLocationOnMap(viewer, latitude, longitude, cameraElevation) {
    viewer.camera.flyTo({
      destination: Cartesian3.fromDegrees(longitude, latitude, cameraElevation),
      orientation: {
        heading: CMath.toRadians(0.0),
        pitch: CMath.toRadians(-15.0),
      }
    });
  }

  // pointName: string
  // latitude: float
  // longitude: float
  // pointSize: int
  // outlineSize: int
  // CesiumColor: Color.*
  // CesiumOutlineColor: Color.*
  function addLocationToMap(viewer, pointName, latitude, longitude, pointSize, outlineSize, CesiumColor, CesiumOutlineColor) {
    viewer.entities.add({
      name: pointName,
      position: Cartesian3.fromDegrees(longitude, latitude),
      point: {
        pixelSize: pointSize,
        outlineWidth: outlineSize,
        color: CesiumColor,
        outlineColor: CesiumOutlineColor,
      },
    });
  }

  // Use this or pickEntity(viewer, e)
  function selectPreMadeLocation(viewer, selectedEntity) {
    viewer.selectedEntityChanged.addEventListener(function(selectedEntity) {
      if (defined(selectedEntity)) {
          if (defined(selectedEntity.name)) {
            console.log('Selected ' + selectedEntity.name);
          } else {
            console.log('Unknown entity selected.');
          }
      } else {
        console.log('Deselected.');
      }
    });
  }








// var viewer = new Cesium.Viewer(‘cesiumContainer’);
// viewer.scene.canvas.addEventListener(‘contextmenu’, (event) => {
//   event.preventDefault();
//   const mousePosition = new Cesium.Cartesian2(event.clientX, event.clientY);
//   const selectedLocation = convertScreenPixelToLocation(mousePosition );
//   setMarkerInPos(selectedLocation);
//   }, false);

// function convertScreenPixelToLocation(mousePosition) {
//     const ellipsoid = viewer.scene.globe.ellipsoid;
//     const cartesian = viewer.camera.pickEllipsoid(mousePosition, ellipsoid);
//     if (cartesian) {
//     const cartographic = ellipsoid.cartesianToCartographic(cartesian);
//     const longitudeString = Cesium.CMath.toDegrees(cartographic.longitude).toFixed(15);
//     const latitudeString = Cesium.CMath.toDegrees(cartographic.latitude).toFixed(15);
//     return {lat: Number(latitudeString),lng: Number(longitudeString)};
//     } else {
//     return null;
//     }
//   }

//   function setMarkerInPos(position){
//     viewer.pickTranslucentDepth = true;
//     const locationMarker = viewer.entities.add({
//     name : ‘location’,
//     position : Cesium.Cartesian3.fromDegrees(position.lng, position.lat, 300),
//     point : {
//     pixelSize : 5,
//     color : Cesium.Color.RED,
//     outlineColor : Cesium.Color.WHITE,
//     outlineWidth : 2
//     },
//     label : {
//     text : ‘check’,
//     font : ‘14pt monospace’,
//     style: Cesium.LabelStyle.FILL_AND_OUTLINE,
//     outlineWidth : 2,
//     verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
//     pixelOffset : new Cesium.Cartesian2(0, -9)
//     }
//   });
// }

// // Output the canvas position of longitude/latitude (0, 0) every time the mouse moves.
//   const something = (viewer) => {
//     const scene = widget.scene;
//     const ellipsoid = scene.globe.ellipsoid;
//     const position = Cartesian3.fromDegrees(0.0, 0.0);
//     const handler = new ScreenSpaceEventHandler(scene.canvas);
//     handler.setInputAction(function(movement) {
//         console.log(scene.cartesianToCanvasCoordinates(position));
//     }, ScreenSpaceEventType.MOUSE_MOVE);
//   }

  // function toDegree(c3pos) {
  //   let pos = Cartographic.fromCartesian(c3pos);
  //   if (typeof pos !== 'undefined') {
  //       return {
  //           lon: pos.longitude / CMath.PI * 180,
  //           lat: pos.latitude / CMath.PI * 180,
  //           alt: pos.height
  //       };
  //   } else {
  //       return pos;
  //   }
  // }

  // async function somethingElse(viewer) {
  //   // viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(movement) {
  //   //   const pickedFeature = viewer.scene.pick(movement.position);
  //   //   if (!defined(pickedFeature)) {
  //   //       // nothing picked
  //   //       return;
  //   //   }
  //   //   const worldPosition = viewer.scene.pickPosition(movement.position);
  //   //   console.log(worldPosition);
  //   // }, ScreenSpaceEventType.LEFT_CLICK);
  //   // OR
  //   const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
  //   // const ellipsoid = viewer.scene._globe._ellipsoid;
  //   handler.setInputAction(function (event) {
  //     let pickedObject = viewer.scene.pick(event.position);
  //     if (defined(pickedObject)){
  //       console.log(pickedObject);
  //     }
  //   });
  // }

  const [viewer, setViewer] = useState(null);
  // // Starting Render
  // async function renderSimple() {
  // Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNmFjMjc3NS03OTQwLTQyYjktYTc1OS03OWRhZmYyNTA2ZjAiLCJpZCI6MTcyNDM2LCJpYXQiOjE2OTc1OTYwNTR9.PnoA-E9n2A1lPV2GQctPDS15M-OGxxMzt8cVPG6f13w";
  
  // const viewer = new Viewer("cesiumContainer");

  //   try {
  //     const imageryLayer = viewer.imageryLayers.addImageryProvider(
  //       await IonImageryProvider.fromAssetId(3) 
  //     );
  //     await viewer.zoomTo(imageryLayer)
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   setViewer(viewer);
  // }

  useEffect(() => {
    async function renderFunc() {
      Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNmFjMjc3NS03OTQwLTQyYjktYTc1OS03OWRhZmYyNTA2ZjAiLCJpZCI6MTcyNDM2LCJpYXQiOjE2OTc1OTYwNTR9.PnoA-E9n2A1lPV2GQctPDS15M-OGxxMzt8cVPG6f13w";
      
      let view = new Viewer("cesiumContainer");
    
        try {
          const imageryLayer = view.imageryLayers.addImageryProvider(
            await IonImageryProvider.fromAssetId(3) 
          );
          await view.zoomTo(imageryLayer)
        } catch (error) {
          console.log(error);
        }
    
        return view;
      }

      renderFunc().then(result => setViewer(result));
  }, []);

  console.log(typeof(viewer));
  console.log(viewer)

  const getCenterCoordinates = () => {
    console.log("Inner Viewer");
    console.log(viewer);
    var windowPosition = new Cartesian2(viewer.container.clientWidth / 2, viewer.container.clientHeight / 2);
    var pickRay = viewer.scene.camera.getPickRay(windowPosition);
    var pickPosition = viewer.scene.globe.pick(pickRay, viewer.scene);
    var pickPositionCartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(pickPosition);
    console.log(pickPositionCartographic);
  }
  
  // Get latitude and longitude
	const getPosition = () => {
    // Get the current 3D scene
    var scene = viewer.scene;
    // Get the ellipsoid of the current 3D scene
    var ellipsoid = viewer.scene.globe.ellipsoid;
    var entity = viewer.entities.add({
        label : {
            show : false
        }
    });
    var longitudeString = null;
    var latitudeString = null;
    var height = null;
    var cartesian = null;
    // Define the event processing of the canvas element of the current scene
    var handler = new ScreenSpaceEventHandler(scene.canvas);
    // Set the mouse movement event processing function, here is responsible for monitoring x, y coordinate value changes
    handler.setInputAction(function(movement) {
      // Convert the two-dimensional coordinates of the mouse to the corresponding three-dimensional coordinates of the ellipsoid by the specified ellipsoid or the coordinate system corresponding to the map
      cartesian = viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid);
      if (cartesian) {
          // Convert Cartesian coordinates to geographic coordinates
          var cartographic = ellipsoid.cartesianToCartographic(cartesian);
          // Turn the radians into degrees of decimal system representation
          longitudeString = CMath.toDegrees(cartographic.longitude);
          latitudeString = CMath.toDegrees(cartographic.latitude);
          // Get the camera height
          height = Math.ceil(viewer.camera.positionCartographic.height);
          entity.position = cartesian;
          entity.label.show = true;
          entity.label.text = '(' + longitudeString + ', ' + latitudeString + "," + height + ')' ;
      } else {
          entity.label.show = false;
      }
    }, ScreenSpaceEventType.MOUSE_MOVE);
    // Set the processing function of the mouse scroll event, here is responsible for monitoring the change in height value
    handler.setInputAction(function(wheelment) {
        height = Math.ceil(viewer.camera.positionCartographic.height);
        entity.position = cartesian;
        entity.label.show = true;
    entity.label.text = '(' + longitudeString + ', ' + latitudeString + "," + height + ')' ;
    entity.label.fillColor = Color.BLACK;
      }, ScreenSpaceEventType.WHEEL);
    console.log(entity.label.text);
  }

  return (
    <div className="Homepage">
      <header className="App-header">
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" 
        content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
      <script src="https://cesium.com/downloads/cesiumjs/releases/1.110/Build/Cesium/Cesium.js" />
      <link href="https://cesium.com/downloads/cesiumjs/releases/1.110/Build/Cesium/Widgets/widgets.css" rel="stylesheet" />
      </header> 
      <body>
        <div id="cesiumContainer" ref={viewer} onClick={(viewer) => { if (viewer !== null) {getPosition()} else {console.log("Viewer is null.");}} } />
      </body>
    </div>
  );
}
// onClick={(viewer) => somethingElse(viewer)}
// onClick={(viewer) => getPosition(viewer)}
export default HomePage;
