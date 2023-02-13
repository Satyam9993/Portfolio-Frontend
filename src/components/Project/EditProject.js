import React, { useState } from "react";
import { connect } from "react-redux";
import { EditSkills, RemoveProject } from "../../actions/Project/Project";
import { updateUserData } from "../../actions/UserData/userdata";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useEffect } from "react";

const EditProject = ({
  loginUserRedux,
  UserdataRedux,
  updateUserDataAction,
  showAlert,
  project,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [formdata, setFormdata] = useState({
    title: project.title,
    description: project.description,
    imageurl: project.imageurl,
    projecturl: project.projecturl,
    githuburl: project.githuburl,
  });

  useEffect(() => {
    if (project) {
      setFormdata({
        title: project.title,
        description: project.description,
        imageurl: project.imageurl,
        projecturl: project.projecturl,
        githuburl: project.githuburl,
      });
    }
  }, []);

  const handleonChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (formdata.title.length < 3) {
      showAlert("Name is too short!", "danger");
      return;
    }
    if (formdata.description.length < 4) {
      showAlert("Description is too short!", "danger");
      return;
    }
    if (formdata.githuburl.length < 6) {
      showAlert("Please Add github url", "danger");
      return;
    }
    if (selectedFile && (loginUserRedux.loginUserId === UserdataRedux._id)) {
      const imageRef = ref(storage, `images/project/${v4()}`);
      await uploadBytes(imageRef, selectedFile)
        .then((snapshort) => {
          getDownloadURL(snapshort.ref).then((url) => {
            const body = {
              title: formdata.title,
              description: formdata.description,
              githuburl: formdata.githuburl,
              projecturl: formdata.projecturl,
              imageurl: url,
            };
            EditSkills(body, project._id)
              .then(async (res) => {
                if (res) {
                  handleCloseModal();
                  await updateUserDataAction(UserdataRedux._id);
                }
              })
              .catch((err) => {
                showAlert("Something went wrong!", "danger");
              });
          });
        })
        .catch((err) => {
          showAlert("Something went wrong!", "danger");
        });
    } else if ((loginUserRedux.loginUserId === UserdataRedux._id)) {
      const body = {
        title: formdata.title,
        description: formdata.description,
        githuburl: formdata.githuburl,
        projecturl: formdata.projecturl,
        imageurl: project.imageurl
      };
      EditSkills(body, project._id)
        .then(async (res) => {
          if (res) {
            handleCloseModal();
            await updateUserDataAction(UserdataRedux._id);
          }
        })
        .catch((err) => {
          showAlert("Something went wrong!", "danger");
        });
    }
  };

  const handleRemove = () =>{
    if(window.confirm("Are you sure?")){
        RemoveProject(project._id)
          .then(async (res) => {
            if (res) {
              await updateUserDataAction(UserdataRedux._id);
            }
          })
          .catch((err) => {
            showAlert("Some thing went wrong!!", "danger")
          });
    }
  }

  return (
    <>
      {(loginUserRedux.loginUserId === UserdataRedux._id) && (
        <button
          className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
          onClick={handleShowModal}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </span>
        </button>
      )}

      {(loginUserRedux.loginUserId === UserdataRedux._id) && (
        <button className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
        onClick={handleRemove}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </span>
        </button>
      )}
      {showModal && (
        <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
          <div
            className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
            onClick={handleCloseModal}
          />

          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <p className="text-2xl font-bold mb-2">Add Project</p>
              <div className="lg:w-2/2 md:w-5/5 mx-auto">
                <div className="flex flex-wrap">
                  <div className="p-2 w-full">
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Project Name *
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        value={formdata.title}
                        onChange={handleonChange}
                      />
                    </div>
                  </div>
                  <div className="p-2 w-full">
                    <div className="relative">
                      <label
                        htmlFor="description"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Description*
                      </label>
                      <textarea
                        type="text"
                        id="description"
                        name="description"
                        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full h-20 appearance-none leading-normal"
                        value={formdata.description}
                        onChange={handleonChange}
                      />
                    </div>
                  </div>
                  <div className="p-2 w-full">
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Project URL
                      </label>
                      <input
                        type="text"
                        id="projecturl"
                        name="projecturl"
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        value={formdata.projecturl}
                        onChange={handleonChange}
                      />
                    </div>
                  </div>
                  <div className="p-2 w-full">
                    <div className="relative">
                      <label
                        htmlFor="githuburl"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        GitHub URL*
                      </label>
                      <input
                        type="text"
                        id="githuburl"
                        name="githuburl"
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        value={formdata.githuburl}
                        onChange={handleonChange}
                      />
                    </div>
                  </div>
                  <div className="p-2 w-full">
                    <div className="relative">
                      <label
                        htmlFor="description"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Upload Project Image(Optional)*
                      </label>
                      <input
                        className="block w-full text-gray-600 border border-gray-300 rounded-sm cursor-pointer bg-gray-50 dark:placeholder-gray-400"
                        type="file"
                        onChange={handleFileSelect}
                      />
                    </div>
                  </div>
                  <div className="p-2 w-full">
                    <button
                      className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
                      onClick={handleSave}
                    >
                      <span>
                        <svg
                          className="fill-current text-gray-500 h-4 w-4"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"
                          />
                        </svg>
                      </span>
                      <span>Edit</span>
                    </button>
                    <button
                      className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
                      onClick={handleCloseModal}
                    >
                      <span>
                        <svg
                          className="fill-current text-gray-500 h-4 w-4"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </svg>
                      </span>
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapDispatchToProps = {
  updateUserDataAction: updateUserData,
};

const mapStateToProps = (state) => {
  return {
    loginUserRedux: state?.loginuser?.LoginUser,
    UserdataRedux: state?.Userdata?.User,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditProject);
