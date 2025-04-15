'use client';
import { Cloud, Clouds, Environment, Text, View } from '@react-three/drei';
import { Bounded } from './Bounded';
import { SodaCanProps } from './SodaCan';
import * as THREE from 'three';
import { useRef } from 'react';
import { FloatingCan } from './FloatingCan';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP, ScrollTrigger);
const ANGLE = 75 * (Math.PI / 270);
const DISTANCE = 15;
const DURATION = 6;

export const SkyDive = () => {
  return (
    <Bounded className="skydive h-screen">
      <h2 className="sr-only">Dive Into Better Health</h2>

      <View className="h-screen w-screen">
        <Scene sodaFlavor="lemonLime" sentence="Dive Into Better Health" />
      </View>
    </Bounded>
  );
};

const Scene = ({
  sodaFlavor,
  sentence,
}: {
  sodaFlavor: SodaCanProps['sodaFlavor'];
  sentence: string;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const canRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Group>(null);
  const cloud1Ref = useRef<THREE.Group>(null);
  const cloud2Ref = useRef<THREE.Group>(null);
  const wordsRef = useRef<THREE.Group>(null);

  const getXPos = (distance: number) => distance * Math.cos(ANGLE);
  const getYPos = (distance: number) => distance * Math.sin(ANGLE);

  const getXYPos = (distance: number) => ({
    x: getXPos(distance),
    y: getYPos(-1 * distance)
  });

  useGSAP(() => {

    if (
        !groupRef.current ||
        !canRef.current ||
        !cloudsRef.current ||
        !cloud1Ref.current ||
        !cloud2Ref.current ||
        !wordsRef.current
    ) return;

    gsap.set(cloudsRef.current.position, {z: 10});
    gsap.set(canRef.current.position, {
      ...getXYPos(-4)
    });

    gsap.set(
      wordsRef.current.children.map((word) => word.position),
      {...getXYPos(7), z: 2}
    );

     // Spinning can
     gsap.to(canRef.current.rotation, {
        y: Math.PI * 2,
        duration: 1.7,
        repeat: -1,
        ease: 'none'
      });
  
  
      gsap.set([cloud2Ref.current.position, cloud1Ref.current.position], {
        ...getXYPos(DISTANCE)
      });
  
      gsap.to(cloud1Ref.current.position, {
        y: `+=${getYPos(DISTANCE * 2)}`,
        x: `+=${getXPos(DISTANCE * -2)}`,
        ease: "none",
        repeat: -1,
        duration: DURATION,
      });
  
      gsap.to(cloud2Ref.current.position, {
        y: `+=${getYPos(DISTANCE * 2)}`,
        x: `+=${getXPos(DISTANCE * -2)}`,
        ease: "none",
        repeat: -1,
        delay: DURATION / 2,
        duration: DURATION,
      });

      const scrollTL = gsap.timeline({
        scrollTrigger:{
          trigger: '.skydive',
          pin: true,
          start: 'top top',
          end: '+=2000',
          scrub: 1.5
        }
      });

      scrollTL
      .to("body", {
        backgroundColor: "#C0F0F5",
        overwrite: "auto",
        duration: 0.1
      })
      .to(cloudsRef.current.position, {z: 0, duration: 0.3}, 0)
      .to(canRef.current.position, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: 'back.out(1.7)'
      })
      .to(wordsRef.current.children.map((word) => word.position), {
        keyframes: [
          {x: 0, y: 0, z: -1},
          { ...getXYPos(-7), z: -7}
        ],
        stagger: 0.3
      }, 0)
      .to(canRef.current.position, {
        ...getXYPos(4),
        duration: 0.5,
        ease: "back.in(1.7)"
      })
      .to(cloudsRef.current.position, {z: 7, duration: 0.5});
  });

  return (
    <group ref={groupRef}>
      <group rotation={[0, 0, 0.5]}>
      <FloatingCan
          ref={canRef}
          sodaFlavor={sodaFlavor}
          rotationIntensity={0}
          floatingIntensity={3}
          floatSpeed={3}
        >
          <pointLight intensity={30} color="#8C0413" decay={0.6} />
        </FloatingCan>
      </group>

      {/* Clouds */}
      <Clouds ref={cloudsRef}>
        <Cloud ref={cloud1Ref} bounds={[10, 10, 2]} />
        <Cloud ref={cloud2Ref} bounds={[10, 10, 2]} />
      </Clouds>

      {/* Text */}
      <group ref={wordsRef}>
        {sentence && <ThreeText sentence={sentence} color="#F97315" />}
      </group>

      {/* Lights */}
      <ambientLight intensity={2} color="#9DDEFA" />
      <Environment files="/hdr/field.hdr" environmentIntensity={1.1} />
    </group>
  );
};

function ThreeText({
  sentence,
  color = 'white',
}: {
  sentence: string;
  color?: string;
}) {
  const words = sentence.toUpperCase().split(' ');
  const material = new THREE.MeshLambertMaterial();
  const isDesktop = useMediaQuery('(min-width: 950px', true);

  return words.map((word: string, wordIndex: number) => (
    <Text
      key={`${wordIndex}-${word}`}
      scale={isDesktop ? 1 : 0.5}
      color={color}
      material={material}
      font="/fonts/Alpino-Variable.woff"
      fontWeight={900}
      anchorX={'center'}
      anchorY={'middle'}
      characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!,.?'"
    >
      {word}
    </Text>
  ));
}
