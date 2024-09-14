import React, { useState } from "react";
import { useSprings, animated, to as interpolate } from "@react-spring/web";
import { useDrag } from "react-use-gesture";
import aitarot from "../assets/aitarot.png";
import logotarot from "../assets/logotarot.png";
import robottarot from "../assets/robottarot.png";
import mltarot from "../assets/mltarot.png";

const cards = [robottarot, mltarot, aitarot, logotarot];

const to = (i) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});
const from = (_i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`;

function Deck({ setActiveCard }) {
  const [gone] = useState(() => new Set());
  const [props, api] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  }));

  // useDrag will track the dragging behavior
  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2;
      const dir = xDir < 0 ? -1 : 1; // Direction of drag, left or right
      if (!down && trigger) gone.add(index); // Mark card as gone if velocity is greater than threshold

      api.start((i) => {
        if (index !== i) return; // Don't change other cards
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0; // Move card out of screen if gone
        const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0); // Rotation based on movement
        const scale = down ? 1.1 : 1; // Scale up while dragging

        // Update the active card index dynamically as soon as dragging starts
        if (down) {
          setActiveCard(index);
        }

        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });

      if (!down && gone.size === cards.length) {
        // Reset cards after all are swiped away
        setTimeout(() => {
          gone.clear();
          api.start((i) => to(i));
        }, 600);
      }
    }
  );

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-lightblue cursor-custom">
      {props.map(({ x, y, rot, scale }, i) => (
        <animated.div
          className="absolute w-[300px] h-[200px] flex items-center justify-center"
          key={i}
          style={{ x, y }}
        >
          <animated.div
            {...bind(i)}
            style={{
              transform: interpolate([rot, scale], trans),
              backgroundImage: `url(${cards[i]})`,
            }}
            className="bg-contain bg-no-repeat bg-center w-[45vh] max-w-[150px] h-[85vh] max-h-[285px] rounded-lg shadow-lg"
          />
        </animated.div>
      ))}
    </div>
  );
}

export default Deck;
