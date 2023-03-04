import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { editAboutme } from "../../actions/About/About";
import { updateUserData } from "../../actions/UserData/userdata";
import Loader from "./Loader";
import UploadPhoto from "./ProfilePhoto";
import './Home.css'

const Home = ({
  UserdataRedux,
  loginUserRedux,
  updateUserDataAction,
  showAlert,
}) => {
  const [aboutme, setAboutme] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [isloading, setIsloading] = useState(true);
  const [formdata, setFormdata] = useState({
    headline: "",
    description: "",
    intoduction: "",
    profilephoto: "",
    Name: "",
  });

  const handleSave = async () => {
    const body = {
      Name: formdata.Name,
      headline: formdata.headline,
      description: formdata.description,
      intoduction: formdata.intoduction,
    };
    setIsloading(true);
    await editAboutme(body, UserdataRedux._id)
      .then(async (res) => {
        if (res) {
          handleCloseModal();
          await updateUserDataAction(UserdataRedux._id);
          showAlert("Successfully Edited!!", "success");
        }
        setIsloading(false);
      })
      .catch((err) => {
        showAlert("Something went wrong!!", "danger");
        setIsloading(false);
      });
  };

  useEffect(() => {
    if (UserdataRedux?.aboutme) {
      setAboutme({
        headline: UserdataRedux?.aboutme?.headline,
        description: UserdataRedux?.aboutme?.description,
        intoduction: UserdataRedux?.aboutme?.intoduction,
        Name: UserdataRedux.Name,
        profilephoto: UserdataRedux?.profilephoto ?  UserdataRedux?.profilephoto:"https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600",
      });
      setFormdata({
        headline: UserdataRedux?.aboutme?.headline,
        description: UserdataRedux?.aboutme?.description,
        intoduction: UserdataRedux?.aboutme?.intoduction, 
        Name: UserdataRedux.Name,
        profilephoto: UserdataRedux?.profilephoto || "",
      });
    }
  }, [UserdataRedux]);

  useEffect(() => {
    if(aboutme?.headline && aboutme.description && aboutme.profilephoto && aboutme.Name){
      setIsloading(false);
    }
    
  }, [aboutme])
  


  const handleonChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleShowModal1 = () => {
    setShowModal1(true);
  };

  const handleCloseModal1 = () => {
    setShowModal1(false);
  };

  return (
    <div id="home">
      {!isloading ? (
        <div className="m-auto max-w-6xl p-12 animate-fade-in opacity-0">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 max-w-md flex flex-col justify-center">
              <div className="md:text-5xl text-2xl uppercase font-black">
                {aboutme.headline}
              </div>
              <div className="text-xl mt-4">{aboutme.description}</div>
              <div className="my-5 h-16">
                <div
                  className="shadow-md font-medium py-2 px-4 text-blue-100
                    cursor-pointer bg-blue-600 hover:bg-blue-500 rounded text-lg text-center w-48"
                >
                  View Resume
                </div>
                {loginUserRedux.loginUserId === UserdataRedux._id && (
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
                    <span>Edit</span>
                  </button>
                )}
              </div>
            </div>
            <div className="flex md:justify-end w-full md:w-1/2 -mt-5">
              <div
                style={{
                  backgroundImage:
                    "https://assets-global.website-files.com/5b5a66e9f3166b36708705fa/5dea7a12bb83ab1f13040de5_cx-dots.svg",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="shadow-2xl max-w-md z-10 rounded-full mt-6 ml-4">
                  <img
                    alt="card img"
                    className="rounded-t h-max w-full"
                    src={aboutme.profilephoto}
                  />
                  {loginUserRedux.loginUserId === UserdataRedux._id && (
                    <button
                      className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
                      onClick={handleShowModal1}
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
                      <span>Edit Profile photo</span>
                    </button>
                  )}
                  <div className="text-2xl p-10 bg-white">
                    {aboutme.intoduction}
                    <p className="text-center text-sm bg-white py-3 font-medium">
                      "{aboutme.Name}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
      <div>
        {/* Modal Form */}

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
                          htmlFor="Name"
                          className="leading-7 text-sm text-gray-600"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="Name"
                          name="Name"
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          value={formdata.Name}
                          onChange={handleonChange}
                        />
                      </div>
                    </div>
                    <div className="p-2 w-full">
                      <div className="relative">
                        <label
                          htmlFor="name"
                          className="leading-7 text-sm text-gray-600"
                        >
                          Headline
                        </label>
                        <input
                          type="text"
                          id="headline"
                          name="headline"
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          value={formdata.headline}
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
                        <input
                          type="text"
                          id="description"
                          name="description"
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          value={formdata.description}
                          onChange={handleonChange}
                        />
                      </div>
                    </div>
                    <div className="p-2 w-full">
                      <div className="relative">
                        <label
                          htmlFor="message"
                          className="leading-7 text-sm text-gray-600"
                        >
                          Message
                        </label>
                        <textarea
                          id="intoduction"
                          name="intoduction"
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                          value={formdata.intoduction}
                          onChange={handleonChange}
                        ></textarea>
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
        {/* Modal form to change profile photo */}
        {showModal1 && (
          <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
            <div
              className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
              onClick={handleCloseModal1}
            />

            <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
              <div className="modal-content py-4 text-left px-6">
                <p className="text-2xl font-bold mb-2">Edit Profile Photo</p>
                <UploadPhoto handleCloseModal1={handleCloseModal1} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);
