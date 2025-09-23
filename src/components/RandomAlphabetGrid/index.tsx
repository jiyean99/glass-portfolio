import React, { useMemo } from "react";
import { RandomAlphabetGridWrap } from "./index.style";

interface StyledLetter {
  letter: string;
  rotation: number;
  scale: number;
  xOffset: number;
  yOffset: number;
}

const letters: string[] = [
  "W",
  "E",
  "B",
  "M",
  "O",
  "B",
  "I",
  "L",
  "E",
  "D",
  "E",
  "V",
  "E",
  "L",
  "O",
  "P",
  "E",
  "R",
];

const getRandom = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

const RandomAlphabetGrid: React.FC = () => {
  const styledLetters: StyledLetter[] = useMemo(() => {
    return letters.map((letter) => ({
      letter,
      rotation: getRandom(-30, 30),
      scale: getRandom(0.8, 1.5),
      xOffset: getRandom(-10, 10),
      yOffset: getRandom(-10, 10),
    }));
  }, []);

  return (
    <RandomAlphabetGridWrap>
      {styledLetters.map(
        ({ letter, rotation, scale, xOffset, yOffset }, idx) => (
          <span
            key={idx}
            className="alphabet-letter"
            style={{
              transform: `rotate(${rotation}deg) scale(${scale}) translate(${xOffset}px, ${yOffset}px)`,
            }}
          >
            {/* 애니메이션 대상만 래핑 */}
            <span
              className="animate-wrapper"
              style={{ display: "inline-block" }}
            >
              {letter}
            </span>
          </span>
        )
      )}
    </RandomAlphabetGridWrap>
  );
};

export default RandomAlphabetGrid;
