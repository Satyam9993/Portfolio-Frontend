import React, { useState } from "react";
import { connect } from "react-redux";
import { AddEducationInfo } from "../../actions/Education/Education";
import { updateUserData } from "../../actions/UserData/userdata";

const AddEducation = ({
  editPermissionRedux,
  UserdataRedux,
  updateUserDataAction,
  showAlert
}) => {
  const [showModal, setShowModal] = useState(false);

  const [startyear, setstartYear] = useState("");
  const [endyear, setendYear] = useState("");
  const [courseName, setCourseName] = useState("");
  const [stream, setStream] = useState("");
  const [institution, setInstitution] = useState("");
  const [performance, setPerformance] = useState("")

  const [errorstartYear, setErrorstartYear] = useState("");
  const [errorendYear, setErrorendYear] = useState("");
  const [errorCourseName, setErrorCourseName] = useState("");
  const [errorStream, setErrorStream] = useState("");
  const [errorInstitution, setErrorInstitution] = useState("");
  const [errorPerformance, setErrorPerformance] = useState("")

  const validateEndYear = (event) => {
    const enteredYear = event.target.value;
    const currentYear = startyear ? startyear : new Date().getFullYear() + 5;

    if (
      enteredYear.length !== 4 ||
      enteredYear < 1000 ||
      enteredYear < currentYear
    ) {
      setErrorendYear("Please enter a valid year (4 digits)");
    } else {
      setErrorendYear("");
    }
    setendYear(enteredYear);
  };

  const validateStartYear = (event) => {
    const enteredYear = event.target.value;
    const currentYear = new Date().getFullYear();

    if (
      enteredYear.length !== 4 ||
      enteredYear < 1000 ||
      enteredYear > currentYear
    ) {
      setErrorstartYear("Please enter a valid year (4 digits)");
    } else {
      setErrorstartYear("");
    }
    setstartYear(enteredYear);
  };

  const validateCourseName = (event) => {
    const enteredCourseName = event.target.value;

    if (enteredCourseName.length < 8) {
      setErrorCourseName("Degree or Course name is short!!");
    } else {
      setErrorCourseName("");
    }
    setCourseName(enteredCourseName);
  };

  const validateInstitution = (event) => {
    const enteredInstitutionName = event.target.value;

    if (enteredInstitutionName.length < 10) {
      setErrorInstitution("Institution Name is too Short!!");
    } else if (enteredInstitutionName.length > 30) {
      setErrorInstitution("Institution Name is too Lengthy!!");
    } else {
      setErrorInstitution("");
    }
    setInstitution(enteredInstitutionName);
  };

  const validateStream = (event) => {
    const enteredStream = event.target.value;
    if(enteredStream!=""){
      if (enteredStream.length < 2) {
        setErrorStream("Enter Stream Correctly!!");
      } else {
        setErrorStream("");
      }
      setStream(enteredStream);
    }else{
      setErrorStream("");
      setStream(enteredStream);
    }
  };

  const validatePerformance = (event) => {
    const enteredPerformance = event.target.value;

    if (enteredPerformance.length < 2 || enteredPerformance.length > 10) {
      setErrorPerformance("Specify Correctly!!");
    } 
    else if (!(enteredPerformance.indexOf("%") !== -1) && !(enteredPerformance.indexOf("CGPA") !== -1)) {
      setErrorPerformance("Specify % or CGPA");
    } 
    else 
    {
      setErrorPerformance("");
    }
    setPerformance(enteredPerformance);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (errorCourseName.length > 0) {
      showAlert(errorCourseName, "danger");
      return;
    }
    if (errorInstitution.length > 0) {
      showAlert(errorInstitution, "danger");
      return;
    }

    if (errorPerformance.length > 0) {
      showAlert(errorPerformance, "danger");
      return;
    }

    if (errorStream.length> 0) {
      showAlert(errorStream, "danger");
      return;
    }

    if (errorstartYear.length > 0) {
      showAlert(errorstartYear, "danger");
      return;
    }

    if (errorendYear.length > 0) {
      showAlert(errorendYear, "danger");
      return;
    }
    const body = {
      courseName: courseName,
      stream: stream,
      institutionName: institution,
      startYear: startyear,
      endYear: endyear,
      performance: performance,
    };
    AddEducationInfo(body)
      .then(async (res) => {
        if (res) {
          handleCloseModal();
          await updateUserDataAction(UserdataRedux._id);
          setCourseName("")
          setStream("")
          setstartYear("")
          setendYear("")
          setPerformance("")
        }
      })
      .catch((error) => {
        console.log("Satyam ", error);
        showAlert("Something went wrong!", "danger");
      });
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
              <p className="text-2xl font-bold mb-2">Add Education</p>
              <div className="lg:w-2/2 md:w-5/5 mx-auto">
                <div className="flex flex-wrap">
                  <div className="p-2 w-full">
                    <div className="relative">
                      <label
                        htmlFor="startyear"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Course or Degree Name *
                      </label>
                      <input
                        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                        type="text"
                        minLength="4"
                        value={courseName}
                        onChange={validateCourseName}
                        placeholder="Enter Course Name"
                      />
                      {errorCourseName && (
                        <p className="text-red-500">{errorCourseName}</p>
                      )}
                    </div>
                  </div>
                  <div className="p-2 w-full">
                    <div className="relative">
                      <label
                        htmlFor="startyear"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Institution Name *
                      </label>
                      <input
                        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                        type="text"
                        minLength="4"
                        value={institution}
                        onChange={validateInstitution}
                        placeholder="Enter Institution Name"
                      />
                      {errorInstitution && (
                        <p className="text-red-500">{errorInstitution}</p>
                      )}
                    </div>
                  </div>
                  <div className="p-2 w-full">
                    <div className="relative">
                      <label
                        htmlFor="stream"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Stream{" "} (optional)
                      </label>
                      <input
                        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                        type="text"
                        minLength="4"
                        value={stream}
                        onChange={validateStream}
                        placeholder="(Ex:- 10th, 12th, BTECH etc)"
                      />
                      {errorStream && (
                        <p className="text-red-500">{errorStream}</p>
                      )}
                    </div>
                  </div>
                  <div className="p-2 w-half">
                    <div className="relative">
                      <label
                        htmlFor="startyear"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Start Year *
                      </label>
                      <input
                        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                        type="number"
                        pattern="[0-9]{4}"
                        maxLength="4"
                        value={startyear}
                        onChange={validateStartYear}
                        placeholder="Enter year (4 digits)"
                      />
                      {errorstartYear && (
                        <p className="text-red-500">{errorstartYear}</p>
                      )}
                    </div>
                  </div>
                  <div className="p-2 w-half">
                    <div className="relative">
                      <label
                        htmlFor="endyear"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        End Year *
                      </label>
                      <input
                        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                        type="number"
                        pattern="[0-9]{4}"
                        maxLength="4"
                        value={endyear}
                        onChange={validateEndYear}
                        placeholder="Enter year (4 digits)"
                      />
                      {errorendYear && (
                        <p className="text-red-500">{errorendYear}</p>
                      )}
                    </div>
                  </div>
                  <div className="p-2 w-full">
                  <div className="relative">
                      <label
                        htmlFor="performance"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Performance or Grade *
                      </label>
                      <input
                        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                        type="text"
                        value={performance}
                        onChange={validatePerformance}
                        placeholder="EX :- 93.4% or 9.3CGPA"
                      />
                      {errorPerformance && (
                        <p className="text-red-500">{errorPerformance}</p>
                      )}
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
                      <span>Add</span>
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
export default connect(mapStateToProps, mapDispatchToProps)(AddEducation);
