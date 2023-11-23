import React from 'react';
import { Container } from 'react-bootstrap';
import { PresentationControls, Stage, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

function Model(props) {
  const { scene } = useGLTF('/lamborghini.glb');
  return <primitive object={scene} {...props} />;
}

const Home = () => {
  return (
    <Container className="home">
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{ fov: 45 }}
        style={{
          position: 'absolute',
          height: '70%',
          width: '70%',
          top: '60%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <color attach="background" args={['#F0F3FA']} />
        <PresentationControls
          speed={1.5}
          global
          zoom={1}
          polar={[-0.1, Math.PI / 4]}
        >
          <Stage environment={'sunset'}>
            <Model scale={0.01} />
          </Stage>
        </PresentationControls>
      </Canvas>
    </Container>
  );
};

export default Home;
