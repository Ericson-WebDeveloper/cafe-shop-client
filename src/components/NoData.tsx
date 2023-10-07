import React from "react";

// type Props = {}

const NoData = React.memo(() => {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <h1 className="text-2xl md:text-4xl text-red-600 font-semibold">
        No Data Found....
      </h1>
    </div>
  );
});

export default NoData;
