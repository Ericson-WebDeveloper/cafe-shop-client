import React from "react";

// type Props = {}

const SpinnerLoading = React.memo(() => {
  return (
    <div className="flex w-full h-screen bg-white">
      <div className="flex justify-center mt-16 w-full h-full">
        <img
          className="h-16 md:h-28 w-16 md:w-28"
          src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
          alt=""
        />
      </div>
    </div>
  );
});

export default SpinnerLoading;
