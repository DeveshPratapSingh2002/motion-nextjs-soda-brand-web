'use client';
import React from 'react';
import { Bounded } from './Bounded';
import { SplitText } from './SplitText';
import { Button } from './Button';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { View } from '@react-three/drei';
import { useRef } from 'react';
import { Group } from 'three';
import { FloatingCan } from './FloatingCan';
import { Environment } from '@react-three/drei';
import { Bubbles } from './Bubbles';
import { useStore } from '@/hooks/useStore';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';


gsap.registerPlugin(useGSAP, ScrollTrigger);

export const Hero = () => {

    const ready = useStore((state) => state.ready);
    const isDesktop = useMediaQuery("(min-width: 760px)", true); 

    useGSAP(() => {

        if (!ready && isDesktop) return;

        const introTimeline = gsap.timeline();
        introTimeline
            .set('.hero', {opacity: 1})
            .from(".hero-header-word", {
                scale: 3,
                opacity: 0,
                ease: 'power4.inOut'
                , delay: 0.4
                , stagger: 1
            })
            .from('.hero-subheading', {
                opacity: 0,
                y: 30
            }, "+=.8")
            .from('.hero-body', {
                opacity: 0,
                y: 10
            })
            .from('.hero-button', {
                opacity: 0,
                y: 10,
                duration: 0.6
            });

        const scrollTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.5
            }
        });

        scrollTimeline.fromTo('body', 
            {
                backgroundColor: '#fde047'
            },
            {
                backgroundColor: '#d9f990',
                overwrite: 'auto'
            }
        ).from('.text-side-heading .split-char', {
            scale: 1.3,
            y: 40,
            rotate: -15,
            opacity: 0,
            stagger: 0.1
            , ease: 'back.out(3)'
            , duration: 0.5
        })
        .from('.text-side-body', {
            y: 20,
            opacity: 0
        })
    }, {dependencies: [ready, isDesktop]});

  return (
    <Bounded className="hero opacity-0">
      
      {isDesktop && (

        <View className='hero-scene pointer-events-none sticky top-0 z-50 hidden -mt-[100vh] h-screen w-screen md:block'>
            <Scene />
            <Bubbles count={300} speed={1} repeat={true} />
        </View>

      )}
      
      
      <div className='grid'>
        <div className="grid h-screen place-items-center">
          <div className="grid auto-rows-min place-items-center text-center">
            <h1 className="hero-header text-7xl font-black uppercase leading-[.8] text-orange-500 md:text-[9rem] lg:text-[13rem]">
              <SplitText
                text="Live Gutsy"
                displayStyle="block"
                className="hero-header-word"
              />
            </h1>

            <h3 className="hero-subheading mt-12 text-5xl font-semibold text-sky-950 lg:text-6xl">
              Soda Perfected
            </h3>

            <p className="hero-body text-2xl font-normal text-sky-950">
              35-g sugar .9g fiber 5 Delicious flavours
            </p>
            <Button href="/" text="Shop Now" className="hero-button mt-12" />
          </div>
        </div>

        <div className="text-side relative z-[80] grid h-screen items-center gap-4 md:grid-cols-2">
          <div>
            <h2 className="text-side-heading text-balance text-8xl font-black uppercase text-sky-950 lg:text-8xl">
              <SplitText text="Try All Five Flavors" />
            </h2>
            <p className="text-side-body mt-4 max-w-xl text-balance text-xl font-normal text-sky-950">
              Our soda is made with real fruit juice and a touch of cane sugar.
              We never use artificial sweeteners or high fructose corn syrup.
              Try all five flavors and find your favorite!
            </p>
          </div>
        </div>
      </div>
    </Bounded>
  );
};


/* Hero Scene */
const Scene = () => {

    const isReady = useStore((state) => state.isReady);

  
  const FLOAT_SPEED = 1.5;
  const groupRef = useRef<Group>(null);
  const can1Ref = useRef<Group>(null);
  const can2Ref = useRef<Group>(null);
  const can3Ref = useRef<Group>(null);
  const can4Ref = useRef<Group>(null);
  const can5Ref = useRef<Group>(null);
  const can1GroupRef = useRef<Group>(null);
  const can2GroupRef = useRef<Group>(null);

  useGSAP(() => {
    if (
      !groupRef.current ||
      !can1GroupRef.current ||
      !can1Ref.current ||
      !can2GroupRef.current ||
      !can2Ref.current ||
      !can3Ref.current ||
      !can4Ref.current ||
      !can5Ref.current
    ) return;

    isReady();

    gsap.set(can1Ref.current.position, { x: -1.95 });
    gsap.set(can1Ref.current.rotation, { z: -0.5 });

    gsap.set(can2Ref.current.position, { x: 1.95 });
    gsap.set(can2Ref.current.rotation, { z: 0.5 });

    gsap.set(can3Ref.current.position, { y: 5, z: 2 });
    gsap.set(can4Ref.current.position, { y: 4, z: 2, x: 2 });
    gsap.set(can5Ref.current.position, { y: -5 });

    const introTimeline = gsap.timeline({
      defaults: {
        duration: 3,
        ease: 'back.out(1.4)',
      },
    });

    if (window.screenY < 20) {
      introTimeline
        .from(can1GroupRef.current.position, { y: -5, x: 1 }, 0)
        .from(can1GroupRef.current.rotation, { z: 3 }, 0)
        .from(can2GroupRef.current.position, { y: 5, x: 1 }, 0)
        .from(can2GroupRef.current.rotation, { z: 3 }, 0);
    }

    const scrollTimeline = gsap.timeline({
      defaults: {
        duration: 2,
      },
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      },
    });

    scrollTimeline
      .to(groupRef.current.rotation, { y: Math.PI * 2 })
      .to(can1Ref.current.position, { x: -0.2, y: -0.7, z: -2 }, 0)
      .to(can1Ref.current.rotation, { z: 0.3 }, 0)
      .to(can2Ref.current.position, { x: 1, y: -0.2, z: -1 }, 0)
      .to(can2Ref.current.rotation, { z: 0 }, 0)
      .to(can3Ref.current.position, { x: -0.3, y: 0.5, z: -1 }, 0)
      .to(can3Ref.current.rotation, { z: -0.1 }, 0)
      .to(can4Ref.current.position, { x: 0, y: -0.3, z: 0.5 }, 0)
      .to(can4Ref.current.rotation, { z: 0.3 }, 0)
      .to(can5Ref.current.position, { x: 0.3, y: 0.5, z: -0.5 }, 0)
      .to(can5Ref.current.rotation, { z: -0.25 }, 0)
      .to(
        groupRef.current.position,
        { x: 1, duration: 5, ease: 'sine.inOut' },
        1.3,
      );
  });

  return (
    <group ref={groupRef}>
      <group ref={can1GroupRef}>
        <FloatingCan
          ref={can1Ref}
          sodaFlavor="blackCherry"
          floatSpeed={FLOAT_SPEED}
        />
      </group>

      <group ref={can2GroupRef}>
        <FloatingCan
          ref={can2Ref}
          sodaFlavor="lemonLime"
          floatSpeed={FLOAT_SPEED}
        />
      </group>

      <FloatingCan ref={can3Ref} sodaFlavor="grape" floatSpeed={FLOAT_SPEED} />
      <FloatingCan
        ref={can4Ref}
        sodaFlavor="strawberryLemonade"
        floatSpeed={FLOAT_SPEED}
      />
      <FloatingCan
        ref={can5Ref}
        sodaFlavor="watermelon"
        floatSpeed={FLOAT_SPEED}
      />
      <Environment files={'/hdr/lobby.hdr'} environmentIntensity={1.5} />
    </group>
  );
};
