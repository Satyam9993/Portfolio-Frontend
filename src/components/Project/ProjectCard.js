import React from "react";
import { connect } from "react-redux";
import EditProject from "./EditProject";

const ProjectCard = ({ project, showAlert }) => {
  return (
    <div
        className="overflow-hidden bg-cover rounded-lg cursor-pointer h-96 group shadow-lg"
        style={{
          backgroundImage: `url(${project.imageurl})`,
        }}
      >
        <EditProject project={project} showAlert={showAlert} />
        <div className="flex flex-col justify-center w-full h-full px-10 py-4 transition-opacity duration-700 opacity-0 backdrop-blur-sm bg-gray-800/60 group-hover:opacity-100">
          <div className="flex justify-between">
            <a
              className="text-2xl font-semibold text-white capitalize my-2"
              rel="noreferrer"
              target="_blank"
              href={project.projecturl}
            >
              {project.title}
            </a>
          </div>
          <p className="text-base text-white text-body-color leading-relaxed mb-7">
            {project.description}
          </p>
          <div className="mx-14 flex justify-between">
            <a
              className="mt-2 text-lg tracking-wider text-blue-400 uppercase"
              href={project.projecturl}
              target="_blank"
              rel="noreferrer"
            >
              Website
            </a>
            <p className="mt-2 text-lg tracking-wider text-blue-400 uppercase ">
              GitHub
            </p>
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
