import React from "react";
import { connect } from "react-redux";
import EditProject from "./EditProject";

const ProjectCard = ({ project, showAlert }) => {
  return (
    <div className="w-full md:w-1/2 xl:w-1/3 px-4">
      <div className="bg-white rounded-lg overflow-hidden mb-10">
        <img src={project.imageurl} alt="image" className="w-full" />
        <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
          <div className="inline-flex items-center rounded-md shadow-sm">
            <EditProject project={project} showAlert={showAlert}/>
          </div>
          <h3>
            <a
              href={project.projecturl}
              className="
                        font-semibold
                        text-dark text-xl
                        sm:text-[22px]
                        md:text-xl
                        lg:text-[22px]
                        xl:text-xl
                        2xl:text-[22px]
                        mb-4
                        block
                        hover:text-primary
                        "
              target="_blank"
            >
              {project.title}
            </a>
          </h3>
          <p className="text-base text-body-color leading-relaxed mb-7">
            {project.description}
          </p>
          <a
            href={project.githuburl}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            target="_blank"
          >
            View GitHub
          </a>
          <a
            href={project.projecturl}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            target="_blank"
          >
            View Project
          </a>
        </div>
      </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(ProjectCard);
