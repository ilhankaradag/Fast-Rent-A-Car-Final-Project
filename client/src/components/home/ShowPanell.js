import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, PrensentationControls } from '@react-three/drei';

function Model(props) {
  const { scene } = useGLTF('/lamborghini.glb');
  return <primitive object={scene} {...props} />;
}
const ShowPanell = () => {
  return (
    <Canvas
      dpr={[1, 2]}
      shadows
      camera={{ fov: 45 }}
      style={{ position: 'absolute' }}
    >
      <color attach="background" args={['#101010']} />
      <PrensentationControls
        speed={1.5}
        global
        zoom={0.5}
        polar={[-0.1, Math.PI / 4]}
      >
        <Stage environment={null}>
          <Model scale={0.01} />
        </Stage>
      </PrensentationControls>
    </Canvas>
  );
};

export default ShowPanell;
