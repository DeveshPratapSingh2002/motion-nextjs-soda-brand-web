'use client';
import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const sodaFlavors = {
  lemonLime: '/labels/lemon-lime.png',
  grape: '/labels/grape.png',
  blackCherry: '/labels/cherry.png',
  strawberryLemonade: '/labels/strawberry.png',
  watermelon: '/labels/watermelon.png',
};

const canMetalMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.3,
  metalness: 1,
  color: '#bbbbbb',
});

export type SodaCanProps = {
  sodaFlavor: keyof typeof sodaFlavors;
  scale?: number;
};

export const SodaCan = ({
  sodaFlavor = 'blackCherry',
  scale = 2,
  ...props
}: SodaCanProps) => {
  const { nodes } = useGLTF('/Soda-can.gltf');

  const labelTextures = useTexture(sodaFlavors);

  labelTextures.lemonLime.flipY = false;
  labelTextures.grape.flipY = false;
  labelTextures.blackCherry.flipY = false;
  labelTextures.strawberryLemonade.flipY = false;
  labelTextures.watermelon.flipY = false;

  const texturedLabel = labelTextures[sodaFlavor];

  return (
    <group {...props} dispose={null} scale={scale} rotation={[0, -Math.PI, 0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.cylinder as THREE.Mesh).geometry}
        material={canMetalMaterial}
      />

      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.cylinder_1 as THREE.Mesh).geometry}
      >
        <meshStandardMaterial
          roughness={0.15}
          metalness={0.7}
          map={texturedLabel}
        />
      </mesh>

      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Tab as THREE.Mesh).geometry}
        material={canMetalMaterial}
      />
    </group>
  );
};
