"use client"
import { Ion, VerticalOrigin, LabelStyle, IonImageryProvider, Terrain, Viewer, Cartesian3, Math as CMath, Cartesian2, Cartographic, createOsmBuildingsAsync, Color, defined, ScreenSpaceEventType, ScreenSpaceEventHandler, Globe } from "cesium";
// import "cesium/Build/Cesium/Widgets/widgets.css";
import './App.css';
import { useNavigate } from 'react-router-dom';
import { React, useEffect, useState, useRef, Component } from "react";

export const HomePage = (props) => {

  const refViewer = useRef(null)
  // const [viewer, setViewer] = useState(null);
  const [clickedPos, setClickedPos] = useState('');

  // Begin rendering the cesiumContainer
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

      renderFunc().then(result => {refViewer.current = result;});
  }, []);

  // latitude: float
  // longitude: float
  // cameraElevation: int
  function zoomToLocationOnMap(viewer, latitude, longitude, cameraElevation) {
    var viewer = refViewer.current;
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
  function addLocationToMap(pointName, latitude, longitude, pointSize, outlineSize, CesiumColor, CesiumOutlineColor) {
    var viewer = refViewer.current;
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
  function selectPreMadeLocation(selectedEntity) {
    var viewer = refViewer.current;
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

  function setMarkerInPos(position) {
    var viewer = refViewer.current;
    viewer.pickTranslucentDepth = true;
    const locationMarker = viewer.entities.add({
      name : "location",
      position : Cartesian3.fromDegrees(position.lng, position.lat, 300),
      point : {
        pixelSize : 5,
        color : Color.RED,
        outlineColor : Color.WHITE,
        outlineWidth : 2
      },
      label : {
        text : "check",
        font : "14pt monospace",
        style: LabelStyle.FILL_AND_OUTLINE,
        outlineWidth : 2,
        verticalOrigin : VerticalOrigin.BOTTOM,
        pixelOffset : new Cartesian2(0, -9)
      }
    });
  }

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

  // Retrieves the coordinates in radians for longitude, latitude at the center of the screen
  const getCenterCoordinates = () => {
    var viewer = refViewer.current;
    console.log("Inner Viewer");
    console.log(viewer);
    var windowPosition = new Cartesian2(viewer.container.clientWidth / 2, viewer.container.clientHeight / 2);
    var pickRay = viewer.scene.camera.getPickRay(windowPosition);
    var pickPosition = viewer.scene.globe.pick(pickRay, viewer.scene);
    var pickPositionCartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(pickPosition);
    console.log(pickPositionCartographic);
    return pickPositionCartographic;
  }
  
  // Get latitude and longitude
	const getPositionOnClick = () => {
    var viewer = refViewer.current;
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
      cartesian = viewer.camera.pickEllipsoid(movement.position, ellipsoid);
      if (cartesian) {
          // Convert Cartesian coordinates to geographic coordinates
          var cartographic = ellipsoid.cartesianToCartographic(cartesian);
          // Turn the radians into degrees of decimal system representation
          longitudeString = CMath.toDegrees(cartographic.longitude);
          latitudeString = CMath.toDegrees(cartographic.latitude);
          // Get the camera height
          height = Math.ceil(viewer.camera.positionCartographic.height);
          entity.position = cartesian;
          entity.label.show = false;
          entity.label.text = '(' + longitudeString + ', ' + latitudeString + "," + height + ')' ;
          console.log(entity.label.text);
          setClickedPos(entity.label.text);
      } else {
          entity.label.show = false;
      }
    }, ScreenSpaceEventType.LEFT_CLICK);
    // Set the processing function of the mouse scroll event, here is responsible for monitoring the change in height value
    handler.setInputAction(function(wheelment) {
        height = Math.ceil(viewer.camera.positionCartographic.height);
        entity.position = cartesian;
        entity.label.show = false;
    entity.label.text = '(' + longitudeString + ', ' + latitudeString + ', ' + height + ')' ;
    console.log(entity.label.text);
    setClickedPos(entity.label.text);
    // entity.label.fillColor = Color.BLACK;
      }, ScreenSpaceEventType.WHEEL);
  }

  // Get latitude and longitude on mouse move
	const getPositionOnMove = () => {
    var viewer = refViewer.current;
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
          entity.label.show = false;
          entity.label.text = '(' + longitudeString + ', ' + latitudeString + "," + height + ')' ;
          console.log(entity.label.text);
          setClickedPos(entity.label.text);
      } else {
          entity.label.show = false;
      }
    }, ScreenSpaceEventType.MOUSE_MOVE);
    // Set the processing function of the mouse scroll event, here is responsible for monitoring the change in height value
    handler.setInputAction(function(wheelment) {
        height = Math.ceil(viewer.camera.positionCartographic.height);
        entity.position = cartesian;
        entity.label.show = false;
    entity.label.text = '(' + longitudeString + ', ' + latitudeString + ', ' + height + ')' ;
    console.log(entity.label.text);
    setClickedPos(entity.label.text);
    // entity.label.fillColor = Color.BLACK;
      }, ScreenSpaceEventType.WHEEL);
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
      <div id="cesiumContainer" ref={refViewer.current} onClick={(viewer) => { if (viewer !== null && viewer !== undefined && clickedPos === '') {getPositionOnClick()} }} />
    </div>
  );
}


export default HomePage;