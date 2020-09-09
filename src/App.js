import React, { useEffect } from 'react';
import { EventDisplay, Configuration } from '@phoenix/event-display';
import './App.css';

function App() {
  // Creating the event display
  const eventDisplay = new EventDisplay();

  const initEventDisplay = () => {
    // Define the configuration
    const configuration = new Configuration('eventDisplay', true);
    
    // Initialize the event display
    eventDisplay.init(configuration);

    fetch('./phoenix-data/ATLAS/event-data.json').then(res => res.json())
      .then((res) => {
        // Parse the JSON to extract events and their data
        eventDisplay.parsePhoenixEvents(res);
      });

    // Load detector geometries
    eventDisplay.loadOBJGeometry('./phoenix-data/ATLAS/geometries/toroids.obj', 'Toroids', 0x8c8c8c, false, false);
    eventDisplay.loadOBJGeometry('./phoenix-data/ATLAS/geometries/TRT.obj', 'TRT', 0x356aa5, false);
    eventDisplay.loadOBJGeometry('./phoenix-data/ATLAS/geometries/SCT.obj', 'SCT', 0xfff400, false);
    eventDisplay.loadOBJGeometry('./phoenix-data/ATLAS/geometries/pixel.obj', 'Pixel', 0x356aa5, false);
    eventDisplay.loadOBJGeometry('./phoenix-data/ATLAS/geometries/LAR_Bar.obj', 'LAr Barrel', 0x19CCD2, true, false);
    eventDisplay.loadOBJGeometry('./phoenix-data/ATLAS/geometries/LAR_EC1.obj', 'LAr EC1', 0x19CCD2, true, false);
    eventDisplay.loadOBJGeometry('./phoenix-data/ATLAS/geometries/LAR_EC2.obj', 'LAr EC2', 0x19CCD2, true, false);
    eventDisplay.loadOBJGeometry('./phoenix-data/ATLAS/geometries/TileCal.obj', 'Tile Cal', 0xc14343, true, false);
  }

  useEffect(() => {
    initEventDisplay();
  });

  let clipping = false;

  const clipGeometries = () => {
    const uiManager = eventDisplay.getUIManager();
    clipping = !clipping;
    uiManager.setClipping(clipping);
    if (clipping) {
      uiManager.rotateClipping(180);
    } else {
      uiManager.rotateClipping(0);
    }
  }

  return (
    <div id="eventDisplay">
      <button id="clipGeometries" onClick={clipGeometries}>Clip Geometries</button>
    </div>
  );
}

export default App;
