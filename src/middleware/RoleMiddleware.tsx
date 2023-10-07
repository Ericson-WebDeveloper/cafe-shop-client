import React from 'react'
import { auth_store } from '../store/auth'
import { Navigate, useLocation } from 'react-router-dom';

type Props = {
    children: React.ReactNode,
    isAdmin: boolean
}

function RoleMiddleware({children, isAdmin}:Props) {
    const {user} = auth_store();
    const location = useLocation();
    // const navigate = useNavigate();
  return (
    <>
    {
        isAdmin ? user?.is_admin ? children : <Navigate to="/" state={{ from: location }} replace={true} /> : children
    }
    </>
  )
}

export default RoleMiddleware