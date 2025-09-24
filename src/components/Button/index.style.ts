import styled from "styled-components";

export const HamburgerButtonWrap = styled.button`
  width: 50px;
  height: 50px;
  background: transparent;
  border: none;
  z-index: 100;

  .hamburger-btn-elem {
    width: 32px;
    height: 18px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0;
  }

  .bar {
    display: block;
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.color.themeTxt};
    border-radius: 2px;
    transition: all 0.4s ease;
    transform-origin: center;
  }

  &.open {
    .hamburger-btn-elem {
      height: 22px;
    }
    .bar:nth-child(1) {
      transform: translateY(10px) rotate(45deg);
    }
    .bar:nth-child(2) {
      opacity: 0;
    }
    .bar:nth-child(3) {
      transform: translateY(-10px) rotate(-45deg);
    }
  }
`;

export const ThemeToggleButtonWrap = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  background: none;
  transition: 0.3s cubic-bezier(0.8, 0, 0.2, 1);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;

  .icon {
    position: relative;
    display: inline-block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    box-shadow: ${({ theme }) => theme.color.themeTxt} 20px -12px 0px 0px inset;
    transform: scale(0.5) rotate(0deg);
    transition: transform 0.5s 0.1s, box-shadow 0.2s;
  }

  .icon::before {
    content: "";
    width: inherit;
    height: inherit;
    border-radius: inherit;
    position: absolute;
    left: 0;
    top: 0;
    transition: background 0.3s;
    background-color: inherit;
  }

  .icon::after {
    content: "";
    width: 4px;
    height: 4px;
    border-radius: 50%;
    margin: -2px 0 0 -2px;
    position: absolute;
    top: 50%;
    left: 50%;
    box-shadow: ${({ theme }) => theme.color.themeTxt} 0px -14px 0px,
      ${({ theme }) => theme.color.themeTxt} 0px 14px 0px,
      ${({ theme }) => theme.color.themeTxt} 14px 0px 0px,
      ${({ theme }) => theme.color.themeTxt} -14px 0px 0px,
      ${({ theme }) => theme.color.themeTxt} 10px 10px 0px,
      ${({ theme }) => theme.color.themeTxt} -10px 10px 0px,
      ${({ theme }) => theme.color.themeTxt} 10px -10px 0px,
      ${({ theme }) => theme.color.themeTxt} -10px -10px 0px;
    transform: scale(1.5);
    transition: transform 0.6s 0.15s;
  }

  &.dark {
    .icon {
      box-shadow: ${({ theme }) => theme.color.themeTxt} 6px -6px 0px 0px inset;
      transform: scale(1) rotate(-2deg);
      transition: box-shadow 0.5s, transform 0.4s 0.1s;
    }

    .icon::after {
      transform: scale(0);
      transition: transform 0.5s;
    }
  }
`;
