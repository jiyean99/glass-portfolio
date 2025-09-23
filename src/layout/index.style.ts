import styled, { keyframes, css } from "styled-components";

interface BasicLayoutWrapProps {
  $isTop: boolean;
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
  --header-padding-block: 16px;
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
    background: none;
    box-shadow: ${({ $isTop }) => ($isTop ? "none" : "0 4px 30px #0000001a")};

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
      transform-origin: center;
      ${({ $isTop }) =>
        !$isTop &&
        css`
          animation: ${growLine} 1s ease forwards;
        `}
    }
  }
`;

export default BasicLayoutWrap;
