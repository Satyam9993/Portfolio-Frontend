import React, { useState } from "react";
import { connect } from "react-redux";
import { AddContactMSG } from "../../actions/ContactMSG/ContactMSG";
import { updateUserData } from "../../actions/UserData/userdata";

const Contactform = ({ UserdataRedux, updateUserDataAction , showAlert}) => {
  const [contact, setContact] = useState({
    email: "",
    name: "",
    msg: "",
  });

  const handleonChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const handleContact = () => {
    const body = {
      email: contact.email,
      name: contact.name,
      msg : contact.msg,
      userId : UserdataRedux._id
    };
    AddContactMSG(body).then(async (contact)=>{
        if (contact) {
            await updateUserDataAction(UserdataRedux._id);
            setContact({
                email: "",
                name: "",
                msg: ""
            })
            showAlert("Email is send successfull user will cotact throguh entered email", "success")
        }
    }).catch(()=>{
        showAlert("Something went wrong!!", "danger")
    })
  };

  return (
    <div className="flex items-center justify-start bg-white">
      <div className="mx-auto w-full max-w-lg">
        <h1 className="text-4xl font-medium">Contact us</h1>
        <p className="mt-3">
          Email us at "{UserdataRedux.email}" or message us here:
        </p>

        <div className="mt-10">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="relative z-0">
              <input
                type="text"
                name="name"
                className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                value={contact.name}
                placeholder=" "
                onChange={handleonChange}
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                Your name
              </label>
            </div>
            <div className="relative z-0">
              <input
                type="text"
                name="email"
                className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
                value={contact.email}
                onChange={handleonChange}
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                Your email
              </label>
            </div>
            <div className="relative z-0 col-span-2">
              <textarea
                name="msg"
                rows="5"
                className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
                value={contact.msg}
                onChange={handleonChange}
              ></textarea>
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                Your message
              </label>
            </div>
          </div>
          <button
            className="mt-5 rounded-md bg-black px-10 py-2 text-white"
            onClick={handleContact}
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
    updateUserDataAction: updateUserData,
};

const mapStateToProps = (state) => {
  return {
    UserdataRedux: state?.Userdata?.User,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Contactform);
