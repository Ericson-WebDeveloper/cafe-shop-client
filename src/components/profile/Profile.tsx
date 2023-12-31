import React from "react";
import { auth_store } from "../../store/auth";
import Avatar from "./Avatar";

// type Props = {};

const Profile = React.memo(() => {
  const { user } = auth_store();
  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col w-full h-full p-1 md:p-12 space-y-5 md:space-y-14">
        <Avatar avatar={user?.details?.avatar || ""} />
        <div className="flex flex-col w-full h-full p-2 space-y-3">
          <div className="flex flex-col md:flex-row w-full md:space-x-3 md:items-center">
            <label
              htmlFor=""
              className="flex text-sm md:text-xl w-24 font-semibold font-sans"
            >
              Name:
            </label>
            <input readOnly
              type="text"
              className="flex text-sm md:text-xl w-full md:w-auto p-2  rounded-lg"
              value={user?.name}
            />
          </div>
          <div className="flex flex-col md:flex-row w-full md:space-x-3 md:items-center">
            <label
              htmlFor=""
              className="flex text-sm md:text-xl w-24 font-semibold font-sans"
            >
              Email:
            </label>
            <input readOnly
              type="email"
              className="flex text-sm md:text-xl w-full md:w-auto p-2 rounded-lg"
              value={user?.email}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Profile;
