import React, { useState } from "react";

const LightboxModal = ({exp}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="mt-3 text-indigo-500 inline-flex items-center"
        onClick={openModal}
      >
        View Certificate
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="w-4 h-4 ml-2"
          viewBox="0 0 24 24"
        >
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
          <div
            className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
            onClick={closeModal}
          />
          <div className="relative w-10/12 md:w-2/3 lg:w-1/2 max-h-screen overflow-auto bg-white rounded-lg p-10">
            <img
              src={exp?.certificateurl}
              className="w-full"
            />
            <button
              className="absolute top-0 right-0 p-3 text-lg font-small rounded"
              onClick={closeModal}
            >
              <svg
                className="fill-current text-gray-700 hover:text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                width="20"
                height="20"
              >
                <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LightboxModal;
