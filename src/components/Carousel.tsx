'use client';
import { cn } from '@/util';
import { SVGProps, useRef, useState } from 'react';
import { SodaCanProps } from './SodaCan';
import { Center, Environment, View } from '@react-three/drei';
import { FloatingCan } from './FloatingCan';
import * as THREE from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const SPIN_ON_CHANGE = 8;
const FLAVORS: {
  flavor: SodaCanProps['sodaFlavor'];
  color: string;
  name: string;
}[] = [
  { flavor: 'blackCherry', color: '#710523', name: 'Black Cherry' },
  { flavor: 'grape', color: '#572981', name: 'Grape Goodness' },
  { flavor: 'lemonLime', color: '#164405', name: 'Lemon Lime' },
  {
    flavor: 'strawberryLemonade',
    color: '#690B3D',
    name: 'Strawberry Lemonade',
  },
  { flavor: 'watermelon', color: '#4B7002', name: 'Watermelon Crush' },
];

export const Carousel = () => {
  const canRef = useRef<THREE.Group>(null);
  const [flavourIndex, setFlavorIndex] = useState(0);

  const changeFlavor = (index: number) => {
    if (!canRef.current) return;

    const nextIndex = (index + FLAVORS.length) % FLAVORS.length;

    const timeline = gsap.timeline();

    timeline
    .to(canRef.current.rotation, {
      ease: 'power2.inOut',
      duration: 1,
      y:
        index > flavourIndex
          ? `-=${Math.PI * 2 * SPIN_ON_CHANGE}`
          : `+=${Math.PI * 2 * SPIN_ON_CHANGE}`,
    })
    .to(".background, .wavy-circles-inner, .wavy-circles-outer", {
        backgroundColor: FLAVORS[flavourIndex].color,
        fill: FLAVORS[nextIndex].color,
        ease: 'power2.inOut',
        duration: 1
    }, 0)
    .to(".text-wrapper", {
        duration: 0.2,
        y: -10,
        opacity: 0
    }, 0)
    .to({}, {onStart: () => setFlavorIndex(nextIndex)}, 0.5)
    .to(".text-wrapper", {duration: 0.2, y: 10, opacity: 1}, 0.7)
    ;
  };

  
  return (
    <section   className="carousel relative grid h-screen grid-rows-[auto,4fr,auto] justify-center overflow-hidden bg-white py-12 text-white">
      <div className="background pointer-events-none absolute inset-0 bg-[#710523] opacity-50" />

      <WavvyCircles 
        className="absolute left-1/2 top-1/2 h-[120vmin] -translate-x-1/2 -translate-y-1/2 text-[#710523]"
      />

      <h2 className="relative text-center text-5xl font-bold">
        Choose Your Flavor
      </h2>

      <div className="grid grid-cols-[auto,auto,auto] items-center">
        {/* Left Arrow Button */}
        <ArrowButton
          onClick={() => changeFlavor(flavourIndex + 1)}
          direction="left"
          label="Previous Flavors"
        />

        {/* can view */}
        <View className="aspect-square h-[70vh] min-h-40">
          <Center position={[0, 0, 1.5]}>
            <FloatingCan
              ref={canRef}
              floatingIntensity={0.3}
              rotationIntensity={1}
              sodaFlavor={FLAVORS[flavourIndex].flavor}
            />
          </Center>

          <Environment
            files="/hdr/lobby.hdr"
            environmentIntensity={0.6}
            environmentRotation={[0, 3, 0]}
          />
          <directionalLight intensity={6} position={[0, 1, 1]} />
        </View>

        {/* Right Arrow Button */}
        <ArrowButton
          onClick={() => changeFlavor(flavourIndex - 1)}
          direction="right"
          label="Next Flavors"
        />
      </div>

      <div className="text-area relative mx-auto text-center">
        <div className="text-wrapper text-4xl font-medium">
          <p>{FLAVORS[flavourIndex].name}</p>
        </div>
        <p className="mt-2 text-2xl font-medium opacity-90">12 cans - $35.99</p>
      </div>
    </section>
  );
};

const ArrowButton = ({
  direction = 'right',
  label,
  onClick,
}: {
  direction?: 'right' | 'left';
  label: string;
  onClick: () => void;
}) => {
  return (
    <button onClick={onClick} className="size-12 rounded-full border-2 border-white bg-white/10 p-3 opacity-85 ring-white focus:outline-none focus-visible:opacity-100 focus-visible:ring-4 md:size-16 lg:size-20">
      <ArrowIcon className={cn(direction === 'right' && '-scale-x-100')} />
      <span className="sr-only">{label}</span>
    </button>
  );
};

const ArrowIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 52 52"
      {...props}
    >
      <path
        fill="currentColor"
        d="M9 25.7c0 1.1.6 2.2 1.1 2.8l18.6 18.6a4.4 4.4 0 006.2 0 4.4 4.4 0 000-6.2L19.7 25.7 35 10.5a4.4 4.4 0 000-6.2 4.4 4.4 0 00-6.2 0l-18 18C9.6 23.4 9 24.6 9 25.7z"
      />
    </svg>
  );
};



const WavvyCircles = (props: SVGProps<SVGSVGElement>) => {

    useGSAP(() => {

        gsap.to('.wavy-circles-inner', {
            transformOrigin: 'center',
            rotate: '360',
            duration: 16,
            ease: 'none',
            repeat: -1
        });

        gsap.to('.wavy-circles-outer', {
            transformOrigin: 'center',
            rotate: '-360',
            duration: 22,
            scale: 1,
            ease: 'none',
            repeat: -1
        });
    });

    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 1165 1166"
        {...props}
      >
        <path
          className="wavy-circles-outer"
          fill="currentColor"
          d="M1133.5 619c-5 76.2-84.8 126.7-113.5 183.3-28.7 56.6-20.8 149-74 195.6-53 46.6-143.6 26.9-203.4 48-59.9 21.2-120.2 93.8-196.5 88.9-76.2-5-126.6-86.2-183.2-113.5-56.6-28.7-149-20.8-195.6-74-46.7-53-26.9-143.6-46.7-203.4-19.8-59.7-93.7-121.5-88.8-196.4 4.8-74.8 84.8-128 113.6-184.6 28.7-56.6 19.4-149 72.5-195.7 53.1-46.7 143.7-26.9 203.4-46.7C481 100.8 543 26.8 619.1 31.8c76.2 5 126.7 84.7 183.3 113.5 56.6 28.7 149 19.4 195.7 72.5 46.6 53.1 26.8 143.7 48 203.5 19.8 59.7 92.3 121.5 87.4 197.7z"
          opacity="0.5"
        />
        <path
          className="wavy-circles-inner"
          fill="currentColor"
          d="M827.9 672.6c-12.4 34-55.3 46.3-75.9 68.2-20.5 22-29.2 64.9-59.5 79-30.3 14.2-68.8-6.8-98.7-5.1-30 1.6-67 26.6-101 14.2-33.9-12.3-46-55.9-68-75.8-22-20.5-65-29.2-79-59.5-14.1-30.3 6.9-68.8 5.8-98.6-1-29.7-26.4-67.6-14.2-101 12.1-33.3 55.5-46.9 76-68.8 20.6-21.8 28.6-65 59-79.2 30.2-14.1 68.7 6.9 98.4 5.8 29.8-1 67.7-26.4 101.6-14 34 12.3 46.2 55.2 68.1 75.8 21.9 20.5 65 28.6 79.2 58.9 14.1 30.3-6.9 68.8-5.2 98.8 1 29.7 25.7 67.4 13.4 101.3z"
          opacity="0.5"
        />
      </svg>
    )
}