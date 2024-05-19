import { Viewer, Entity } from 'resium';
import { Cartesian3 } from 'cesium';

export default function Home() {
  return (
    <Viewer full >
        <Entity
        name="Plane"
        position={Cartesian3.fromDegrees(76.7794, 30.7333)}
        point={{ pixelSize: 0 }}
        billboard={{
          image: './assets/react.svg',
          width: 60,
          height: 60,
        }}
      />
    </Viewer>
  )
}