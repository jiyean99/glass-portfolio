import styled from "styled-components";

export const NavigationWrap = styled.div`
  position: absolute;

  .nav-panel {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    transform: translateX(-100%);
    transition: transform 0.45s cubic-bezier(0.86, 0.09, 0.79, 0.97);
    display: flex;
    flex-direction: column;
    z-index: 99;
  }
  .nav-panel.open {
    transform: translateX(0);
  }

  nav ul {
    list-style: none;
    padding: 0;
    margin: 8% 0 0 0;
  }

  nav li {
    width: fit-content;
    margin: 0 0 1% 8%;
    letter-spacing: -0.04em;
    font-size: 8rem;
    font-family: "Manrope", "Pretendard", sans-serif;
    font-weight: 600;
    color: ${({ theme }) => theme.color.themeTxt}33;
    position: relative;
    transition: color 0.22s;
  }

  nav li.active,
  nav li:focus,
  nav li.selected {
    color: ${({ theme }) => theme.color.mainBg};
    font-weight: 700;
  }
  nav li.active .nav-label,
  nav li.selected .nav-label {
    display: inline-block;
    padding-bottom: 2px;
  }

  .nav-label {
    font-size: inherit;
    line-height: 1.06;
    transition: color 0.2s;
  }

  .nav-label::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%; /* 텍스트 너비 전체 */
    height: 4px;
    background-color: #fe0100; /* 빨간 밑줄 색 */
    transform-origin: left center;
    transform: scaleX(0); /* 기본 너비 0으로 숨김 */
    transition: transform 0.3s ease;
  }

  nav a:hover .nav-label::after {
    transform: scaleX(1); /* 호버 시 원래 너비로 확대 */
  }

  .nav-index {
    font-size: 1.03rem;
    color: ${({ theme }) => theme.color.themeTxt}33;
    margin-right: 18px;
    font-weight: 500;
    letter-spacing: 0.02em;
    vertical-align: top;
    font-family: inherit;
  }
  nav a {
    color: inherit;
    background: none;
    text-decoration: none;
    display: flex;
    align-items: baseline;
    gap: 18px;
    transition: color 0.23s;
  }
  nav a:hover .nav-label {
    color: ${({ theme }) => theme.color.themeTxt};
  }
  .nav-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.33);
    z-index: 98;
  }
`;
