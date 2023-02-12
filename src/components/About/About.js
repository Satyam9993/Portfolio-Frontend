import React, { useState } from "react";

const About = () => {
  const [aboutme, setAboutme] = useState({
    headline: "hi, i am a btech student",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    intoduction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    profilephoto : "https://plus.unsplash.com/premium_photo-1673448391254-095fc8adf39a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHBob3RvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
  });
  return (
    <div id="about">
      <div className="m-auto max-w-6xl p-12">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 max-w-md flex flex-col justify-center">
            <div className="md:text-5xl text-2xl uppercase font-black">
              {aboutme.headline}
            </div>
            <div className="text-xl mt-4">{aboutme.description}</div>
            <div className="my-5 h-16">
              <div
                className="shadow-md font-medium py-2 px-4 text-yellow-100
                    cursor-pointer bg-yellow-600 hover:bg-yellow-500 rounded text-lg text-center w-48"
              >
                Join us now
              </div>
            </div>
          </div>
          <div className="flex md:justify-end w-full md:w-1/2 -mt-5">
            <div
              style={{
                backgroundImage:
                  "https://assets-global.website-files.com/5b5a66e9f3166b36708705fa/5dea7a12bb83ab1f13040de5_cx-dots.svg",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="shadow-2xl max-w-md z-10 rounded-full mt-6 ml-4">
                <img
                  alt="card img"
                  className="rounded-t"
                  src={aboutme.profilephoto || ""}
                />
                <div className="text-2xl p-10 bg-white">
                 {aboutme.intoduction}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
