import { HomeWrap } from "../styles/containers/Home.style";
import PixelDot from "../components/Image/PixelDot";
import HeadTopImg from "../assets/images/head-top.png";
import HeadBottomImg from "../assets/images/head-bottom.png";
import IntroTxtImg from "../assets/images/intro-txt.png";
import RandomAlphabetGrid from "../components/RandomAlphabetGrid";

// 기획 변경으로 인한 주석처리
// const getCurrentKoreanTime = () => {
//   const locale = "ko-KR";
//   const options: Intl.DateTimeFormatOptions = {
//     year: "2-digit",
//     month: "2-digit",
//     day: "2-digit",
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//     hour12: false,
//     timeZone: "Asia/Seoul",
//   };
//   return new Date()
//     .toLocaleString(locale, options)
//     .replace(/\./g, "")
//     .replace(/\s+/g, " ")
//     .trim();
// };

const Home: React.FC = () => {
  // 기획 변경으로 인한 주석처리
  // const [timeLeft, setTimeLeft] = useState(getCurrentKoreanTime());

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTimeLeft(getCurrentKoreanTime());
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <HomeWrap>
      <section className="intro-section">
        {/* 기획 변경으로 인한 주석처리 */}
        {/* <div className="top-bar">
          <div className="left-ele">
            <span>KR {timeLeft}</span>
          </div>
          <div className="center">
            <span>PORTFOLIO</span>
          </div>
          <div className="right-ele">
            <span>Ready To Bloom</span>
          </div>
        </div> */}
        <div className="intro-content">
          <img
            src={IntroTxtImg}
            alt="BLOOMING DEVELOPER"
            className="intro-main-img"
          />
          <div className="intro-text-left">
            A blooming developer, Jiyoun Lee, passionate about growth and
            innovation.
          </div>
          <div className="intro-text-right">
            꽃을 피울 준비가 된 개발자 이지연입니다. 성장과 혁신을 향한 열정을
            품고 있습니다.
          </div>
        </div>

        <div className="scroll-down-ele">
          <span className="dot"></span>
        </div>
      </section>

      <section className="profile-section">
        {/* 좌측 */}
        <div className="left">
          <div className="title">Profile</div>
          <div className="content">
            이지연 | Lee Ji Yean
            <br />
            1999.05.19
          </div>
          <div className="for-fun-title">For Fun</div>
          <ul className="for-fun-list">
            <li>7080 가요 듣기</li>
            <li>자전거 타기</li>
          </ul>
          <div className="experience-title">Experience</div>
          <ul className="experience-list">
            <li>2023.03~2025.08 : (주)젤퍼블릭</li>
          </ul>
        </div>
        {/* 중앙 */}
        <div className="center">
          <div className="head-top">
            <PixelDot src={HeadTopImg} pixelSize={5} />
          </div>
          <RandomAlphabetGrid />
          <div className="head-bottom">
            <PixelDot src={HeadBottomImg} pixelSize={5} />
          </div>
        </div>
        {/* 우측 */}
        <div className="right">
          <div className="title">Hard Skills</div>
          <ul>
            <li>Javascript</li>
            <li>Typescript</li>
            <li>React.js</li>
            <li>Vue.js</li>
            <li>ETC</li>
          </ul>
          <div className="soft-skills-title">Soft Skills</div>
          <ul>
            <li>커뮤니케이션 능력</li>
            <li>긍정적 태도</li>
            <li>책임감 있는 태도</li>
          </ul>
        </div>
      </section>
    </HomeWrap>
  );
};

export default Home;
