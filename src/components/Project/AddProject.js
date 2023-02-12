import React, { useState } from "react";
import { connect } from "react-redux";
import { AddProjects } from '../../actions/Project/Project'
import { updateUserData } from "../../actions/UserData/userdata";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const AddProject = ({ editPermissionRedux, UserdataRedux, updateUserDataAction, showAlert }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [formdata, setFormdata] = useState({
    title: "",
    description:"",
    imageurl:"",
    projecturl: "",
    githuburl: "",
  });

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

    if (formdata.selectedFile) {
        showAlert("Please Add Project Image", "danger");
        return;
    }
    if (selectedFile && editPermissionRedux) {
        const imageRef = ref(storage, `images/project/${v4()}`);
        await uploadBytes(imageRef, selectedFile)
          .then((snapshort) => {
            getDownloadURL(snapshort.ref).then((url) => {
              const body = {
                title: formdata.title,
                description: formdata.description,
                githuburl: formdata.githuburl,
                projecturl : formdata.projecturl,
                imageurl: url
              };
              AddProjects(body)
                .then(async (res) => {
                  if (res) {
                    handleCloseModal();
                    await updateUserDataAction(UserdataRedux._id);
                    setFormdata({
                        title: "",
                        description:"",
                        imageurl:"",
                        projecturl: "",
                        githuburl: ""
                    });
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
      }
  };

  return (
    <>
      {editPermissionRedux && (
        <button
          className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-lg font-medium px-4 my-2 py-2 inline-flex space-x-1 items-center"
          onClick={handleShowModal}
        >
          <span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </span>
          <span>ADD</span>
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
                      <span>Add Project</span>
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
    editPermissionRedux: state?.loginuser?.editPermission,
    UserdataRedux: state?.Userdata?.User,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddProject);
