import React from "react";
import { connect } from "react-redux";
import { RemoveContactMSG } from "../../actions/ContactMSG/ContactMSG";
import { updateUserData } from "../../actions/UserData/userdata";

const ContactCard = ({
  contact,
  UserdataRedux,
  updateUserDataAction,
  editPermissionRedux,
  showAlert
}) => {
  const getTimeAgo = (created) => {
    const now = new Date();
    const timeElapsed = now - new Date(created);
    const seconds = Math.floor(timeElapsed / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    let timeAgo;
    if (days >= 1) {
      timeAgo = `${days} day(s) ago`;
    } else if (hours >= 1) {
      timeAgo = `${hours} hour(s) ago`;
    } else if (minutes >= 1) {
      timeAgo = `${minutes} minute(s) ago`;
    } else {
      timeAgo = `${seconds} second(s) ago`;
    }
    return timeAgo;
  };
  const handleRemove = () => {
    if (window.confirm("Do you want to remove Education Card?")) {
      RemoveContactMSG(contact._id)
        .then(async (res) => {
          if (res) {
            await updateUserDataAction(UserdataRedux._id);
            showAlert("SuccessFully Removed", "success")
          }
        })
        .catch((err) => {
          showAlert("Some thing went wrong!!", "danger");
        });
    }
  };
  return (
    <>
      <div className="flex justify-between py-6 px-4 bg-white/30 rounded-lg">
        <div className="flex items-center space-x-4">
          <img
            src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
            className="rounded-full h-14 w-14"
            alt=""
          />
          <div className="flex flex-col space-y-1">
            <span className="font-bold">
              {contact.name}
              <span className="mx-5">
              {editPermissionRedux && (
                <button
                  className="text-slate-800 hover:text-blue-600 bg-white rounded-r-lg font-medium px-5 inline-flex space-x-1 items-center"
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
              </span>
            </span>
            <span className="text-m text-blue-500">{contact.email}</span>
            <span className="text-sm">{contact.msg}</span>
          </div>
        </div>
        <div className="flex-none px-4 py-2 text-stone-600 text-xs md:text-sm">
          {getTimeAgo(contact.createdon)}
        </div>
      </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(ContactCard);
