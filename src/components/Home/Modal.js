// import React, { useState } from 'react'

// const Modal = () => {
//   const [showModal, setShowModal] = useState(false);

//   const handleShowModal = () => {
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };
//   return (
//     <div>
//       <button
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         onClick={handleShowModal}
//       >
//         Show Modal
//       </button>
//       {showModal && (
//         <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
//           <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" />

//           <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
//             <div
//               className="modal-close cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50"
//               onClick={handleCloseModal}
//               style={{color:"black"}}
//             >
//               close
//               <svg
//                 className="fill-current text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="18"
//                 height="18"
//                 viewBox="0 0 18 18"
//               >
//                 <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
//               </svg>
//             </div>

//             <div className="modal-content py-4 text-left px-6">
//               <p className="text-2xl font-bold mb-2">Modal Title</p>
//               <p className="text-gray-600 mb-5">Modal description text goes here</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Modal
