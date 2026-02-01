import styled from "styled-components";

export const RandomAlphabetGridWrap = styled.div`
  position: relative;
  width: 100%;
  height: 20vh;
  > span {
    canvas {
      width: 100%;
    }
    &:nth-child(1) {
      position: absolute;
      width: 60px;
      height: 60px;
      top: 10%;
      left: 62%;
      transform: rotate(-18deg);
    }

    &:nth-child(2) {
      position: absolute;
      width: 60px;
      height: 60px;
      top: -1%;
      right: 17%;
      transform: rotate(26deg);
    }

    &:nth-child(3) {
      position: absolute;
      width: 60px;
      height: 60px;
      top: 33%;
      left: 40%;
      transform: rotate(-6deg);
    }

    &:nth-child(4) {
      position: absolute;
      width: 60px;
      height: 60px;
      top: 36%;
      left: 60%;
      transform: rotate(12deg);
    }
    &:nth-child(5) {
      position: absolute;
      width: 60px;
      height: 60px;
      top: 53%;
      left: 32%;
      transform: rotate(10deg);
    }
    &:nth-child(6) {
      position: absolute;
      width: 60px;
      height: 60px;
      top: 60%;
      left: 54%;
      transform: rotate(-12deg);
    }
    &:nth-child(7) {
      position: absolute;
      width: 60px;
      height: 60px;
      top: 74%;
      left: 40%;
      transform: rotate(-3deg);
    }
  }
`;
