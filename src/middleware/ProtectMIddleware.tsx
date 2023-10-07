import React, { useEffect } from "react";
import { auth_store } from "../store/auth";
import { Navigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { verifyAuthentication } from "../api/auth-api";
import { ErrorResponseF } from "../api/ResponseType";
import SpinnerLoading from "../components/SpinnerLoading";

type Props = {
  children: React.ReactNode;
};

function ProtectMIddleware({ children }: Props) {
  const { user, setAuthUser, signOutUser } = auth_store();
  const location = useLocation();
  const pathnameLocation = location.pathname;
  const {
    refetch,
    isLoading: isVerifyingLoading,
    isFetching
  } = useQuery({
    queryKey: ["auth_user"],
    queryFn: verifyAuthentication,
    refetchOnWindowFocus: false,
    onSuccess: (response) => {
      if (response?.status == 200 || response?.status == 201) {
        if (response.data.user) {
          setAuthUser(response.data.user);
        }
      }
    },
    onError: (error: ErrorResponseF) => {
      if (error?.status == 401) {
        signOutUser();
        window.location.replace("/");
      }
      if (error?.status == 400 || error?.status == 500) {
        refetch();
      }
    },

  });
  
  useEffect(() => {
    refetch();
  }, [pathnameLocation, refetch]);
  // const navigate = useNavigate();
  return (
    <>
      {isVerifyingLoading && isFetching ? (
        <SpinnerLoading />
      ) : user ? (
        children
      ) : (
        <Navigate to="/" state={{ from: location }} replace={true} />
      )}
    </>
  );
}

export default ProtectMIddleware;
