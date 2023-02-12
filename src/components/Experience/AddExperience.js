import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { AddExperience } from "../../actions/Experience/Experience";
import { updateUserData } from "../../actions/UserData/userdata";

const EditExperience = ({
  editPermissionRedux,
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
      const imageRef = ref(storage, `images/experience/${v4()}`);
      await uploadBytes(imageRef, selectedFile)
        .then((snapshort) => {
          getDownloadURL(snapshort.ref).then((url) => {
            alert(url);
            const body = {
              type: formdata.type,
              description: formdata.description,
              companyName: formdata.companyName,
              role: formdata.role,
              certificateurl: url,
            };
            AddExperience(body, UserdataRedux._id)
              .then(async (res) => {
                if (res) {
                  handleCloseModal();
                  await updateUserDataAction(UserdataRedux._id);
                  setFormdata({
                    type: "",
                    description: "",
                    companyName: "",
                    role: "",
                  });
                }
              })
              .catch((err) => {
                showAlert("Something went wrong!", "danger");
              });
          });
        })
        .catch((err) => {});
    } else {
      const body = {
        type: formdata.type,
        description: formdata.description,
        companyName: formdata.companyName,
        role: formdata.role,
      };
      AddExperience(body, UserdataRedux._id)
        .then(async (res) => {
          if (res) {
            handleCloseModal();
            await updateUserDataAction(UserdataRedux._id);
            setFormdata({
              type: "",
              description: "",
              companyName: "",
              role: "",
            });
          }
        })
        .catch((error) => {
          console.log("Satyam ", error);
          showAlert("Something went wrong!", "danger");
        });
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
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
                        <option>Choose Type</option>
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
                        Description (Describe what do you learn!)
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
                        Upload Document(Optional)
                      </label>
                      <input
                        className="block w-full text-sm text-gray-600 border border-gray-300 rounded-sm cursor-pointer bg-gray-50 dark:placeholder-gray-400"
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
