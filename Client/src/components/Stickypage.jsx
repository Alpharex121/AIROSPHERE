import * as React from 'react'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'


export default function Stickypage() {
  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      <div className="absolute inset-0 bg-black" />

      <Parallax  pages={5}>
        <ParallaxLayer offset={0} speed={0.5} className="flex  items-center justify-center">
          <p className="text-xl text-white">Scroll down</p>
        </ParallaxLayer>

        <ParallaxLayer sticky={{ start: 1, end: 3 }} className="flex items-center justify-start">
          <div className="flex items-center justify-center text-lg h-40 w-1/4 text-center rounded-lg bg-[#ff6d6d] mx-4 md:w-2/5 md:mx-4">
            <p>What we offer</p>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1.5} speed={1.5} className="flex items-center justify-end">
          <div className="flex items-center justify-center text-lg h-40 w-1/4 text-center rounded-lg bg-[#9d65d0] mx-4 md:w-2/5 md:mx-4">
            <p>Acadmic resource</p>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={2.5} speed={1.5} className="flex items-center justify-end">
          <div className="flex items-center justify-center text-lg h-40 w-1/4 text-center rounded-lg bg-[#5b65ad] mx-4 md:w-2/5 md:mx-4">
            <p>Skill resource</p>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={3.5} speed={1.5} className="flex items-center justify-end">
          <div className="flex items-center justify-center text-lg h-40 w-1/4 text-center rounded-lg bg-[#208079] mx-4 md:w-2/5 md:mx-4">
            <p>Comunity support</p>
          </div>
        </ParallaxLayer>
        
      
      </Parallax>
    </div>
  )
}
