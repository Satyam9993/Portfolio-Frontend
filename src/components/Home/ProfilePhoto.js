import React, { useState } from "react";
import {storage} from '../../firebase'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { editProfilePhoto } from "../../actions/About/About";
import { updateUserData } from "../../actions/UserData/userdata";
import { connect } from "react-redux";

function UploadPhoto({ handleCloseModal1, updateUserDataAction, editPermissionRedux, UserdataRedux}) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(selectedFile == null || editPermissionRedux == false){
        return;
    }
    const imageRef = ref(storage, `images/${UserdataRedux.userName}`);
    uploadBytes(imageRef, selectedFile).then((snapshort)=>{
        getDownloadURL(snapshort.ref).then((url)=>{
            const body = {
                profilephoto : url
            }
            editProfilePhoto(body, UserdataRedux._id).then(async (res)=>{
                if (res) {
                    await updateUserDataAction(UserdataRedux._id);
                    handleCloseModal1();
                  }
            }).catch((err)=>{

            })
        })
    }).catch((err)=>{

    })
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg">
      <div className="flex items-center mb-10">
        <label
          htmlFor="file-input"
          className="block text-gray-800 font-medium mr-2"
        >
          Choose a photo:
        </label>
        <input
          type="file"
          id="file-input"
          className="appearance-none w-full bg-gray-100 text-gray-800 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          onChange={handleFileSelect}
        />
      </div>
      <div className="p-2 w-full">
        <button
          className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
          onClick={handleSubmit}
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
          onClick={handleCloseModal1}
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
  );
}

const mapDispatchToProps = {
    updateUserDataAction: updateUserData,
  };
  
  const mapStateToProps = (state) => {
    return {
      editPermissionRedux: state?.loginuser?.editPermission,
      UserdataRedux: state?.Userdata?.User,
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(UploadPhoto);
