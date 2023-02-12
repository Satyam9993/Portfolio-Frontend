import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ContactCard from "./ContactCard";

const ContactMsg = ({UserdataRedux, showAlert}) => {

    const [contactMSG, setContactMSG] = useState([])

    useEffect(() => {
      if(UserdataRedux.contactmsg){
        // const itms = UserdataRedux?.contactmsg
        // const sortedItems = UserdataRedux.contactmsg?.sort((a, b) => new Date(b.createdon) - new Date(a.createdon));
        setContactMSG(UserdataRedux.contactmsg)
      }
    }, [UserdataRedux])

    
    

  return (
    <div className="flex items-center justify-center bg-gradient-to-t p-6 bg-no-repeat bg-center">
      <div className="w-full md:w-1/2 lg:w-2/3">
        <div className="flex flex-col space-y-4">
          {contactMSG.length ?
            contactMSG.map((contact)=>{
            return <ContactCard  key={contact._id} contact={contact} showAlert={showAlert}/>
            }) : 
            <div className="text-xl font-sm title-font mb-4 text-center text-gray-900 tracking-widest">NO Contact Message!</div>
          }
        </div>
      </div>
    </div>
  );
};



const mapStateToProps = (state) => {
  return {
    UserdataRedux : state?.Userdata?.User
  };
};
export default connect(mapStateToProps, null)(ContactMsg);
