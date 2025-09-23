import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: 'Jersey 25';
    src: url('/fonts/Jersey25.woff2') format('woff2'),
         url('/fonts/Jersey25.woff') format('woff'),
         url('/fonts/Jersey25.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  /* CSS reset 코드 시작 */
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
    transition: all 0.3s;
  }

  body {
    line-height: 1;
    font-family: "Noto Sans KR", sans-serif;
    background-color: ${({ theme }) => theme.color.mainBg};
  }
    
  html *,
  body * {
    cursor: none;
  }

  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  /* CSS reset 코드 끝 */

  button {
    font-family: "Noto Sans KR", sans-serif;
  }

  /* Jersey 25 폰트를 특정 클래스에만 적용 */
  .jersey-font {
    font-family: "Jersey 25", cursive, sans-serif;
  }

  #cursor-dot, #cursor-dot-outline {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: opacity 0.15s ease, transform 0.15s ease;
    z-index: 9999;
  }

  #cursor-dot {
    width: 8px;
    height: 8px;
    background-color: ${({ theme }) => theme.color.themeTxt};
  }

  #cursor-dot-outline {
    width: 35px;
    height: 35px;
    border: 2px solid ${({ theme }) => theme.color.themeTxt};
    background-color: transparent;
  }

`;

export default GlobalStyle;
