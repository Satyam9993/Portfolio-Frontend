import React from "react";
import { connect } from "react-redux";
import Contactform from "./Contactform";
import ContactMsg from "./ContactMsg";

const Contact = ({ editPermission, showAlert }) => {
  return (
    <div style={{ margin: "0 10% 0 10%" }} id="contact">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-col text-center w-full mb-8">
            {editPermission && <h1 className="text-2xl font-medium title-font mb-4 text-gray-900 tracking-widest">
              Contact Massage
            </h1>}
          </div>
          {!editPermission ? (
            <Contactform showAlert={showAlert} />
          ) : (
            <ContactMsg showAlert={showAlert} />
          )}
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    editPermission: state?.loginuser?.editPermission,
  };
};
export default connect(mapStateToProps, null)(Contact);
