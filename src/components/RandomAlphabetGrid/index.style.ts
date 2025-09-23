import styled, { keyframes } from "styled-components";

const flowDown = keyframes`
  0% {
    transform: translateY(-20px);
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(20px);
    opacity: 0.5;
  }
`;

export const RandomAlphabetGridWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  justify-items: center;

  .alphabet-letter {
    display: inline-block;
    font-weight: bold;
    font-size: 1.7rem;
    color: black;
    cursor: default;
    transition: color 0.3s ease;

    /* flowDown animation 적용 전용 래퍼 */
    & > .animate-wrapper {
      display: inline-block;
      animation-name: ${flowDown};
      animation-duration: 3s;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in-out;
      animation-fill-mode: forwards;
    }

    &:hover > .animate-wrapper {
      animation-play-state: paused;
      color: #fff;
      text-shadow: 0 0 6px #ae9ef7, 0 0 12px #ae9ef7, 0 0 18px #8a87f7;
    }
  }
`;
