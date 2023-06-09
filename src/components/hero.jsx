import React from "react";
import { BsArrowRightShort } from "react-icons/bs";
// import { Fade } from "react-awesome-reveal";

const Hero = ({ title, description, image }) => {
  return (
    <>
      <div
        className="heroContainer"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="heroDescription">
          <p className="description animate__animated animate__flash">
            {title}{" "}
          </p>
          <p className=" descriptionb animate__animated animate__bounce">
            {description}
          </p>
        </div>
        <div className="btnContainer">
          {/* <Fade left> */}
          <button className="heroBtn animate__animated animate__bounce">
            {" "}
            Learn More
          </button>
          {/* </Fade> */}
          {/* <Fade right> */}
          <div className="heroBtnSpan">
            <BsArrowRightShort />
          </div>
          {/* </Fade> */}
        </div>
      </div>
    </>
  );
};

export default Hero;
