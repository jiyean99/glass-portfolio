import styled, { keyframes, css } from "styled-components";

interface BasicLayoutWrapProps {
  $isTop: boolean;
  $isNavOpen: boolean;
}

const growLine = keyframes`
  from {
    transform: translateX(-50%) scaleX(0);
  }
  to {
    transform: translateX(-50%) scaleX(1);
  }
`;

export const BasicLayoutWrap = styled.div<BasicLayoutWrapProps>`
  --header-padding-block: 4px;
  --header-padding-inline: 32px;

  header {
    display: flex;
    padding-block: var(--header-padding-block);
    padding-inline: var(--header-padding-inline);
    justify-content: space-between;
    z-index: 100;
    position: fixed;
    top: 0;
    transition: all 0.5s;
    width: calc(100% - (var(--header-padding-inline) * 2));

    background: ${({ $isTop }) =>
      $isTop ? "none" : " rgba(255, 255, 255, 0.2)"};
    box-shadow: ${({ $isTop }) =>
      $isTop ? "none" : " 0 4px 30px rgba(0, 0, 0, 0.1)"};
    backdrop-filter: ${({ $isTop }) => ($isTop ? "none" : "blur(5px)")};
    -webkit-backdrop-filter: ${({ $isTop }) => ($isTop ? "none" : "blur(5px)")};

    &::after {
      content: "";
      display: ${({ $isTop }) => ($isTop ? "none" : "block")};
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      height: 1px;
      background-color: ${({ theme }) => theme.color.themeTxt};

      ${({ $isTop }) =>
        !$isTop &&
        css`
          animation: ${growLine} 1s ease forwards;
        `}
    }
  }

  main {
    filter: ${({ $isNavOpen }) =>
      !$isNavOpen ? "none" : "blur(70px) opacity(.5)"};
    -webkit-filter: ${({ $isNavOpen }) =>
      !$isNavOpen ? "none" : "blur(70px) opacity(.5)"};
  }

  .liquid-bg-canvas {
    background: transparent;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    // pointer-events: none !important;
    user-select: none;
  }

  header,
  main {
    pointer-events: none;
  }

  header button,
  header a,
  header [tabindex],
  main button,
  main a,
  main [tabindex] {
    cursor: pointer;
    pointer-events: auto;
  }
`;

export default BasicLayoutWrap;
