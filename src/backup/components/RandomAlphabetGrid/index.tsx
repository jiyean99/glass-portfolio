import { RandomAlphabetGridWrap } from "./index.style";
import PixelDot from "../Image/PixelDot";
import ReactIcon from "../../assets/images/icon/React.png";
import JsIcon from "../../assets/images/icon/JavaScript.png";
import TsIcon from "../../assets/images/icon/TypeScript.png";
import DockerIcon from "../../assets/images/icon/Docker.png";
import GitIcon from "../../assets/images/icon/Git.png";
import IntelliJIcon from "../../assets/images/icon/IntelliJ IDEA.png";

const iconsSrc = [ReactIcon, JsIcon, TsIcon, DockerIcon, GitIcon, IntelliJIcon];

const RandomIconGrid = () => {
  return (
    <RandomAlphabetGridWrap>
      {iconsSrc.map((src, idx) => (
        <span key={idx} style={{ display: "inline-block" }}>
          <PixelDot src={src} pixelSize={6} />
        </span>
      ))}
    </RandomAlphabetGridWrap>
  );
};

export default RandomIconGrid;
