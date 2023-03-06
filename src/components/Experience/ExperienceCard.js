import React from "react";
import { connect } from "react-redux";
import ImageModal from "./imageModal";
import EditExperience from "./EditExperience";

const ExperienceCard = ({ exp, showAlert }) => {
  return (
    <>
      <div className="p-4 lg:w-1/2 md:w-full" key={exp._id}>
        <div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
          <div className="flex-grow">
            <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
              <span className="flex justify-between">
                <span>
                  {exp.companyName}
                  <span className="bg-blue-100 text-blue-100 text-sm font-medium mr-2 mx-8 px-1.5 py-0.5 rounded dark:bg-blue-500 dark:text-blue-100">
                    {exp.type.toUpperCase()}
                  </span>
                </span>
                <span>
                  <EditExperience exp={exp} showAlert={showAlert} />
                </span>
              </span>
            </h2>
            <h3 className="text-blue-500 text-sm title-font font-medium mb-3">
              {exp.role}
            </h3>
            <p className="leading-relaxed text-base">{exp.description}</p>

            <ImageModal exp={exp} />
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
