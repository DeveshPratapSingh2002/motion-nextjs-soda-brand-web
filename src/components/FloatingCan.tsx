'use client';
import { forwardRef, ReactNode } from 'react';
import { SodaCan, SodaCanProps } from './SodaCan';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

type FloatingCanProps = {
  sodaFlavor?: SodaCanProps['sodaFlavor'];
  floatSpeed?: number;
  rotationIntensity?: number;
  floatingIntensity?: number;
  floatingRange?: [number, number];
  children?: ReactNode;
};

export const FloatingCan = forwardRef<THREE.Group, FloatingCanProps>(
  (
    {
      sodaFlavor = 'blackCherry',
      floatSpeed = 1.5,
      rotationIntensity = 1,
      floatingIntensity = 1,
      floatingRange = [-0.1, 0.1],
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <group ref={ref} {...props}>
        <Float
          speed={floatSpeed}
          rotationIntensity={rotationIntensity}
          floatIntensity={floatingIntensity}
          floatingRange={floatingRange}
        >
          {children}
          <SodaCan sodaFlavor={sodaFlavor} />
        </Float>
      </group>
    );
  },
);
