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

        <p className="mt-4 text-center text-gray-500">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum quam
          voluptatibus
        </p>
        <div className="flex justify-center">
          <AddProject showAlert={showAlert} />
        </div>
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
