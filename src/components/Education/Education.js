import React, { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import AddEducation from "./AddEducation";
import EducationCard from "./EducationCard";

const Education = ({showAlert, UserdataRedux}) => {
  const [Educations, setEducations] = useState([]);

  useEffect(() => {
    if(UserdataRedux.education){
      setEducations(UserdataRedux.education)
    }
  }, [UserdataRedux])
  
  return (
    <div style={{ margin: "0 10% 0 10%" }} id="education">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-8">
            <h1 className="text-2xl font-medium title-font mb-4 text-gray-900 tracking-widest">
              MY Education
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              The function of education is to teach one to think intensively and to think critically. Intelligence plus character - that is the goal of true education.
            </p>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              "Martin Luther King, Jr"
            </p>
          </div>
          <div className="text-center">
          <AddEducation showAlert={showAlert}/>
          </div>
          <div className="flex flex-wrap my-10">
            {Educations.map((edu) => {
              return (
                <EducationCard edu={edu} key={edu._id}/>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    UserdataRedux : state?.Userdata?.User
  };
};
export default connect(mapStateToProps, null)(Education);
