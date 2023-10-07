import React from 'react'

type Props = {
    showModal: boolean;
    onCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditCategory = React.memo(({showModal, onCloseModal}: Props) => {
  return (
    <div
      className={`${
        showModal == true ? "flex" : "hidden"
      } w-full h-full fixed items-center justify-center bg-black bg-opacity-75 top-0 left-0 bottom-0 z-80`}
    >
      <div
        className="flex relative  sx-modal-width xs:sm-modal-width md:md-modal-width lg:lg-modal-width h-[650px] bg-gray-50 shadow-2xl border-2 border-gray-500 
            rounded-xl transition-opacity duration-500 delay-500 ease-in-out"
      >
        <div
          className="flex relative  flex-col w-full h-full"
        >
          <div className="flex w-full justify-between items-center p-4">
            <h1 className="text-xl md:text-3xl font-semibold font-sans text-red-600">
              Edit Category
            </h1>
            <span
              className="flex m-2 hover:bg-red-200 rounded-sm"
              onClick={() => onCloseModal(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-red-500 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>

          {/* form */}
          <div className="flex w-full h-full overflow-auto">
            <div className="flex w-full h-full p-8">
              <form className="flex flex-col w-full h-full">
                <div className="flex flex-col w-full">
                  <label htmlFor="" className="text-lg text-red-700">
                    Name
                  </label>
                  <input type="text" className="shadow-lg p-2 rounded-lg" />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="" className="text-lg text-red-700">
                    Name
                  </label>
                  <input type="text" className="shadow-lg p-2 rounded-lg" />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="" className="text-lg text-red-700">
                    Name
                  </label>
                  <input type="text" className="shadow-lg p-2 rounded-lg" />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="" className="text-lg text-red-700">
                    Name
                  </label>
                  <input type="text" className="shadow-lg p-2 rounded-lg" />
                </div>

                <div className="flex flex-col w-full">
                  <label htmlFor="" className="text-lg text-red-700">
                    Name
                  </label>
                  <input type="text" className="shadow-lg p-2 rounded-lg" />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="" className="text-lg text-red-700">
                    Name
                  </label>
                  <input type="text" className="shadow-lg p-2 rounded-lg" />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="" className="text-lg text-red-700">
                    Name
                  </label>
                  <input type="text" className="shadow-lg p-2 rounded-lg" />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="" className="text-lg text-red-700">
                    Name
                  </label>
                  <input type="text" className="shadow-lg p-2 rounded-lg" />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="" className="text-lg text-red-700">
                    Name
                  </label>
                  <input type="text" className="shadow-lg p-2 rounded-lg" />
                </div>

                <div className="flex flex-col w-full">
                  <label htmlFor="" className="text-lg text-red-700">
                    Name
                  </label>
                  <input type="text" className="shadow-lg p-2 rounded-lg" />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="" className="text-lg text-red-700">
                    Name
                  </label>
                  <input type="text" className="shadow-lg p-2 rounded-lg" />
                </div>
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    type="button"
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default EditCategory