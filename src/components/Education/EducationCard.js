import React from "react";
import EditEducation from "./EditEducation";

const EducationCard = ({edu}) => {
  return (
    <div className="p-4 lg:w-1/2" style={{minWidth:"15rem"}}>
      <div className="h-full w-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
        <div className="rounded-full h-40 w-40">
        <img
          alt="team"
          // className="flex-shrink-0 rounded-lg w-40 h-40 object-cover object-center sm:mb-0 mb-4"
          className="h-full w-full"
          src={edu.imageurl}
        />
        </div>
        <div className="flex-grow sm:pl-8">
          <h2 className="title-font font-medium text-lg text-gray-900">
            {edu.courseName}{" "}
          </h2>
          <EditEducation edu={edu}/>
          <h3 className="text-gray-500 mb-3">{edu.institutionName}</h3>
          {edu.stream && <h3 className="text-gray-500 mb-3">{edu.stream}</h3>}
          <h3 className="text-gray-500 mb-3">
            {edu.startYear} - {edu.endYear}
          </h3>
          <div className="mb-4">
            <p className="text-gray-700">Performance : {edu.performance}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationCard;
