import React from "react";
import { connect } from "react-redux";
import ImageModal from "./imageModal";
import EditExperience from "./EditExperience";

const ExperienceCard = ({ exp, showAlert }) => {
  return (
    <>
      <div className="p-4 lg:w-1/2 md:w-full" key={exp._id}>
        <div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
          <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10"
              viewBox="0 0 24 24"
            >
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div className="flex-grow">
            <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
              {exp.companyName}
              <span className="bg-blue-100 text-blue-100 text-sm font-medium mr-2 mx-8 px-1.5 py-0.5 rounded dark:bg-blue-500 dark:text-blue-100">
                {exp.type.toUpperCase()}
              </span>
              <EditExperience exp={exp} showAlert={showAlert}/>
            </h2>
            <h3 className="text-blue-500 text-sm title-font font-medium mb-3">
              {exp.role}
            </h3>
            <p className="leading-relaxed text-base">{exp.description}</p>

            <ImageModal exp={exp}/>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    UserdataRedux: state?.Userdata?.User,
  };
};
export default connect(mapStateToProps, null)(ExperienceCard);
