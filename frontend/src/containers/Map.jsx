import React, { useRef } from 'react';
import { Viewer, Entity } from 'resium';
import { Cartesian3, Color, LabelStyle, VerticalOrigin, Cartesian2, Math as CesiumMath } from 'cesium';

const Map = ({ departureCoords, arrivalCoords }) => {
  const viewerRef = useRef(null);

  const handleFlyTo = () => {
    if (viewerRef.current && viewerRef.current.cesiumElement) {
      const viewer = viewerRef.current.cesiumElement;
      viewer.camera.flyTo({
        destination: Cartesian3.fromDegrees(arrivalCoords.lon, arrivalCoords.lat, 3000000),
        orientation: {
          heading: 0.0,
          pitch: -CesiumMath.PI_OVER_TWO,
          roll: 0.0
        }
      });
    }
  };

  // Additional locations
  const firstAdditionalLocation = { lon: 85.33, lat: 23.35 }; // Ranchi
  const secondAdditionalLocation = { lon: 80.92, lat: 26.85 }; // Lucknow
  const thirdAdditionalLocation = { lon: 73.87, lat: 18.53 }; // Pune

  // Conditions
  const isKolkataOrDelhi = 
    (arrivalCoords.lat === 28.6 && arrivalCoords.lon === 77.2) || 
    (arrivalCoords.lat === 22.57 && arrivalCoords.lon === 88.37);
  const isHyderabadBangaloreMumbai = 
    (arrivalCoords.lat === 18.98 && arrivalCoords.lon === 72.83) ||
    (arrivalCoords.lat === 12.98 && arrivalCoords.lon === 77.58) ||
    (arrivalCoords.lat === 17.38 && arrivalCoords.lon === 78.47);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Viewer ref={viewerRef} sceneMode="2D">
        <Entity
          name="Departure"
          position={Cartesian3.fromDegrees(departureCoords.lon, departureCoords.lat)}
          point={{ pixelSize: 10, color: Color.RED }}
          label={{
            text: `Departure`,
            font: '14pt monospace',
            style: LabelStyle.FILL_AND_OUTLINE,
            outlineWidth: 2,
            verticalOrigin: VerticalOrigin.BOTTOM,
            pixelOffset: new Cartesian2(0, -9),
          }}
        />
        <Entity
          name="Arrival"
          position={Cartesian3.fromDegrees(arrivalCoords.lon, arrivalCoords.lat)}
          point={{ pixelSize: 10, color: Color.GREEN }}
          label={{
            text: `Arrival`,
            font: '14pt monospace',
            style: LabelStyle.FILL_AND_OUTLINE,
            outlineWidth: 2,
            verticalOrigin: VerticalOrigin.BOTTOM,
            pixelOffset: new Cartesian2(0, -9),
          }}
        />
        <Entity
          name="Line between Departure and Arrival"
          polyline={{
            positions: [
              Cartesian3.fromDegrees(departureCoords.lon, departureCoords.lat),
              Cartesian3.fromDegrees(arrivalCoords.lon, arrivalCoords.lat)
            ],
            width: 2,
            material: Color.BLUE
          }}
        />
        {isKolkataOrDelhi && (
          <>
            <Entity
              name="First Additional Location"
              position={Cartesian3.fromDegrees(firstAdditionalLocation.lon, firstAdditionalLocation.lat)}
              point={{ pixelSize: 5, color: Color.YELLOW }}
              label={{
                text: `Ranchi`,
                font: '14pt monospace',
                style: LabelStyle.FILL_AND_OUTLINE,
                outlineWidth: 2,
                verticalOrigin: VerticalOrigin.BOTTOM,
                pixelOffset: new Cartesian2(0, -9),
              }}
            />
            <Entity
              name="Second Additional Location"
              position={Cartesian3.fromDegrees(secondAdditionalLocation.lon, secondAdditionalLocation.lat)}
              point={{ pixelSize: 5, color: Color.ORANGE }}
              label={{
                text: `Lucknow`,
                font: '14pt monospace',
                style: LabelStyle.FILL_AND_OUTLINE,
                outlineWidth: 2,
                verticalOrigin: VerticalOrigin.BOTTOM,
                pixelOffset: new Cartesian2(0, -9),
              }}
            />
            <Entity
              name="Line between Arrival and First Additional Location"
              polyline={{
                positions: [
                  Cartesian3.fromDegrees(arrivalCoords.lon, arrivalCoords.lat),
                  Cartesian3.fromDegrees(firstAdditionalLocation.lon, firstAdditionalLocation.lat)
                ],
                width: 2,
                material: Color.YELLOW
              }}
            />
            <Entity
              name="Line between First Additional Location and Second Additional Location"
              polyline={{
                positions: [
                  Cartesian3.fromDegrees(firstAdditionalLocation.lon, firstAdditionalLocation.lat),
                  Cartesian3.fromDegrees(secondAdditionalLocation.lon, secondAdditionalLocation.lat)
                ],
                width: 2,
                material: Color.ORANGE
              }}
            />
            <Entity
              name="Line between Second Additional Location and Departure"
              polyline={{
                positions: [
                  Cartesian3.fromDegrees(secondAdditionalLocation.lon, secondAdditionalLocation.lat),
                  Cartesian3.fromDegrees(departureCoords.lon, departureCoords.lat)
                ],
                width: 2,
                material: Color.RED
              }}
            />
            <Entity
              name="Line between Departure and First Additional Location"
              polyline={{
                positions: [
                  Cartesian3.fromDegrees(departureCoords.lon, departureCoords.lat),
                  Cartesian3.fromDegrees(firstAdditionalLocation.lon, firstAdditionalLocation.lat)
                ],
                width: 2,
                material: Color.YELLOW
              }}
            />
            <Entity
              name="Line between Second Additional Location and Arrival"
              polyline={{
                positions: [
                  Cartesian3.fromDegrees(secondAdditionalLocation.lon, secondAdditionalLocation.lat),
                  Cartesian3.fromDegrees(arrivalCoords.lon, arrivalCoords.lat)
                ],
                width: 2,
                material: Color.ORANGE
              }}
            />
          </>
        )}
        {isHyderabadBangaloreMumbai && (
          <>
            <Entity
              name="Third Additional Location"
              position={Cartesian3.fromDegrees(thirdAdditionalLocation.lon, thirdAdditionalLocation.lat)}
              point={{ pixelSize: 5, color: Color.YELLOW }}
              label={{
                text: `Pune`,
                font: '14pt monospace',
                style: LabelStyle.FILL_AND_OUTLINE,
                outlineWidth: 2,
                verticalOrigin: VerticalOrigin.BOTTOM,
                pixelOffset: new Cartesian2(0, -9),
              }}
            />
            <Entity
              name="Line between Arrival and Third Additional Location"
              polyline={{
                positions: [
                  Cartesian3.fromDegrees(arrivalCoords.lon, arrivalCoords.lat),
                  Cartesian3.fromDegrees(thirdAdditionalLocation.lon, thirdAdditionalLocation.lat)
                ],
                width: 2,
                material: Color.YELLOW
              }}
            />
            <Entity
              name="Line between Third Additional Location and Departure"
              polyline={{
                positions: [
                  Cartesian3.fromDegrees(thirdAdditionalLocation.lon, thirdAdditionalLocation.lat),
                  Cartesian3.fromDegrees(departureCoords.lon, departureCoords.lat)
                ],
                width: 2,
                material: Color.YELLOW
              }}
            />
          </>
        )}
      </Viewer>
      <div className='flex justify-center items-center'>
        <button onClick={handleFlyTo} className='ml-2 mt-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mb-1'>
          Click to view routes
        </button>
      </div>
    </div>
  );
};

export default Map;
