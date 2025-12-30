import React from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import img1 from "../assets/home.jpg";
import img2 from "../assets/PAO.jpg";
import img3 from "../assets/succession-1.jpg";
import img4 from "../assets/pak-id-slide.png";
import "./style.css";

function Sliderr() {
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  return (
    <div className="bg1">
      <AutoplaySlider
        play={true}
        cancelOnInteraction={false} // should stop playing on user interaction
        interval={3000}
        bullets={false}
      >
        <div data-src={img1} style={{ height: "92vh" }} />
        <div data-src={img2} style={{ height: "92vh" }} />
        <div data-src={img3} style={{ height: "92vh" }} />
        <div data-src={img4} style={{ height: "92vh" }} />
      </AutoplaySlider>
    </div>
  );
}

export default Sliderr;
