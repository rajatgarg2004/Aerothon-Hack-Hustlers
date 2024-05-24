import React, { useRef, useEffect } from 'react';
import { Viewer, Cartesian3, flyTo } from 'cesium';

const Camera = () => {
  const cesiumContainerRef = useRef(null);

  useEffect(() => {
    const viewer = new Viewer(cesiumContainerRef.current, {
      // Add any necessary Cesium viewer configuration options here
    });

    // Set initial camera position dynamically (if needed)
    const initialPosition = Cartesian3.fromDegrees(80.01, 32.71, 100500.0);
    flyTo(viewer, initialPosition);

    // Handle cleanup when the component unmounts
    return () => {
      if (viewer) {
        viewer.destroy();
      }
    };
  }, []);

  return (
    <div ref={cesiumContainerRef} style={{ width: '100%', height: '400px' }} />
  );
};

export default Camera;
