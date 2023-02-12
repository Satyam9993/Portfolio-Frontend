import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { editExperience, removeExperience } from "../../actions/Experience/Experience";
import { updateUserData } from "../../actions/UserData/userdata";

const EditExperience = ({
  editPermissionRedux,
  exp,
  UserdataRedux,
  updateUserDataAction,
  showAlert
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleonChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const [formdata, setFormdata] = useState({
    type: "",
    description: "",
    companyName: "",
    role: "",
    certificateurl: "",
  });

  const handleSave = async (event) => {
    event.preventDefault();
    if(formdata.type.length == 0){
      showAlert("Please select type of Experience!", "danger");
      return;
    }
    if(formdata.companyName.length < 3){
      showAlert("Company Name is too short!", "danger");
      return;
    }
    if(formdata.role.length < 3){
      showAlert("plaease decribe role!", "danger");
      return;
    }
    if(formdata.description.length == 0){
      showAlert("Describe experince you get!", "danger");
      return;
    }
    if(formdata.description.length < 50){
      showAlert("Description is too short", "danger");
      return;
    }
    if (selectedFile && editPermissionRedux) {
      const imageRef = ref(storage, `images/experience/${exp._id}`);
      await uploadBytes(imageRef, selectedFile)
        .then((snapshort) => {
          getDownloadURL(snapshort.ref).then((url) => {
            const body = {
              type: formdata.type,
              description: formdata.description,
              companyName: formdata.companyName,
              role: formdata.role,
              certificateurl: url,
            };
            editExperience(body, exp._id)
              .then(async (res) => {
                if (res) {
                  handleCloseModal();
                  await updateUserDataAction(UserdataRedux._id);
                }
              })
              .catch((err) => {
                showAlert("Something went wrong try again!", "danger");
              });
          });
        })
        .catch((err) => {
          showAlert("Something went wrong try again!", "danger");
        });
    } else {
      const body = {
        type: formdata.type,
        description: formdata.description,
        companyName: formdata.companyName,
        role: formdata.role,
      };
      editExperience(body, exp._id)
        .then(async (res) => {
          if (res) {
            handleCloseModal();
            await updateUserDataAction(UserdataRedux._id);
          }
        })
        .catch((err) => {
          showAlert("Something went wrong try again!", "danger");
        });
    }
  };

  const handleRemove = async (event) => {
    event.preventDefault();
    if(window.confirm("Are you sure?")){

        const body = {
          type: formdata.type,
          description: formdata.description,
          companyName: formdata.companyName,
          role: formdata.role,
        };
        removeExperience(exp._id)
          .then(async (res) => {
            if (res) {
              await updateUserDataAction(UserdataRedux._id);
            }
          })
          .catch((err) => {
            // Alert
          });
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (exp) {
      setFormdata(exp);
    }
  }, [exp]);

  return (
    <>
      {editPermissionRedux && (
        <button
          className="text-slate-800 hover:text-blue-600 text-md bg-white hover:text-blue-500 font-medium px-1 py-2 inline-flex space-x-1 items-center"
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
      {editPermissionRedux && (
        <button
          className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:text-red-500 font-medium px-1 py-2 inline-flex space-x-1 items-center"
          onClick={handleRemove}
        >
          <span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z" />
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
              <p className="text-2xl font-bold mb-2">Edit Form</p>
              <div className="lg:w-2/2 md:w-5/5 mx-auto">
                <div className="flex flex-wrap">
                  <div className="p-2 w-full">
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className="leading-7 text-sm text-gray-600"
                      >
                        Experience Type
                      </label>
                      <select
                        id="type"
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        name="type"
                        onChange={handleonChange}
                        value={formdata.type}
                      >
                        {/* <option>Choose Type</option> */}
                        <option value="internship">INTERNSHIP</option>
                        <option value="job">JOB</option>
                        <option value="free-lancing">FREE-LANCING</option>
                        <option value="open-source">OPEN-SOURCE</option>
                        <option value="personal project">
                          PERSONAL PROJECT
                        </option>
                        <option value="other">OTHER</option>
                      </select>
                    </div>
                  </div>
                  <div className="p-2 w-full">
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className="leading-7 text-sm text-gray-600"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        value={formdata.companyName}
                        onChange={handleonChange}
                      />
                    </div>
                  </div>
                  <div className="p-2 w-full">
                    <div className="relative">
                      <label
                        htmlFor="description"
                        className="leading-7 text-sm text-gray-600"
                      >
                        Role
                      </label>
                      <input
                        type="text"
                        id="role"
                        name="role"
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        value={formdata.role}
                        onChange={handleonChange}
                      />
                    </div>
                  </div>
                  <div className="p-2 w-full">
                    <div className="relative">
                      <label
                        htmlFor="description"
                        className="leading-7 text-sm text-gray-600"
                      >
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                        value={formdata.description}
                        onChange={handleonChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className="p-2 w-full">
                    <div className="relative">
                      {/* <div className="flex items-center justify-center h-10 w-10 bg-gray-300 rounded-lg">
                        <img
                          src="https://images.unsplash.com/photo-1675411271074-65e6b0b86a9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                          className="h-10 w-10 object-cover rounded-lg"
                          alt="Uploaded Image"
                        />
                      </div> */}

                      <label
                        htmlFor="description"
                        className="leading-7 text-sm text-gray-600"
                      >
                        Upload to update Document(Optional)
                      </label>
                      <input
                        className="block w-full text-sm text-gray-600 border border-gray-300 rounded-sm cursor-pointer bg-gray-50 dark:placeholder-gray-400"
                        // id="certificateurl"
                        // name="certificateurl"
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
                      <span>Save</span>
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
export default connect(mapStateToProps, mapDispatchToProps)(EditExperience);
