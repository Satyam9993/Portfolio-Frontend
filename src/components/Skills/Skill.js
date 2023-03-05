import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import AddSkill from "./AddSkill";
import SkillCard from "./SkillCard";

const Skill = ({ UserdataRedux, showAlert }) => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if (UserdataRedux.skills) {
      setSkills(UserdataRedux?.skills);
    }
  }, [UserdataRedux]);

  return (
    <div className="my-24" id="skills">
    <div className="text-center">
    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 text-center my-12">
        Skills | Course | Certification | Licence
    </h1>
    <AddSkill showAlert={showAlert}/>
    </div>
    <section
      className="text-gray-600 body-font flex justify-center items-center"
      style={{ margin: "3% 10% 0 10%" }}
    >
      <div className="container py-1 mx-auto">
        <div className="flex flex-wrap -m-4 text-center">
          {skills.map((skill) => <SkillCard key={skill._id} skill={skill}/>)}
        </div>
      </div>
    </section>
    </div>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (state) => {
  return {
    loginUserRedux: state?.loginuser?.LoginUser,
    UserdataRedux: state?.Userdata?.User,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Skill);

