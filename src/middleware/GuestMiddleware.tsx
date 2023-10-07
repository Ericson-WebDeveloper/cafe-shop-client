import React from "react";
import { auth_store } from "../store/auth";
import { Navigate, useLocation } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

function GuestMIddleware({ children }: Props) {
  const { user } = auth_store();
  const location = useLocation();
  // const navigate = useNavigate();
  return (
    <>
      {!user ? (
        children
      ) : user?.is_admin ? (
        <Navigate to="/backend" state={{ from: location }} replace={true} />
      ) : (
        <Navigate to="/" state={{ from: location }} replace={true} />
      )}
    </>
  );
}

export default GuestMIddleware;
