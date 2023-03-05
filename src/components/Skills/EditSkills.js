import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { EditSkills, RemoveSkills } from "../../actions/Skills/Skill";
import { updateUserData } from "../../actions/UserData/userdata";

const EditSkill = ({
  loginUserRedux,
  UserdataRedux,
  updateUserDataAction,
  showAlert,
  skill,
  setisEditing
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setisEditing(true);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setisEditing(false);
    setShowModal(false);
  };

  const [formdata, setFormdata] = useState({
    name: skill.name,
    institution: skill.institution,
    level: skill.level,
    startDate: skill.startDate,
    endDate: skill.endDate,
    certificateurl: skill.certificateurl,
  });

  useEffect(() => {
    setFormdata({
      name: skill.name,
      institution: skill.institution,
      level: skill.level,
      startDate: skill.startDate,
      endDate: skill.endDate,
      certificateurl: skill.certificateurl,
    });
  }, []);

  const handleonChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (formdata.name.length < 5) {
      showAlert("Name is too short!", "danger");
      return;
    }
    if (formdata.institution.length < 4) {
      showAlert("Institution Name is too short!", "danger");
      return;
    }

    if (formdata.level.length < 0) {
      showAlert("Please Select level", "danger");
      return;
    }

    if (formdata.startDate.length === 0) {
      showAlert("Please Select start date", "danger");
      return;
    }

    if (formdata.endDate.length === 0) {
      showAlert("Please Select end date", "danger");
      return;
    }

    const body = {
      name: formdata.name,
      institution: formdata.institution,
      level: formdata.level,
      startDate: formdata.startDate,
      endDate: formdata.endDate,
      certificateurl: formdata.certificateurl,
    };
    EditSkills(body, skill._id)
      .then(async (res) => {
        if (res) {
          handleCloseModal();
          await updateUserDataAction(UserdataRedux._id);
        }
      })
      .catch((error) => {
        console.log("Satyam ", error);
        showAlert("Something went wrong!", "danger");
      });
  };

  const handleRemove = async(event)=>{
    event.preventDefault();
    if(window.confirm("Are you sure?")){
        RemoveSkills(skill._id)
          .then(async (res) => {
            if (res) {
              await updateUserDataAction(UserdataRedux._id);
            }
          })
          .catch((err) => {
            showAlert("Something went wrong!", "danger");
          });
    }
  }

  return (
    <>
      {(loginUserRedux.loginUserId === UserdataRedux._id) && (
        <button
          className="text-slate-800 hover:text-blue-600 text-md hover:text-blue-500 font-medium px-1 py-2 inline-flex space-x-1 items-center"
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
        <button
          className="text-slate-800 hover:text-blue-600 text-sm hover:text-red-500 font-medium px-1 py-2 inline-flex space-x-1 items-center"
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
        <div className="fixed top-0 right-0 bottom-0 left-0 z-50 overflow-y-auto">
          <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
            <div
              className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
              onClick={handleCloseModal}
            />

            <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
              <div className="modal-content py-4 text-left px-6">
                <p className="text-2xl font-bold mb-2">Add Skills</p>
                <div className="lg:w-2/2 md:w-5/5 mx-auto">
                  <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                      <div className="relative">
                        <label
                          htmlFor="name"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Course or Skill Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          value={formdata.name}
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
                          Institution
                        </label>
                        <input
                          type="text"
                          id="institution"
                          name="institution"
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          value={formdata.institution}
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
                          Level
                        </label>
                        <select
                          id="level"
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          name="level"
                          onChange={handleonChange}
                          value={formdata.level}
                        >
                          <option>Choose Type</option>
                          <option value="Beginner">Beginner</option>
                          <option value="Medium">Medium</option>
                          <option value="Expert">Expert</option>
                        </select>
                      </div>
                    </div>
                    <div className="p-2 w-half">
                      <div className="relative">
                        <label
                          className="block text-gray-700 font-medium mb-2"
                          htmlFor="startDate"
                        >
                          Start Date
                        </label>
                        <input
                          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                          id="startDate"
                          name="startDate"
                          type="date"
                          onChange={handleonChange}
                          value={new Date(formdata.startDate).toISOString().split('T')[0]}
                        />
                      </div>
                    </div>
                    <div className="p-2 w-half">
                      <div className="relative">
                        <label
                          className="block text-gray-700 font-medium mb-2"
                          htmlFor="endDate"
                        >
                          End Date
                        </label>
                        <input
                          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                          id="endDate"
                          name="endDate"
                          type="date"
                          onChange={handleonChange}
                          value={new Date(formdata.endDate).toISOString().split('T')[0]}
                        />
                      </div>
                    </div>
                    <div className="p-2 w-full">
                      <div className="relative">
                        <label
                          htmlFor="description"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Certificate URL
                        </label>
                        <input
                          type="text"
                          id="certificateurl"
                          name="certificateurl"
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          value={formdata.certificateurl}
                          onChange={handleonChange}
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
                        <span>Save Edit</span>
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
export default connect(mapStateToProps, mapDispatchToProps)(EditSkill);
