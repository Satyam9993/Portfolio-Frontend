import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import AddProject from "./AddProject";
import ProjectCard from "./ProjectCard";

const Project = ({ UserdataRedux, showAlert }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (UserdataRedux.projects) {
      setProjects(UserdataRedux?.projects);
    }
  }, [UserdataRedux]);

  return (
    <section className="bg-white" style={{ margin: "0 5% 0 5%" }}>
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-900 capitalize lg:text-3xl">
          Projects
        </h1>
        <div className="flex justify-center">
          <AddProject showAlert={showAlert} />
        </div>
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-2">
          {projects.map((project) => {
            return (
              <ProjectCard
                project={project}
                showAlert={showAlert}
                key={project._id}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    loginUserRedux: state?.loginuser?.LoginUser,
    UserdataRedux: state?.Userdata?.User,
  };
};
export default connect(mapStateToProps, null)(Project);
