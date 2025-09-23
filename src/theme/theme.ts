import styled from "styled-components";

export type Theme = {
  color: {
    mainBg: string;
    mainColor: string;
    subColor: string;
    subColor2: string;
    accordion1: string;
    subBg: string;
    accordion2: string;
    contentsBg: string;
    tabBg: string;
    disableBg: string;
    skyBg: string;
    btn: string;
    gray: string;
    modalTxt: string;
    modalSubTxt: string;
    modalDarkBg: string;
    modalSubBg: string;
    modalSubBg2: string;
    modalred: string;
    modalOrange: string;
    modalyellow: string;
    modalgray: string;
    modalBlue: string;
    modalBg: string;
    themeTxt: string;
    darkTxt: string;
    matchTit1: string;
    matchTit2: string;
    primary: string;
    primaryBg: string;
    secondaryBg: string;
    redBg: string;
    blueBg: string;
    select: string;
    red: string;
    blue: string;
    pink: string;
    disableTxt: string;
    disableTxt2: string;
    underover: string;
    handicap: string;
    purple: string;
    yellow: string;
    TP: string;
    white: string;
    whiteBg: string;
  };
  border: {
    default: string;
    secondery: string;
    line: string;
    inputLine: string;
  };
  font: {
    xxlarge: string;
    xlarge: string;
    largeNum: string;
    title: string;
    large: string;
    medium: string;
    small: string;
    tiny: string;
  };
  fontW: {
    bold: string;
    medium: string;
    regular: string;
  };
};

export default styled;
