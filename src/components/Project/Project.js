import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import AddProject from "./AddProject";
import ProjectCard from "./ProjectCard";

const Project = ({UserdataRedux, showAlert}) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if(UserdataRedux.projects){
      setProjects(UserdataRedux?.projects)
    }
  }, [UserdataRedux])
  

  return (
    <section
      className="pt-20 lg:pt-[120px] pb-10 lg:pb-20"
      style={{ margin: "0 10% 0 10%" }}
      id="project"
    >
      <div className="container">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 text-center my-10">
          Projects
        </h1>
        <div className="text-center my-5">
        <AddProject showAlert={showAlert}/>
        </div>
        <div className="flex flex-wrap -mx-4">
          
            {projects.map((project)=>{
              return <ProjectCard project={project} showAlert={showAlert} key={project._id}/>;
            }
            )}
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    loginUserRedux: state?.loginuser?.LoginUser,
    UserdataRedux : state?.Userdata?.User
  };
};
export default connect(mapStateToProps, null)(Project);
