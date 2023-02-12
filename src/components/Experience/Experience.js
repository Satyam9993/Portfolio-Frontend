import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ExperienceCard from "./ExperienceCard";
import AddExperience from "./AddExperience";

const Experience = ({ UserdataRedux, showAlert }) => {
  const [experience, setExperience] = useState([
    // {
    //   type: "Internship",
    //   companyName: "Hubx.ai",
    //   role : "Full Stack Junior Devloper",
    //   certificateurl: "url",
    //   description: "Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.",
    // },
  ]);

  useEffect(() => {
    if (UserdataRedux?.experience) {
      setExperience(UserdataRedux?.experience);
    }
  }, [UserdataRedux]);

  return (
    <div style={{ margin: "0 10% 0 10%" }} id="experience">
      <div className="flex justify-center container">
        <section className="text-gray-600 body-font">
          <div className="flex justify-center">
            <div className="flex flex-col justify-center  my-8 w-[70%] space-y-28 lg:space-y-24 max-w-7xl">
              <div className="flex flex-col justify-center items-center ">
                <div className="text-xl md:text-3xl text-blue-500 font-bold uppercase">
                  Experience
                </div>
                <div className="border-b-4 border-blue-500 -mt-2">
                  {" "}
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp;
                </div>
              <AddExperience showAlert={showAlert}/>
              </div>
            </div>
          </div>
          <div className="container px-5 py-3 mx-auto flex flex-wrap">
            <div className="flex flex-wrap -m-4">
              {experience.map((exp) => {
                return <ExperienceCard exp={exp} key={exp._id} showAlert={showAlert}/>;
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (state) => {
  return {
    editPermissionRedux: state?.loginuser?.editPermission,
    loginUserRedux: state?.loginuser?.LoginUser,
    UserdataRedux: state?.Userdata?.User,
    
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Experience);
