'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { useFrame } from '@react-three/fiber';

const obj3d = new THREE.Object3D();
    
export const Bubbles = ({
    count = 300,
    speed = 5,
    bubbleSize = 0.05,
    opacity = 0.5,
    repeat = true
}) => {

    const iMeshRef = useRef<THREE.InstancedMesh>(null);

    const bubbleSpeed = useRef(new Float32Array(count));
    const minSpeed = speed * 0.001;
    const maxSpeed = speed * 0.005;
    
    // Bubble geometry
    const bubbleGeometry = new THREE.SphereGeometry(bubbleSize, 16, 16);
    const bubbleMaterial = new THREE.MeshStandardMaterial({
        transparent: true,
        opacity
    });

    useEffect(() => {

        if (!iMeshRef.current) return;
        const iMesh = iMeshRef.current;

        for (let i = 0; i < count; ++i){

            obj3d.position.set(
                gsap.utils.random(-4, 4),
                gsap.utils.random(-4, 4),
                gsap.utils.random(-4, 4),
            );

            obj3d.updateMatrix();
            iMesh.setMatrixAt(i, obj3d.matrix);
            bubbleSpeed.current[i] = gsap.utils.random(minSpeed, maxSpeed);
        }

        iMesh.instanceMatrix.needsUpdate = true;

        return () => {
            iMesh.geometry.dispose();
            (iMesh.material as THREE.Material).dispose();
        };
    }, [count, minSpeed, maxSpeed]);

    useFrame(() => {

        if(!iMeshRef.current) return;

        bubbleMaterial.color = new THREE.Color(document.body.style.backgroundColor);

        for (let i = 0; i < count; ++i) {

            iMeshRef.current.getMatrixAt(i, obj3d.matrix);
            obj3d.position.setFromMatrixPosition(obj3d.matrix);

            obj3d.position.y += bubbleSpeed.current[i];

            // Reset bubble position
            if (obj3d.position.y > 4 && repeat){

                obj3d.position.set(
                    gsap.utils.random(-4, 4),
                    -2,
                    gsap.utils.random(0, 8)
                );
            }

            obj3d.updateMatrix();
            iMeshRef.current.setMatrixAt(i, obj3d.matrix);
        }

        iMeshRef.current.instanceMatrix.needsUpdate = true;
    });

  return (
    <instancedMesh
        ref={iMeshRef}
        args={[undefined, undefined, count]}
        position={[0,0,1]}
        material={bubbleMaterial}
        geometry={bubbleGeometry}
    ></instancedMesh>
  )
}