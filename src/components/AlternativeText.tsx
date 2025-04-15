'use client';
import { cn } from '@/util';
import { Bounded } from './Bounded';
import { Environment, View } from '@react-three/drei';
import { FloatingCan } from './FloatingCan';
import * as THREE from 'three';
import { useRef } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const AlternativeText = () => {
  const textArray = [
    {
      heading: 'Gut-Friendly Goodness',
      body: 'Our soda is packed with prebiotics and 1 billion probiotics, giving your gut the love it deserves. Say goodbye to bloating and hello to a happy, healthy digestive system with every sip.',
    },
    {
      heading: 'Light Calories, Big Flavor',
      body: 'Indulge in bold, refreshing taste without the guilt. At just 20 calories per can, you can enjoy all the flavor you crave with none of the compromise.',
    },
    {
      heading: 'Naturally Refreshing',
      body: "Made with only the best natural ingredients, our soda is free from artificial sweeteners and flavors. It's a crisp, clean taste that feels as good as it tastes, giving you a boost of real, natural refreshment.",
    },
  ];

  return (
    <Bounded className="alternating-text-container relative bg-yellow-300 text-sky-950">
      <div>
        <div className="relative z-[100] grid">
          <View className="alternating-text-view absolute left-0 top-0 h-screen w-full">
            <Scene />
          </View>

          {textArray.map((text, index) => (
            <div
              key={text.heading}
              className="alternating-section grid h-screen place-items-center gap-x-12 md:grid-cols-2"
            >
              <div
                className={cn(
                  index % 2 === 0 ? 'col-start-1' : 'md:col-start-2',
                  'rounded-lg p-4 backdrop-blur-lg max-md:bg-white/30',
                )}
              >
                <h2 className="text-balance text-6xl font-bold">
                  {text.heading}
                </h2>

                <p className="mt-4 text-xl">{text.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

const Scene = () => {
 

    const isDesktop = useMediaQuery("(min-width: 768px)", true);
    const canRef = useRef<THREE.Group>(null);
    const bgColor = ["#FFA6B5", "#E9CFF6", "#CBEF9A"];

    useGSAP(() => {

        

        const sections = gsap.utils.toArray('.alternating-section');
        const scrollTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '.alternating-text-view',
                endTrigger: '.alternating-text-container'
                ,pin: true
                ,start: 'top top'
                ,end: 'bottom bottom'
                ,scrub: true
            }
        });

        sections.forEach((_, index) => {

            if (!canRef.current || index === 0) return;

            const isOdd = index % 2 !== 0;
            const xPos = isDesktop ? (isOdd ? "-1" : "1") : 0;
            const yPos = isDesktop ? (isOdd ? ".4" : "-.4") : 0;

            scrollTimeline
                .to(canRef.current.position, {
                    x: xPos,
                    ease: 'circ.inOut',
                    delay: 0.5
                })
                .to(canRef.current.rotation, {
                    y: yPos,
                    ease: 'back.inOut'
                }, "<")
                .to(".alternating-text-container", {
                    backgroundColor: gsap.utils.wrap(bgColor, index)
                });
        });
    }, {dependencies: [isDesktop]})

    return (
        <group
            ref={canRef}
            position-x={isDesktop ? 1 : 0}
            position-y={isDesktop ? -0.3 : 0}
        >
            <FloatingCan sodaFlavor='strawberryLemonade' />
            <Environment files={'/hdr/lobby.hdr'} environmentIntensity={1.5}/>
        </group>
    );
};
