import styled from "styled-components";

// .intro-txt {
//   width: 100%;
//   text-align: center;
//   color: ${({ theme }) => theme.color.themeTxt};
//   font-size: ${({ theme }) => theme.font.xxlarge};
// }
// .scroll-btn {
//   background: none;
//   border: 1px solid ${({ theme }) => theme.color.themeTxt};
//   border-radius: 10px;
//   padding: 8px 12px;
//   position: absolute;
//   bottom: 32px;
//   left: 50%;
//   transform: translateX(-50%);
// }

export const HomeWrap = styled.main`
  width: auto;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
  max-width: 1920px;
  margin: 0 auto;
  box-sizing: border-box;
  padding-inline: 54px;

  // ******************** 인트로 영역 ********************
  .intro-section {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: flex-start;
    position: relative;

    .top-bar {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px 0 18px 0;
      position: relative;

      /* 수평선 구현 */
      &::before {
        content: "";
        position: absolute;
        left: 50%;
        top: calc(50% + 2px);
        transform: translate(-50%, -50%);
        width: calc(100% - (161px * 2));
        height: 1px;
        background: ${({ theme }) => theme.color.themeTxt};
      }

      span {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border-radius: 12px;
        width: 160px;
        height: 24px;
        text-align: center;
      }

      & > .left-ele,
      & > .right-ele {
        span {
          border: 1px solid ${({ theme }) => theme.color.themeTxt};
          background: none;
          color: ${({ theme }) => theme.color.themeTxt};
          font-size: ${({ theme }) => theme.font.tiny};
        }
      }

      & > .center {
        text-align: center;
        z-index: 1;

        span {
          padding-inline: 20px;
          background: #fe0100;
          font-size: ${({ theme }) => theme.font.tiny};
          color: ${({ theme }) => theme.color.white};
        }
      }
    }

    .intro-content {
      position: relative;
      width: 90%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .intro-main-img {
        position: relative;
        z-index: 2;
        height: 80%;
        max-width: 80%;
        object-fit: contain;
        margin: 0 auto;
        pointer-events: none;
        transform: translateY(-4%);
      }

      .intro-text-left {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(-50%, -50%) rotate(-90deg);
        color: #b8b8b8;
        font-size: 1rem;
        z-index: 3;
        letter-spacing: 0.03em;
      }

      .intro-text-right {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(50%, -50%) rotate(90deg);
        color: #b8b8b8;
        font-size: 1rem;
        z-index: 3;
        letter-spacing: 0.03em;
        text-align: right;
      }
    }

    .scroll-down-ele {
      display: block;
      position: absolute;
      bottom: 3%;
      left: 50%;
      transform: translateX(-50%);
      width: 32px;
      height: 56px;
      border: 1px solid ${({ theme }) => theme.color.themeTxt};
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;

      .dot {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 8px;
        height: 8px;
        background: ${({ theme }) => theme.color.themeTxt};
        border-radius: 50%;
        animation: moveDot 2s infinite cubic-bezier(0.4, 0, 0.2, 1);
      }

      @keyframes moveDot {
        0% {
          top: 15%;
          opacity: 1;
        }

        100% {
          top: 70%;
          opacity: 0;
        }
      }
    }
  }

  // ******************** 프로필 영역 ********************
  .profile-section {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    min-height: 340px;
    width: 100%;
    position: relative;

    .left {
      .title {
        font-weight: bold;
        font-size: 1.2rem;
        margin-bottom: 10px;
      }

      .content {
        /* 기본 텍스트 스타일 필요시 추가 */
      }

      .for-fun-title {
        font-weight: bold;
        margin-top: 24px;
      }

      .for-fun-list {
        margin-left: 16px;
        list-style-position: inside;
      }

      .experience-title {
        font-weight: bold;
        margin-top: 24px;
      }

      .experience-list {
        margin-left: 16px;
        list-style-position: inside;
      }
    }

    .center {
      position: absolute;
      top: 10%;
      left: 50%;
      transform: translateX(-55%);
      display: flex;
      flex-direction: column;
      align-items: center;

      .head-top {
        margin-bottom: -20px;
      }

      .head-bottom {
        /* 필요시 스타일 결정 */
      }
    }

    .right {
      .title {
        font-weight: bold;
        font-size: 1.2rem;
        margin-bottom: 10px;
      }

      ul {
        margin-left: 16px;
        list-style-position: inside;
      }

      .soft-skills-title {
        font-weight: bold;
        margin-top: 24px;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`;
