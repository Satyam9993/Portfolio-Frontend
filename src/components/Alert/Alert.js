import React, { useEffect, useState } from "react";

const Alert = ({ msg, type, setAlertShow }) => {
  const [color, setColor] = useState("");
  useEffect(() => {
    if (type == "danger") {
      setColor("red");
    } else if (type == "success") {
      setColor("green");
    } else if (type == "warn") {
      setColor("yellow");
    } else {
      setColor("blue");
    }
  }, []);

  return (
    <>
      <div
        id="alert-3"
        className={`flex fixed p-4 text-${color}-800 rounded-sm bg-${color}-50 dark:text-${color}-400 my-3`}
        role="alert"
        style={{left : "38%"}}
      >
        <svg
          aria-hidden="true"
          className="flex-shrink-0 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Info</span>
        <div className="ml-3 text-sm font-medium">
          <p>{msg}</p>
        </div>
        <button
          type="button"
          className={`ml-auto -mx-1.5 -my-1.5 bg-${color}-50 text-${color}-500 rounded-lg focus:ring-2 focus:ring-${color}-400 p-1.5 hover:bg-${color}-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-${color}-400 dark:hover:bg-gray-700`}
          data-dismiss-target="#alert-3"
          aria-label="Close"
          style={{"marginLeft": "1rem"}}
          onClick={()=>{setAlertShow(false)}}
        >
          <span className="sr-only">Close</span>
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </>
  );
};

export default Alert;
